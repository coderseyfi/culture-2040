import { API_ORIGIN } from '@/api/axiosInstance';

/**
 * API iki cür media yolu qaytarır:
 *  - `cover_image` — mütləq URL (Laravel `asset()`, http:// ilə)
 *  - `images[]`    — public qovluğuna nisbi yol
 * Hər ikisini brauzerdə açıla bilən https URL-ə çevirir.
 */
export function resolveMediaUrl(path) {
  if (!path) return null;

  if (/^https?:\/\//i.test(path)) {
    // Sayt https-dədirsə, http:// media mixed content kimi bloklanır.
    return path.replace(/^http:\/\//i, 'https://');
  }

  return `${API_ORIGIN}/${String(path).replace(/^\/+/, '')}`;
}
