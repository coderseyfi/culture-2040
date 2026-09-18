import { useTranslation } from 'react-i18next';
import { SUPPORTED_LANGUAGES } from '@/i18n/i18n';

/**
 * AZ | EN keçidi. Dil dəyişəndə i18next `languageChanged` hadisəsi
 * həm statik mətnləri, həm də `lang` header-i ilə gedən API sorğularını yeniləyir.
 */
export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const active = i18n.resolvedLanguage ?? i18n.language;

  return (
    <div
      className="text-[13px] font-medium tracking-[0.02em] text-ink-550"
      aria-label={t('common.language', 'Dil')}
    >
      {SUPPORTED_LANGUAGES.map((language, index) => (
        <span key={language}>
          {index > 0 && <span className="text-ink-200"> | </span>}
          <button
            type="button"
            onClick={() => i18n.changeLanguage(language)}
            aria-current={language === active ? 'true' : 'false'}
            // after:-inset-2 toxunma sahəsini görünüşü dəyişmədən böyüdür.
            className={`relative cursor-pointer border-none bg-transparent p-0 font-sans text-[13px] font-medium tracking-[0.02em] transition-colors duration-[180ms] after:absolute after:-inset-2 after:content-[''] ${
              language === active ? 'text-ink' : 'text-ink-550 hover:text-brand'
            }`}
          >
            {language.toUpperCase()}
          </button>
        </span>
      ))}
    </div>
  );
}
