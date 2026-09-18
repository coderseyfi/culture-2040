import { useTranslation } from 'react-i18next';
import { icons } from '@/assets/icons/icons';

const OPTION_CLASS =
  'flex w-full cursor-pointer items-center gap-[9px] rounded-[7px] border-none bg-none px-3 py-[9px] text-left font-sans text-[13.5px] text-ink-700 transition-colors duration-[180ms] hover:bg-surface-soft hover:text-brand';

const GROUP_LABEL =
  'px-3 pb-[6px] pt-2 text-[10.5px] font-bold tracking-[0.06em] text-ink-600';

/** Təkliflər və son axtarışlar açılan siyahısı olan axtarış sahəsi. */
export default function DocSearchField({ archive }) {
  const { t } = useTranslation();
  const {
    filters,
    query,
    setQuery,
    openSearch,
    closeSearch,
    commitSearch,
    suggestions,
    recent,
    clearRecent,
    showDropdown,
  } = archive;

  return (
    <div className="relative min-w-[240px] flex-1">
      <icons.search
        size={18}
        className="absolute left-[14px] top-1/2 -translate-y-1/2 text-ink-600"
      />
      <input
        type="text"
        value={filters.q}
        onChange={(event) => setQuery(event.target.value)}
        onFocus={openSearch}
        onBlur={closeSearch}
        onKeyDown={(event) => {
          if (event.key === 'Enter' && filters.q.trim()) commitSearch(filters.q.trim());
        }}
        aria-label={t('documents.searchLabel')}
        placeholder={t('documents.searchPlaceholder')}
        className="box-border h-[46px] w-full rounded-[10px] border border-hair-20 py-3 pl-[42px] pr-4 font-sans text-[15px] text-ink outline-none transition-[border-color,box-shadow] duration-[180ms] focus:border-brand focus:shadow-[0_0_0_3px_rgba(14,110,110,0.15)]"
      />

      {showDropdown && (
        <div className="absolute left-0 right-0 top-[52px] z-30 rounded-[10px] border border-hair-12 bg-white p-[6px] shadow-popover">
          {query && suggestions.length > 0 && (
            <>
              <div className={GROUP_LABEL}>{t('documents.suggestions')}</div>
              {suggestions.map((doc) => (
                <button
                  key={doc.id}
                  type="button"
                  onClick={() => commitSearch(doc.title)}
                  className={OPTION_CLASS}
                >
                  <icons.search size={14} className="flex-none opacity-60" />
                  {doc.title}
                </button>
              ))}
            </>
          )}

          {!query && recent.length > 0 && (
            <>
              <div className="flex items-center justify-between px-3 pb-[6px] pt-2">
                <span className="text-[10.5px] font-bold tracking-[0.06em] text-ink-600">
                  {t('documents.recentSearches')}
                </span>
                <button
                  type="button"
                  onClick={clearRecent}
                  className="cursor-pointer border-none bg-none p-[2px] font-sans text-[11.5px] font-semibold text-ink-600 transition-colors duration-[180ms] hover:text-brand"
                >
                  {t('documents.clear')}
                </button>
              </div>
              {recent.map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => commitSearch(term)}
                  className={OPTION_CLASS}
                >
                  <icons.clock size={14} className="flex-none opacity-60" />
                  {term}
                </button>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}
