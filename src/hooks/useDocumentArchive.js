import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { documentService } from '@/api/services/documentService';
import { ALL, DEFAULT_FILTERS, RANGE_KEYS } from '@/constants/documents';

const MS_PER_DAY = 86_400_000;
const LOADING_DELAY = 420;
const MAX_RECENT = 5;

/** Ton rəngindən şəffaf fon düzəldir (#12607F → rgba(18,96,127,0.1)). */
function tint(hex, alpha = 0.1) {
  const value = String(hex ?? '').replace('#', '');
  if (value.length !== 6) return `rgba(18,96,127,${alpha})`;
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(value.slice(i, i + 2), 16));
  return `rgba(${r},${g},${b},${alpha})`;
}

/**
 * Sənədlər arxivi.
 *
 * Data `/documents`, filtr seçimləri isə `/document-types` və
 * `/document-organs` endpoint-lərindən gəlir; adlar `lang` header-inə görə
 * serverdə tərcümə olunur.
 *
 * Sıralama, tarix aralığı və səhifələmə klient tərəfdədir, çünki API bu
 * parametrləri dəstəkləmir. Bütün sənədlər bir sorğuda çəkilir (API limiti 50).
 */
export function useDocumentArchive() {
  const { t, i18n } = useTranslation();
  const language = i18n.resolvedLanguage;

  const [documents, setDocuments] = useState([]);
  const [types, setTypes] = useState([]);
  const [organs, setOrgans] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState(null);

  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [selected, setSelected] = useState({});
  const [recent, setRecent] = useState([]);
  const [previewId, setPreviewId] = useState(null);
  const [fullscreen, setFullscreen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchFocus, setSearchFocus] = useState(false);
  const [openFilter, setOpenFilter] = useState(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [attempt, setAttempt] = useState(0);

  const timer = useRef(null);

  // Dil dəyişəndə adlar da dəyişdiyi üçün yenidən sorğulanır.
  useEffect(() => {
    let active = true;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFetching(true);
    setError(null);

    Promise.all([documentService.getAll(), documentService.getTypes(), documentService.getOrgans()])
      .then(([docs, typeList, organList]) => {
        if (!active) return;
        setDocuments(docs);
        setTypes(typeList);
        setOrgans(organList);
      })
      .catch((err) => {
        if (!active) return;
        setError(err);
        setDocuments([]);
      })
      .finally(() => {
        if (active) setFetching(false);
      });

    return () => {
      active = false;
    };
  }, [language, attempt]);

  useEffect(() => () => clearTimeout(timer.current), []);

  const applyWithLoading = useCallback((patch) => {
    clearTimeout(timer.current);
    setFilters((prev) => ({ ...prev, ...patch }));
    setLoading(true);
    timer.current = setTimeout(() => setLoading(false), LOADING_DELAY);
  }, []);

  const patchFilters = useCallback((patch) => {
    setFilters((prev) => ({ ...prev, ...patch }));
  }, []);

  const commitSearch = useCallback(
    (term) => {
      setRecent((prev) => [term, ...prev.filter((item) => item !== term)].slice(0, MAX_RECENT));
      setSearchFocus(false);
      applyWithLoading({ q: term, page: 1 });
    },
    [applyWithLoading],
  );

  const query = filters.q.trim().toLowerCase();
  // Tarix filtrinin istinad nöqtəsi mount anında bir dəfə sabitlənir ki,
  // hər render-də sürüşməsin.
  const [nowTs] = useState(() => Date.now());
  const thisYear = useMemo(() => new Date(nowTs).getFullYear(), [nowTs]);

  const filtered = useMemo(() => {
    const now = nowTs;
    const rows = documents.filter((doc) => {
      if (filters.type !== ALL && doc.typeSlug !== filters.type) return false;
      if (filters.organ !== ALL && doc.organSlug !== filters.organ) return false;

      const year = Number(String(doc.date).slice(0, 4));
      if (filters.range === '30' && now - doc.ts > 30 * MS_PER_DAY) return false;
      if (filters.range === 'year' && year !== thisYear) return false;
      if (filters.range === 'lastYear' && year !== thisYear - 1) return false;

      if (query && !`${doc.title} ${doc.excerpt} ${doc.number}`.toLowerCase().includes(query)) {
        return false;
      }
      return true;
    });

    const direction = filters.sortDir === 'asc' ? 1 : -1;
    return rows.sort((a, b) => {
      if (filters.sortKey === 'title') return direction * a.title.localeCompare(b.title, language);
      if (filters.sortKey === 'size') return direction * (a.size - b.size);
      return direction * (a.ts - b.ts);
    });
  }, [documents, filters, query, language, thisYear, nowTs]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / filters.perPage));
  const page = Math.min(Math.max(1, filters.page), pageCount);
  const from = (page - 1) * filters.perPage;
  const pageRows = filtered.slice(from, from + filters.perPage);

  const makeSnippet = useCallback(
    (doc) => {
      if (!query) return null;
      const index = doc.excerpt.toLowerCase().indexOf(query);
      if (index < 0) return null;
      return {
        pre: doc.excerpt.slice(Math.max(0, index - 45), index),
        hit: doc.excerpt.slice(index, index + query.length),
        post: doc.excerpt.slice(index + query.length, index + query.length + 55),
      };
    },
    [query],
  );

  const rows = pageRows.map((doc) => ({
    ...doc,
    type: doc.typeName,
    organ: doc.organName,
    toneBg: tint(doc.toneColor),
    checked: Boolean(selected[doc.id]),
    snippet: makeSnippet(doc),
  }));

  const chips = [];
  if (filters.type !== ALL) {
    chips.push({
      key: 'type',
      label: t('documents.chipType', {
        value: types.find((item) => item.slug === filters.type)?.name ?? filters.type,
      }),
      clear: () => patchFilters({ type: ALL }),
    });
  }
  if (filters.organ !== ALL) {
    chips.push({
      key: 'organ',
      label: t('documents.chipOrgan', {
        value: organs.find((item) => item.slug === filters.organ)?.name ?? filters.organ,
      }),
      clear: () => patchFilters({ organ: ALL }),
    });
  }
  if (filters.range) {
    chips.push({
      key: 'range',
      label: t('documents.chipRange', { value: t(`documents.ranges.${filters.range}`) }),
      clear: () => patchFilters({ range: null }),
    });
  }
  if (query) {
    chips.push({
      key: 'q',
      label: t('documents.chipSearch', { value: filters.q }),
      clear: () => patchFilters({ q: '' }),
    });
  }

  const typeOptions = useMemo(
    () => [
      { value: ALL, label: `${t('common.all')} (${documents.length})` },
      ...types.map((item) => ({
        value: item.slug,
        label: `${item.name} (${item.documentsCount ?? 0})`,
      })),
    ],
    [types, documents.length, t],
  );

  const organOptions = useMemo(
    () => [
      { value: ALL, label: t('common.all') },
      ...organs.map((item) => ({ value: item.slug, label: item.name })),
    ],
    [organs, t],
  );

  const rangePresets = useMemo(
    () => RANGE_KEYS.map((key) => ({ value: key, label: t(`documents.ranges.${key}`) })),
    [t],
  );

  const sortArrow = (key) => {
    if (filters.sortKey !== key) return '';
    return filters.sortDir === 'asc' ? '↑' : '↓';
  };

  const suggestions = query
    ? documents.filter((doc) => doc.title.toLowerCase().includes(query)).slice(0, 4)
    : [];

  const preview = previewId ? rows.find((doc) => doc.id === previewId) ?? null : null;
  const related = preview
    ? documents
        .filter(
          (doc) =>
            doc.id !== preview.id &&
            (doc.organSlug === preview.organSlug || doc.tone === preview.tone),
        )
        .slice(0, 3)
    : [];

  const selectedCount = Object.values(selected).filter(Boolean).length;
  const busy = fetching || loading;

  return {
    rows,
    total: documents.length,
    found: filtered.length,
    shown: pageRows.length,
    countLabel: t('documents.count', { total: filtered.length, shown: pageRows.length }),
    pageRangeLabel: t('documents.rangeLabel', {
      from: from + 1,
      to: from + pageRows.length,
      total: filtered.length,
    }),
    hasDocs: filtered.length > 0 && !busy && !error,
    noDocs: filtered.length === 0 && !busy && !error,
    loading: busy,
    error,
    retry: () => setAttempt((value) => value + 1),

    filters,
    query,
    typeOptions,
    organOptions,
    rangePresets,
    chips,
    setType: (value) => applyWithLoading({ type: value, page: 1 }),
    setOrgan: (value) => applyWithLoading({ organ: value, page: 1 }),
    toggleRange: (value) =>
      applyWithLoading({ range: filters.range === value ? null : value, page: 1 }),
    setQuery: (value) => applyWithLoading({ q: value, page: 1 }),
    clearAll: () => applyWithLoading({ type: ALL, organ: ALL, range: null, q: '', page: 1 }),

    searchFocus,
    openSearch: () => setSearchFocus(true),
    closeSearch: () => setTimeout(() => setSearchFocus(false), 160),
    suggestions,
    recent: recent.slice(0, 4),
    clearRecent: () => setRecent([]),
    commitSearch,
    showDropdown: searchFocus && (query ? suggestions.length > 0 : recent.length > 0),

    openFilter,
    toggleFilterMenu: (name) => setOpenFilter((current) => (current === name ? null : name)),
    closeFilterMenu: () => setOpenFilter(null),

    sheetOpen,
    toggleSheet: () => setSheetOpen((open) => !open),

    sortArrow,
    sortBy: (key, firstDir) =>
      patchFilters({
        sortKey: key,
        sortDir:
          filters.sortKey === key && filters.sortDir === firstDir
            ? firstDir === 'asc'
              ? 'desc'
              : 'asc'
            : firstDir,
      }),

    selectedCount,
    toggleSelect: (id) => setSelected((prev) => ({ ...prev, [id]: !prev[id] })),
    clearSelection: () => setSelected({}),

    page,
    pageCount,
    goToPage: (next) => applyWithLoading({ page: next }),
    setPerPage: (value) => applyWithLoading({ perPage: value, page: 1 }),

    preview,
    related: related.map((doc) => ({ ...doc, title: doc.title, dateLabel: doc.dateLabel })),
    openPreview: setPreviewId,
    closePreview: () => {
      setPreviewId(null);
      setFullscreen(false);
    },
    fullscreen,
    toggleFullscreen: () => setFullscreen((value) => !value),
  };
}
