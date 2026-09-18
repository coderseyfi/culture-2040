import { useTranslation } from 'react-i18next';
import { icons } from '@/assets/icons/icons';
import { PER_PAGE_OPTIONS } from '@/constants/documents';

/** 1 … n-1 n n+1 … son formatında səhifə nömrələri. */
function buildPages(page, pageCount) {
  const window = [];
  for (let i = 1; i <= pageCount; i += 1) {
    if (i === 1 || i === pageCount || Math.abs(i - page) <= 1) window.push(i);
  }

  const result = [];
  let last = 0;
  window.forEach((i) => {
    if (last && i - last > 1) result.push({ gap: true, key: `gap-${i}` });
    result.push({ gap: false, key: `page-${i}`, value: i });
    last = i;
  });
  return result;
}

const ARROW_BTN =
  'inline-flex h-[38px] w-[38px] items-center justify-center rounded-[9px] border border-hair-18 bg-white transition-colors duration-[180ms] hover:border-brand';

export default function DocPagination({ archive }) {
  const { t } = useTranslation();
  const { page, pageCount, pageRangeLabel, goToPage, filters, setPerPage } = archive;
  const pages = buildPages(page, pageCount);
  const isFirst = page === 1;
  const isLast = page === pageCount;

  return (
    <nav
      aria-label={t('documents.pagination')}
      className="mt-6 flex flex-wrap items-center justify-between gap-[14px]"
    >
      <span className="text-[13.5px] text-ink-700">{pageRangeLabel}</span>

      <div className="flex items-center gap-[7px]">
        <button
          type="button"
          onClick={() => !isFirst && goToPage(page - 1)}
          disabled={isFirst}
          aria-label={t('documents.prevPage')}
          className={`${ARROW_BTN} ${isFirst ? 'cursor-not-allowed text-ink-300' : 'cursor-pointer text-ink-700'}`}
        >
          <icons.chevronLeft size={16} />
        </button>

        {pages.map((item) =>
          item.gap ? (
            <button
              key={item.key}
              type="button"
              disabled
              className="h-[38px] min-w-[38px] cursor-default rounded-[9px] border border-transparent bg-transparent px-[11px] font-sans text-[14px] font-semibold text-ink-500"
            >
              …
            </button>
          ) : (
            <button
              key={item.key}
              type="button"
              onClick={() => goToPage(item.value)}
              aria-label={t('documents.pageAria', { page: item.value })}
              aria-current={item.value === page ? 'page' : 'false'}
              className={`h-[38px] min-w-[38px] cursor-pointer rounded-[9px] border px-[11px] font-sans text-[14px] font-semibold transition-colors duration-[180ms] ${
                item.value === page
                  ? 'border-brand bg-brand text-white'
                  : 'border-hair-18 bg-white text-ink-700'
              }`}
            >
              {item.value}
            </button>
          ),
        )}

        <button
          type="button"
          onClick={() => !isLast && goToPage(page + 1)}
          disabled={isLast}
          aria-label={t('documents.nextPage')}
          className={`${ARROW_BTN} ${isLast ? 'cursor-not-allowed text-ink-300' : 'cursor-pointer text-ink-700'}`}
        >
          <icons.chevronRight size={16} />
        </button>
      </div>

      <label className="relative flex h-[38px] items-center gap-2 rounded-[10px] border border-hair-20 bg-white px-3">
        <span className="whitespace-nowrap text-[13px] text-ink-600">{t('documents.perPage')}</span>
        <select
          value={filters.perPage}
          onChange={(event) => setPerPage(Number(event.target.value))}
          aria-label={t('documents.perPage')}
          className="h-9 cursor-pointer appearance-none border-none bg-none pr-5 font-sans text-[14px] text-ink outline-none"
        >
          {PER_PAGE_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <icons.chevronDown
          size={14}
          strokeWidth={2.2}
          className="pointer-events-none absolute right-[11px] text-ink-600"
        />
      </label>
    </nav>
  );
}
