import axiosInstance, { MAX_PER_PAGE } from '@/api/axiosInstance';
import { resolveMediaUrl } from '@/utils/media';

/**
 * GET /news cavabı (list və detal eyni sahələri paylaşır):
 *   { id, slug, title, lead, date, dateLabel, featured, image, imageAlt,
 *     category: { id, slug, name, label, color }, availableLocales }
 * Detalda əlavə: body — abzas mətnlərindən ibarət massiv (HTML deyil).
 */
function normalise(item) {
  return {
    id: item.id,
    slug: item.slug,
    title: item.title ?? '',
    lead: item.lead ?? '',
    date: item.date ?? null,
    dateLabel: item.dateLabel ?? '',
    featured: Boolean(item.featured),
    image: resolveMediaUrl(item.image),
    imageAlt: item.imageAlt ?? item.title ?? '',
    category: item.category
      ? {
          id: item.category.id,
          slug: item.category.slug,
          name: item.category.name,
          label: item.category.label ?? item.category.name,
          color: item.category.color ?? null,
        }
      : null,
    body: Array.isArray(item.body) ? item.body : [],
  };
}

/** Laravel resource paginator-unu interfeysin gözlədiyi formaya salır. */
function toPage(response) {
  const meta = response?.meta ?? {};
  return {
    items: (response?.data ?? []).map(normalise),
    page: meta.current_page ?? 1,
    lastPage: meta.last_page ?? 1,
    perPage: meta.per_page ?? 0,
    total: meta.total ?? 0,
  };
}

export const newsService = {
  /**
   * GET /news
   * @param {{ page?: number, perPage?: number, category?: string, q?: string, featured?: boolean }} params
   *   `category` — kateqoriya slug-ı, `q` — axtarış sözü.
   */
  async getNews({ page, perPage, category, q, featured } = {}) {
    const response = await axiosInstance.get('/news', {
      params: {
        page,
        per_page: perPage ? Math.min(perPage, MAX_PER_PAGE) : undefined,
        category: category || undefined,
        q: q || undefined,
        featured: featured ? 1 : undefined,
      },
    });
    return toPage(response);
  },

  /** GET /news/{slug} */
  async getNewsBySlug(slug) {
    const response = await axiosInstance.get(`/news/${slug}`);
    return response?.data ? normalise(response.data) : null;
  },

  /** Ana səhifə və İrs bloku üçün son xəbərlər. */
  async getLatestNews(limit = 3) {
    const { items } = await newsService.getNews({ perPage: limit, page: 1 });
    return items;
  },

  /** GET /news-categories — { id, slug, name, label, color, newsCount }[] */
  async getCategories() {
    const response = await axiosInstance.get('/news-categories');
    return response?.data ?? [];
  },
};
