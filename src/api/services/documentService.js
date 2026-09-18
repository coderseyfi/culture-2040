import axiosInstance, { MAX_PER_PAGE } from '@/api/axiosInstance';
import { resolveMediaUrl } from '@/utils/media';

/**
 * GET /documents cavabı:
 *   { id, slug, title, excerpt, number, date, dateLabel, isNew, featured,
 *     format, size, sizeLabel, fileUrl,
 *     type: { id, slug, name, tone, color }, organ: { id, slug, name } }
 */
function normalise(item) {
  return {
    id: item.id,
    slug: item.slug,
    title: item.title ?? '',
    excerpt: item.excerpt ?? '',
    number: item.number ?? '',
    date: item.date ?? '',
    dateLabel: item.dateLabel ?? '',
    isNew: Boolean(item.isNew),
    featured: Boolean(item.featured),
    format: item.format ?? 'PDF',
    size: typeof item.size === 'number' ? item.size : 0,
    sizeLabel: item.sizeLabel ?? '',
    fileUrl: resolveMediaUrl(item.fileUrl),
    typeSlug: item.type?.slug ?? null,
    typeName: item.type?.name ?? '',
    tone: item.type?.tone ?? null,
    toneColor: item.type?.color ?? '#12607F',
    organSlug: item.organ?.slug ?? null,
    organName: item.organ?.name ?? '',
    ts: item.date ? new Date(item.date).getTime() : 0,
  };
}

export const documentService = {
  /**
   * GET /documents
   *
   * Diqqət: API sıralama (`sort`) və tarix aralığı parametrlərini dəstəkləmir,
   * interfeysdə isə hər ikisi var. Ona görə bütün sənədlər bir dəfəyə çəkilir
   * (`per_page` limiti 50-dir) və filtr/sıralama/səhifələmə klient tərəfdə
   * aparılır. Arxiv 50-ni keçəndə API-yə `sort` və tarix filtri əlavə olunmalıdır.
   */
  async getAll() {
    const response = await axiosInstance.get('/documents', {
      params: { per_page: MAX_PER_PAGE },
    });
    return (response?.data ?? []).map(normalise);
  },

  /** GET /documents/{slug} */
  async getBySlug(slug) {
    const response = await axiosInstance.get(`/documents/${slug}`);
    return response?.data ? normalise(response.data) : null;
  },

  /** GET /document-types — { id, slug, name, tone, color, documentsCount }[] */
  async getTypes() {
    const response = await axiosInstance.get('/document-types');
    return response?.data ?? [];
  },

  /** GET /document-organs — { id, slug, name, documentsCount }[] */
  async getOrgans() {
    const response = await axiosInstance.get('/document-organs');
    return response?.data ?? [];
  },
};
