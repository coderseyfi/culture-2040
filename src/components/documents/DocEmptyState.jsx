import { useTranslation } from 'react-i18next';
import { icons } from '@/assets/icons/icons';

export default function DocEmptyState({ onClear }) {
  const { t } = useTranslation();

  return (
    <div className="rounded-[14px] border border-hair-10 bg-white px-6 py-16 text-center">
      <span className="mb-5 inline-flex h-[60px] w-[60px] items-center justify-center rounded-full bg-surface-muted">
        <icons.search size={26} strokeWidth={1.6} color="#5a616a" />
      </span>
      <h3 className="m-0 mb-[10px] text-[20px] font-semibold text-ink">{t('documents.emptyTitle')}</h3>
      <p className="mx-auto mb-[22px] max-w-[420px] text-[14.5px] leading-[1.6] text-ink-700">
        {t('documents.emptyText')}
      </p>
      <button
        type="button"
        onClick={onClear}
        className="cursor-pointer rounded-[10px] border-none bg-ink-black px-[26px] py-[13px] font-sans text-[14.5px] font-semibold text-white transition-colors duration-[180ms] hover:bg-black"
      >
        {t('documents.emptyButton')}
      </button>
    </div>
  );
}
