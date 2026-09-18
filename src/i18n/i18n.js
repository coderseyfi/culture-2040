import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import az from '@/locales/az.json';
import en from '@/locales/en.json';

export const SUPPORTED_LANGUAGES = ['az', 'en'];
export const DEFAULT_LANGUAGE = 'az';

const STORAGE_KEY = 'lang';

function readStoredLanguage() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return SUPPORTED_LANGUAGES.includes(stored) ? stored : DEFAULT_LANGUAGE;
  } catch {
    // Private mode / bloklanmış storage — default dilə qayıdırıq.
    return DEFAULT_LANGUAGE;
  }
}

i18n.use(initReactI18next).init({
  resources: {
    az: { translation: az },
    en: { translation: en },
  },
  lng: readStoredLanguage(),
  fallbackLng: DEFAULT_LANGUAGE,
  supportedLngs: SUPPORTED_LANGUAGES,
  interpolation: { escapeValue: false },
});

/** Seçilmiş dili yadda saxlayır və <html lang="..."> atributunu yeniləyir. */
function syncDocumentLanguage(language) {
  document.documentElement.setAttribute('lang', language);
  try {
    localStorage.setItem(STORAGE_KEY, language);
  } catch {
    // Storage əlçatan deyilsə, dil yalnız cari sessiyada qalır.
  }
}

syncDocumentLanguage(i18n.language);
i18n.on('languageChanged', syncDocumentLanguage);

/** API sorğularının `lang` header-i üçün cari dil. */
export function currentLanguage() {
  const language = i18n.resolvedLanguage ?? i18n.language ?? DEFAULT_LANGUAGE;
  return SUPPORTED_LANGUAGES.includes(language) ? language : DEFAULT_LANGUAGE;
}

export default i18n;
