import { useTranslation } from 'react-i18next';
import DocTableRow from '@/components/documents/DocTableRow';

const TH =
  'sticky top-[var(--doc-th-top,203px)] z-10 bg-surface-muted shadow-[inset_0_-1px_0_rgba(17,20,24,0.1)] first:rounded-tl-[13px] last:rounded-tr-[13px] to-720:static';

const TH_LABEL = 'text-[12px] font-bold tracking-[0.04em] text-ink-700';

const SORT_BTN = `inline-flex cursor-pointer items-center gap-[6px] border-none bg-none p-0 font-sans ${TH_LABEL}`;

export default function DocTable({ archive }) {
  const { t } = useTranslation();
  const { rows, sortArrow, sortBy, toggleSelect, openPreview } = archive;

  return (
    <div className="rounded-[14px] border border-hair-11 bg-white">
      <table className="w-full table-fixed border-separate border-spacing-0 to-720:block to-720:w-full">
        <thead className="to-720:hidden">
          <tr className="bg-surface-muted">
            <th scope="col" className={`${TH} w-[46px] py-[13px] pl-[18px] pr-0`}>
              <span className="sr-only">{t('documents.select')}</span>
            </th>
            <th
              scope="col"
              className={`${TH} w-auto min-w-[280px] py-[13px] pl-[10px] pr-4 text-left`}
            >
              <button type="button" onClick={() => sortBy('title', 'asc')} className={SORT_BTN}>
                {t('documents.colTitle')} <span className="text-brand">{sortArrow('title')}</span>
              </button>
            </th>
            <th
              scope="col"
              className={`${TH} ${TH_LABEL} w-[112px] px-4 py-[13px] text-left to-720:hidden`}
            >
              {t('documents.colType')}
            </th>
            <th
              scope="col"
              className={`${TH} ${TH_LABEL} w-[146px] px-4 py-[13px] text-left to-1100:hidden`}
            >
              {t('documents.colOrgan')}
            </th>
            <th scope="col" className={`${TH} w-[104px] px-4 py-[13px] text-left to-720:hidden`}>
              <button type="button" onClick={() => sortBy('date', 'desc')} className={SORT_BTN}>
                {t('documents.colDate')} <span className="text-brand">{sortArrow('date')}</span>
              </button>
            </th>
            <th scope="col" className={`${TH} w-[124px] px-4 py-[13px] text-left to-900:hidden`}>
              <button type="button" onClick={() => sortBy('size', 'asc')} className={SORT_BTN}>
                {t('documents.colSize')} <span className="text-brand">{sortArrow('size')}</span>
              </button>
            </th>
            <th
              scope="col"
              className={`${TH} ${TH_LABEL} w-[154px] py-[13px] pl-4 pr-[18px] text-right`}
            >
              {t('documents.colActions')}
            </th>
          </tr>
        </thead>

        <tbody className="to-720:block to-720:w-full [&>tr:last-child>td:first-child]:rounded-bl-[13px] [&>tr:last-child>td:last-child]:rounded-br-[13px]">
          {rows.map((doc) => (
            <DocTableRow
              key={doc.id}
              doc={doc}
              onToggle={toggleSelect}
              onPreview={openPreview}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
