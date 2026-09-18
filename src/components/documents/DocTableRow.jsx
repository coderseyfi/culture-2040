import { useTranslation } from 'react-i18next';
import { icons } from '@/assets/icons/icons';
import { FORMAT_ICONS } from '@/constants/documents';

// Mobil kart rejimində sətir hündürlüyü məzmuna görə açılır (72px sabit qalsa,
// sarılan başlıq növbəti xananın üstünə düşür).
const CELL =
  'h-[72px] box-border border-t border-hair-8 to-720:block to-720:h-auto to-720:w-full';

export default function DocTableRow({ doc, onToggle, onPreview }) {
  const { t } = useTranslation();
  const FormatIcon = icons[FORMAT_ICONS[doc.format] ?? FORMAT_ICONS.PDF];

  return (
    <tr className="to-720:block to-720:w-full to-720:border-t to-720:border-hair-8 to-720:py-[6px] hover:bg-surface-row">
      <td className={`${CELL} py-4 pl-[18px] pr-0 align-middle`}>
        <input
          type="checkbox"
          checked={doc.checked}
          onChange={() => onToggle(doc.id)}
          aria-label={t('documents.select')}
          className="h-[17px] w-[17px] cursor-pointer accent-brand"
        />
      </td>

      <td className={`${CELL} py-4 pl-[10px] pr-4`}>
        <div className="flex items-center gap-3">
          <span
            className="inline-flex h-[34px] w-[34px] flex-none items-center justify-center rounded-[8px]"
            style={{ background: doc.toneBg }}
          >
            <FormatIcon size={17} color={doc.toneColor} />
          </span>
          <div className="min-w-0">
            <div className="flex min-w-0 flex-nowrap items-center gap-2 to-720:flex-wrap">
              <span className="min-w-0 truncate text-[14.5px] font-semibold leading-[1.4] text-ink to-720:overflow-visible to-720:whitespace-normal">
                {doc.title}
              </span>
              {doc.isNew && (
                <span className="rounded-full bg-[rgba(138,75,8,0.1)] px-2 py-[2px] text-[10.5px] font-bold tracking-[0.04em] text-tone-new">
                  {t('documents.new')}
                </span>
              )}
            </div>

            {doc.snippet && (
              <div className="mt-[6px] text-[13px] leading-[1.5] text-ink-600">
                …{doc.snippet.pre}
                <mark className="rounded-[3px] bg-brandA-18 px-[2px] font-semibold text-brand">
                  {doc.snippet.hit}
                </mark>
                {doc.snippet.post}…
              </div>
            )}

            <div className="mt-[7px] hidden text-[12.5px] text-ink-600 to-720:block">
              {doc.type} · {doc.organ} · {doc.dateLabel} · {doc.sizeLabel}
            </div>
          </div>
        </div>
      </td>

      <td className={`${CELL} p-4 to-720:!hidden`}>
        <span
          className="inline-block whitespace-nowrap rounded-full px-[11px] py-[4px] text-[12.5px] font-semibold"
          style={{ color: doc.toneColor, background: doc.toneBg }}
        >
          {doc.type}
        </span>
      </td>

      <td
        className={`${CELL} whitespace-nowrap p-4 text-[13.5px] leading-[1.4] text-ink-700 to-1100:!hidden`}
      >
        {doc.organ}
        <br />
        <span className="text-ink-600">{doc.number}</span>
      </td>

      <td
        className={`${CELL} whitespace-nowrap p-4 text-[13.5px] text-ink-700 to-720:!hidden`}
      >
        {doc.dateLabel}
      </td>

      <td
        className={`${CELL} whitespace-nowrap p-4 text-[13.5px] text-ink-700 to-900:!hidden`}
      >
        {doc.sizeLabel}
      </td>

      <td className={`${CELL} py-4 pl-4 pr-[18px]`}>
        <div className="flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={() => onPreview(doc.id)}
            className="inline-flex cursor-pointer items-center gap-[6px] rounded-[9px] border border-brandA-35 bg-white px-[14px] py-2 font-sans text-[13px] font-semibold text-brand transition-colors duration-[180ms] hover:bg-brandA-6"
          >
            <icons.eye size={15} />
            {t('common.view')}
          </button>
          <a
            href="#"
            onClick={(event) => event.preventDefault()}
            aria-label={t('documents.downloadLabel')}
            className="inline-flex h-9 w-9 flex-none items-center justify-center rounded-[9px] border border-hair-18 text-ink-700 transition-colors duration-[180ms] hover:border-brand hover:text-brand"
          >
            <icons.download size={16} />
          </a>
        </div>
      </td>
    </tr>
  );
}
