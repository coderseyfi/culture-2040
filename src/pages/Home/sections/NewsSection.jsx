import { useTranslation } from 'react-i18next';
import Container from '@/components/Container';
import DataState from '@/components/DataState';
import NewsCard from '@/components/NewsCard';
import SectionHeader from '@/components/SectionHeader';
import { ROUTES } from '@/constants/routes';

/** Ana səhifənin «Son yeniliklər» bloku — `/last-news` endpoint-i. */
export default function NewsSection({ news, loading, error, onRetry }) {
  const { t } = useTranslation();

  return (
    <section className="bg-surface">
      <Container className="py-[88px] to-900:py-14 to-540:py-10">
        <SectionHeader
          eyebrow={t('home.newsEyebrow')}
          title={t('home.newsTitle')}
          link={{ to: ROUTES.XEBERLER, label: t('home.newsAll') }}
          className="mb-10"
        />

        <DataState
          loading={loading}
          error={error}
          isEmpty={news.length === 0}
          emptyText={t('news.empty')}
          onRetry={onRetry}
        >
          <div className="grid grid-cols-3 gap-[26px] to-900:grid-cols-2 to-640:grid-cols-1">
            {news.map((item) => (
              <NewsCard key={item.id} news={item} variant="home" />
            ))}
          </div>
        </DataState>
      </Container>
    </section>
  );
}
