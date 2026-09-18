import axios from 'axios';
import { currentLanguage } from '@/i18n/i18n';

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '';

/** Media fayllarının kökü: ".../api/v1" hissəsi kəsilir. */
export const API_ORIGIN = API_BASE_URL.replace(/\/api(\/v\d+)?\/?$/, '');

/** API `per_page`-i 50-dən yuxarı qəbul etmir (51+ boş cavab qaytarır). */
export const MAX_PER_PAGE = 50;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

/**
 * Backend dili `lang` header-indən oxuyur (Laravel `localization` middleware).
 * Hər sorğuya ayrıca yazmamaq üçün burada, mərkəzi şəkildə əlavə olunur.
 */
axiosInstance.interceptors.request.use((config) => {
  config.headers.lang = currentLanguage();

  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const normalised = new Error(
      error.response?.data?.message ?? error.message ?? 'Gözlənilməz xəta baş verdi.',
    );
    normalised.status = error.response?.status ?? null;
    return Promise.reject(normalised);
  },
);

export default axiosInstance;
