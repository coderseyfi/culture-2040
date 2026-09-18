import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { newsService } from '@/api/services/newsService';
import { icons } from '@/assets/icons/icons';
import Breadcrumbs from '@/components/Breadcrumbs';
import Container from '@/components/Container';
import DataState from '@/components/DataState';
import NewsCard from '@/components/NewsCard';
import PageHero from '@/components/PageHero';
import { ROUTES } from '@/constants/routes';
import { useAsyncData } from '@/hooks/useAsyncData';

const ARROW_BTN =
  'inline-flex h-[38px] w-[38px] items-center justify-center rounded-[9px] border border-hair-18 bg-white transition-colors duration-[180ms] hover:border-brand';

export default function NewsList() {
  const { t, i18n } = useTranslation();
  const [page, setPage] = useState(1);

  const loadNews = useCallback(() => newsService.getNews({ page }), [page]);
  const { data, loading, error, refetch } = useAsyncData(
    loadNews,
    [page, i18n.resolvedLanguage],
    { items: [], page: 1, lastPage: 1, total: 0 },
  );

  const isFirst = data.page <= 1;
  const isLast = data.page >= data.lastPage;

  return (
    <>
      <Breadcrumbs
        tone="soft"
        items={[{ label: t('nav.home', 'Ana səhifə'), to: ROUTES.HOME }, { label: t('news.title') }]}
      />

      <PageHero
        eyebrow={t('news.eyebrow')}
        title={t('news.title')}
        description={t('news.lead')}
        eyebrowSpacing="mb-[14px]"
      />

      <section className="bg-surface">
        <Container className="pb-20 pt-12 to-640:pb-12 to-640:pt-8">
          <DataState
            loading={loading}
            error={error}
            isEmpty={data.items.length === 0}
            emptyText={t('news.empty')}
            onRetry={refetch}
          >
            <div className="grid grid-cols-3 gap-[26px] to-900:grid-cols-2 to-640:grid-cols-1">
              {data.items.map((item) => (
                <NewsCard key={item.id} news={item} variant="list" />
              ))}
            </div>

            {data.lastPage > 1 && (
              <nav
                aria-label={t('documents.pagination')}
                className="mt-10 flex items-center justify-center gap-[10px]"
              >
                <button
                  type="button"
                  onClick={() => setPage((value) => Math.max(1, value - 1))}
                  disabled={isFirst}
                  aria-label={t('documents.prevPage')}
                  className={`${ARROW_BTN} ${isFirst ? 'cursor-not-allowed text-ink-300' : 'cursor-pointer text-ink-700'}`}
                >
                  <icons.chevronLeft size={16} />
                </button>
                <span className="text-[13.5px] text-ink-700">
                  {data.page} / {data.lastPage}
                </span>
                <button
                  type="button"
                  onClick={() => setPage((value) => value + 1)}
                  disabled={isLast}
                  aria-label={t('documents.nextPage')}
                  className={`${ARROW_BTN} ${isLast ? 'cursor-not-allowed text-ink-300' : 'cursor-pointer text-ink-700'}`}
                >
                  <icons.chevronRight size={16} />
                </button>
              </nav>
            )}
          </DataState>
        </Container>
      </section>
    </>
  );
}
