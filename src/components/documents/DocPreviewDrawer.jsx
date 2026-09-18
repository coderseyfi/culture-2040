import { useTranslation } from 'react-i18next';
import { icons } from '@/assets/icons/icons';

const TOOL_BTN =
  'inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-[9px] border border-hair-18 bg-white text-ink-700';

const BAR = 'h-[9px] rounded-full bg-surface-deep';

export default function DocPreviewDrawer({ archive }) {
  const { t } = useTranslation();
  const { preview, related, closePreview, fullscreen, toggleFullscreen, openPreview } = archive;

  if (!preview) return null;

  const meta = `${preview.type} · ${preview.number} · ${preview.organ} · ${preview.dateLabel}`;
  const deepLink = `e-culture.az/senedler/${preview.slug}`;
  const fullLabel = fullscreen ? t('documents.exitFullscreen') : t('documents.fullscreen');

  return (
    <>
      <div className="fixed inset-0 z-[90] bg-[rgba(17,20,24,0.45)]" onClick={closePreview} />

      <aside
        role="dialog"
        aria-label={t('documents.previewTitle')}
        className="fixed bottom-0 right-0 top-0 z-[91] flex flex-col bg-white shadow-drawer transition-[width] duration-[280ms] ease-card"
        // 100vw scrollbar-ı da sayır və çekmecəni ekrandan kənara itələyir; fixed
        // element üçün 100% viewport-un real (scrollbar-sız) enidir.
        style={{ width: fullscreen ? '100%' : 'min(560px,100%)' }}
      >
        <div className="flex flex-none items-start justify-between gap-[14px] border-b border-hair-10 px-[18px] py-4">
          <div className="min-w-0">
            <div className="text-[16.5px] font-semibold leading-[1.35] text-ink">
              {preview.title}
            </div>
            <div className="mt-[6px] text-[13px] text-ink-700">{meta}</div>
          </div>
          <button
            type="button"
            onClick={closePreview}
            aria-label={t('documents.previewClose')}
            className={`${TOOL_BTN} flex-none transition-colors duration-[180ms] hover:border-brand hover:text-brand`}
          >
            <icons.close size={16} strokeWidth={2.2} />
          </button>
        </div>

        <div className="flex flex-none flex-wrap items-center gap-[6px] border-b border-hair-8 px-[18px] py-[10px]">
          <div className="flex items-center gap-1 rounded-[9px] border border-hair-18 p-[3px]">
            <button
              type="button"
              aria-label={t('documents.prevPage')}
              className="inline-flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-[6px] border-none bg-none text-ink-700"
            >
              <icons.chevronLeft size={15} />
            </button>
            <span className="px-1 text-[13px] text-ink-700">1 / 12</span>
            <button
              type="button"
              aria-label={t('documents.nextPage')}
              className="inline-flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-[6px] border-none bg-none text-ink-700"
            >
              <icons.chevronRight size={15} />
            </button>
          </div>

          <button type="button" aria-label={t('documents.zoomOut')} className={TOOL_BTN}>
            <icons.zoomOut size={15} />
          </button>
          <button type="button" aria-label={t('documents.zoomIn')} className={TOOL_BTN}>
            <icons.zoomIn size={15} />
          </button>
          <button
            type="button"
            onClick={toggleFullscreen}
            aria-label={fullLabel}
            aria-pressed={fullscreen}
            title={fullLabel}
            className={`${TOOL_BTN} transition-colors duration-[180ms] hover:border-brand hover:text-brand`}
          >
            {fullscreen ? <icons.minimize size={15} /> : <icons.maximize size={15} />}
          </button>
          <button type="button" aria-label={t('documents.print')} className={TOOL_BTN}>
            <icons.print size={15} />
          </button>

          <div className="flex-1" />

          <button
            type="button"
            className="inline-flex cursor-pointer items-center gap-[6px] rounded-[9px] border border-hair-18 bg-white px-3 py-2 font-sans text-[13px] font-semibold text-ink-700 transition-colors duration-[180ms] hover:border-brand hover:text-brand"
          >
            <icons.link size={14} />
            {t('documents.copyLink')}
          </button>
          <a
            href="#"
            onClick={(event) => event.preventDefault()}
            className="inline-flex items-center gap-[6px] rounded-[9px] bg-ink-black px-[14px] py-[9px] text-[13px] font-semibold text-white transition-colors duration-[180ms] hover:bg-black"
          >
            <icons.download size={14} />
            {t('common.download')}
          </a>
        </div>

        <div className="min-h-[240px] flex-1 overflow-y-auto bg-surface-deep p-[22px] to-480:p-3">
          <div
            className="mx-auto min-h-[420px] rounded-[6px] border border-hair-12 bg-white px-[34px] py-10 shadow-page to-480:px-4 to-480:py-6"
            style={{ maxWidth: fullscreen ? '820px' : '100%' }}
          >
            <div className="mb-[18px] text-[11px] font-bold tracking-[0.08em] text-ink-600">
              {preview.organ} · {preview.number}
            </div>
            <div className="mb-[18px] text-[19px] font-semibold leading-[1.4] text-ink">
              {preview.title}
            </div>
            <p className="m-0 mb-4 text-[14px] leading-[1.75] text-ink-800">
              {preview.excerpt}
            </p>
            <div className={`${BAR} mb-[11px]`} />
            <div className={`${BAR} mb-[11px] w-[92%]`} />
            <div className={`${BAR} mb-[11px] w-[97%]`} />
            <div className={`${BAR} mb-[26px] w-[64%]`} />
            <div className={`${BAR} mb-[11px] w-[88%]`} />
            <div className={`${BAR} w-[73%]`} />
          </div>
        </div>

        <div
          className="max-h-[30vh] flex-none overflow-y-auto border-t border-hair-10 px-[22px] py-4"
          style={{ display: fullscreen ? 'none' : 'block' }}
        >
          <div className="mb-[11px] text-[12px] font-bold tracking-[0.05em] text-ink-600">
            {t('documents.deepLink')}
          </div>
          <div className="mb-4 break-all rounded-[8px] bg-surface-muted px-3 py-[9px] text-[13px] text-brand">
            {deepLink}
          </div>

          {related.length > 0 && (
            <>
              <div className="mb-[11px] text-[12px] font-bold tracking-[0.05em] text-ink-600">
                {t('documents.related')}
              </div>
              {related.map((doc) => (
                <button
                  key={doc.id}
                  type="button"
                  onClick={() => openPreview(doc.id)}
                  className="mb-2 flex w-full cursor-pointer items-center justify-between gap-3 rounded-[9px] border border-hair-11 bg-white px-[13px] py-[11px] text-left font-sans transition-colors duration-[180ms] hover:border-brand"
                >
                  <span className="text-[13.5px] font-medium leading-[1.4] text-ink">
                    {doc.title}
                  </span>
                  <span className="flex-none text-[12px] text-ink-600">{doc.dateLabel}</span>
                </button>
              ))}
            </>
          )}
        </div>
      </aside>
    </>
  );
}
