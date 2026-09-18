import { useTranslation } from 'react-i18next';

/** «və ya» ayırıcısı. */
export default function OrDivider({ tone = 'text-ink-600' }) {
  const { t } = useTranslation();

  return (
    <div className="mb-4 flex items-center gap-3">
      <span className="h-px flex-1 bg-hair-10" />
      <span className={`text-[12.5px] ${tone}`}>{t('common.or')}</span>
      <span className="h-px flex-1 bg-hair-10" />
    </div>
  );
}
