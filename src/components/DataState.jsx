import { useTranslation } from 'react-i18next';
import { icons } from '@/assets/icons/icons';

/**
 * API bloklarının yüklənmə / xəta / boş vəziyyətləri.
 * Heç bir vəziyyət aktiv deyilsə `children` göstərilir.
 */
export default function DataState({
  loading,
  error,
  isEmpty,
  emptyText,
  onRetry,
  children,
}) {
  const { t } = useTranslation();

  if (loading) {
    return (
      <div
        className="py-16 text-center text-[14.5px] text-ink-600"
        role="status"
        aria-live="polite"
      >
        {t('common.loading')}
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="rounded-[14px] border border-hair-10 bg-white px-6 py-12 text-center"
        role="alert"
      >
        <span className="mb-4 inline-flex h-[52px] w-[52px] items-center justify-center rounded-full bg-surface-muted text-ink-600">
          <icons.close size={20} strokeWidth={2} />
        </span>
        <h3 className="m-0 mb-2 text-[18px] font-semibold text-ink">{t('common.error')}</h3>
        <p className="mx-auto mb-5 max-w-[420px] text-[14px] leading-[1.6] text-ink-600">
          {t('common.errorHint')}
        </p>
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="cursor-pointer rounded-[10px] border-none bg-ink-black px-[22px] py-[11px] font-sans text-[14px] font-semibold text-white transition-colors duration-[180ms] hover:bg-black"
          >
            {t('common.retry')}
          </button>
        )}
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className="rounded-[14px] border border-hair-10 bg-white px-6 py-12 text-center text-[14.5px] text-ink-600">
        {emptyText ?? t('common.empty')}
      </div>
    );
  }

  return children;
}
