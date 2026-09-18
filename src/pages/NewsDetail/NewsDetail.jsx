import { useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { newsService } from '@/api/services/newsService';
import { icons } from '@/assets/icons/icons';
import Breadcrumbs from '@/components/Breadcrumbs';
import Button from '@/components/Button';
import Container from '@/components/Container';
import DataState from '@/components/DataState';
import Eyebrow from '@/components/Eyebrow';
import ImageSlot from '@/components/ImageSlot';
import NewsCard from '@/components/NewsCard';
import { ROUTES, newsPath } from '@/constants/routes';
import { useAsyncData } from '@/hooks/useAsyncData';

const RELATED_LIMIT = 2;

export default function NewsDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const language = i18n.resolvedLanguage;

  const loadArticle = useCallback(() => newsService.getNewsBySlug(slug), [slug]);
  const loadRelated = useCallback(() => newsService.getLatestNews(RELATED_LIMIT + 1), []);

  const { data: article, loading, error, refetch } = useAsyncData(loadArticle, [slug, language]);
  const { data: latest } = useAsyncData(loadRelated, [slug, language], []);
  const related = latest.filter((item) => item.slug !== slug).slice(0, RELATED_LIMIT);

  // Slug dilə görə dəyişir; API köhnə slug-ı da həll edir, ona görə dil
  // dəyişəndən sonra URL yeni dilin slug-ına yönləndirilir.
  useEffect(() => {
    if (article?.slug && article.slug !== slug) {
      navigate(newsPath(article.slug), { replace: true });
    }
  }, [article, slug, navigate]);

  // 404 ayrıca göstərilir: bu, şəbəkə xətası deyil, sadəcə olmayan xəbərdir.
  const notFound = error?.status === 404;

  if (loading || error || !article) {
    return (
      <section className="bg-surface">
        <Container className="py-20">
          <DataState
            loading={loading}
            error={notFound ? null : error}
            isEmpty={notFound || !article}
            emptyText={t('news.notFound')}
            onRetry={refetch}
          />
        </Container>
      </section>
    );
  }

  return (
    <>
      <Breadcrumbs
        tone="soft"
        items={[
          { label: t('nav.home'), to: ROUTES.HOME },
          { label: t('news.title'), to: ROUTES.XEBERLER },
          { label: article.title },
        ]}
      />

      <article className="bg-surface">
        <div className="mx-auto max-w-[820px] px-4 pb-[72px] pt-12 to-640:pb-12 to-640:pt-8 to-320:px-3">
          {article.category && (
            <Eyebrow className="mb-[14px]">{article.category.label}</Eyebrow>
          )}
          <h1 className="m-0 mb-[18px] break-words text-[42px] font-light leading-[1.15] tracking-[-0.02em] text-ink to-820:text-[34px] to-540:text-[28px] to-360:text-[25px]">
            {article.title}
          </h1>

          <div className="mb-7 flex flex-wrap items-center gap-[14px] border-b border-hair-10 pb-[26px]">
            <time dateTime={article.date ?? undefined} className="text-[14px] font-medium text-ink-700">
              {article.dateLabel}
            </time>
            <span className="text-ink-200">·</span>
            <span className="text-[14px] text-ink-600">{t('news.source')}</span>
          </div>

          {article.image && (
            <div className="mb-8 aspect-[16/9] overflow-hidden rounded-[14px] border border-hair-8">
              <ImageSlot src={article.image} alt={article.imageAlt} />
            </div>
          )}

          {article.lead && (
            <p className="m-0 mb-[26px] text-[19px] font-medium leading-[1.65] text-ink to-540:text-[17px]">
              {article.lead}
            </p>
          )}

          {/* `body` — API-dən gələn abzas mətnləri massivi (HTML deyil). */}
          {article.body.map((paragraph, index) => (
            <p key={index} className="m-0 mb-[22px] text-[16.5px] leading-[1.8] text-ink-800">
              {paragraph}
            </p>
          ))}

          <div className="mt-9 flex flex-wrap gap-3 border-t border-hair-10 pt-7">
            <Button to={ROUTES.XEBERLER} variant="outlineStrong" size="md" className="text-ink">
              <icons.arrowLeft size={16} />
              {t('news.backToList')}
            </Button>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="border-t border-hair-8 bg-white">
          <Container className="pb-[72px] pt-14 to-640:pb-12 to-640:pt-10">
            <h2 className="m-0 mb-7 text-[26px] font-light tracking-[-0.01em] text-ink to-540:text-[22px]">
              {t('news.other')}
            </h2>
            <div className="grid grid-cols-2 gap-[26px] to-640:grid-cols-1">
              {related.map((item) => (
                <NewsCard key={item.id} news={item} variant="compact" />
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
