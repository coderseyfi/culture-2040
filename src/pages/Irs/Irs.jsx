import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { newsService } from '@/api/services/newsService';
import { icons } from '@/assets/icons/icons';
import ArrowLink from '@/components/ArrowLink';
import Breadcrumbs from '@/components/Breadcrumbs';
import Container from '@/components/Container';
import DataState from '@/components/DataState';
import Eyebrow from '@/components/Eyebrow';
import NewsCard from '@/components/NewsCard';
import PublicationCard from '@/components/PublicationCard';
import { IRS_PUBLICATIONS } from '@/constants/irs';
import { ROUTES } from '@/constants/routes';
import { useAsyncData } from '@/hooks/useAsyncData';

const SUB_HEADING =
  'm-0 text-[26px] font-semibold tracking-[-0.01em] text-ink to-540:text-[21px]';
const NEWS_LIMIT = 3;

export default function Irs() {
  const { t, i18n } = useTranslation();

  const loadNews = useCallback(() => newsService.getLatestNews(NEWS_LIMIT), []);
  const {
    data: news,
    loading,
    error,
    refetch,
  } = useAsyncData(loadNews, [i18n.resolvedLanguage], []);

  return (
    <>
      <Breadcrumbs
        items={[
          { label: t('nav.home'), to: ROUTES.HOME },
          { label: t('nav.directions'), to: ROUTES.HOME },
          { label: t('heritage.title') },
        ]}
      />

      <section className="relative overflow-hidden border-b border-hair-6 bg-white">
        <icons.pageRings className="absolute -right-[60px] -top-10 h-[420px] w-[420px] opacity-50 to-900:hidden" />
        <Container className="relative pb-[52px] pt-16 to-640:pb-10 to-640:pt-10">
          <div className="max-w-[760px]">
            <div className="mb-5 inline-flex items-center gap-[10px]">
              <span className="inline-flex h-[52px] w-[52px] items-center justify-center rounded-[12px] bg-surface-soft">
                <icons.shield size={26} color="#0E6E6E" />
              </span>
              <Eyebrow>{t('heritage.eyebrow')}</Eyebrow>
            </div>
            <h1 className="m-0 mb-[18px] text-[44px] font-light leading-[1.12] tracking-[-0.02em] text-ink to-820:text-[36px] to-540:text-[30px] to-360:text-[26px]">
              {t('heritage.title')}
            </h1>
            <p className="m-0 max-w-[680px] text-[18px] leading-[1.7] text-ink-600 to-540:text-[16px]">
              {t('heritage.lead')}
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-surface">
        <Container className="pb-10 pt-16 to-640:pt-10">
          <Eyebrow className="mb-3">{t('heritage.programEyebrow')}</Eyebrow>
          <h2 className={`${SUB_HEADING} mb-5`}>{t('heritage.programHeading')}</h2>
          <a
            href="#"
            onClick={(event) => event.preventDefault()}
            className="flex max-w-[760px] items-center justify-between gap-5 rounded-[14px] border border-hair-8 bg-surface-soft px-[30px] py-7 text-ink transition-colors duration-[350ms] hover:border-brandA-35 to-540:flex-col to-540:items-start to-540:gap-4 to-540:px-5 to-540:py-6"
          >
            <div>
              <div className="mb-2 text-[12px] font-semibold tracking-[0.03em] text-ink-500">
                {t('heritage.programYears')}
              </div>
              <div className="mb-2 text-[20px] font-semibold leading-[1.3] to-540:text-[18px]">
                {t('heritage.programTitle')}
              </div>
              <div className="text-[15px] text-ink-600">{t('heritage.programText')}</div>
            </div>
            <span className="inline-flex h-[44px] w-[44px] flex-none items-center justify-center rounded-[10px] bg-white text-brand">
              <icons.arrowUpRight size={20} />
            </span>
          </a>
        </Container>
      </section>

      <section className="bg-surface">
        <Container className="pb-10 pt-6">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <Eyebrow className="mb-3">{t('heritage.newsEyebrow')}</Eyebrow>
              <h2 className={SUB_HEADING}>{t('heritage.newsHeading')}</h2>
            </div>
            <ArrowLink to={ROUTES.XEBERLER}>{t('home.newsAll')}</ArrowLink>
          </div>

          <DataState
            loading={loading}
            error={error}
            isEmpty={news.length === 0}
            emptyText={t('news.empty')}
            onRetry={refetch}
          >
            <div className="grid grid-cols-3 gap-[26px] to-900:grid-cols-2 to-640:grid-cols-1">
              {news.map((item) => (
                <NewsCard key={item.id} news={item} variant="home" />
              ))}
            </div>
          </DataState>
        </Container>
      </section>

      <section className="border-t border-hair-6 bg-surface-soft">
        <Container className="pb-[72px] pt-16 to-640:pb-12 to-640:pt-10">
          <Eyebrow className="mb-3">{t('heritage.publicationsEyebrow')}</Eyebrow>
          <h2 className={`${SUB_HEADING} mb-5`}>{t('heritage.publicationsHeading')}</h2>
          <div className="grid grid-cols-4 gap-5 to-1100:grid-cols-3 to-900:grid-cols-2 to-480:grid-cols-1">
            {IRS_PUBLICATIONS.map((publication) => (
              <PublicationCard key={publication.titleKey} {...publication} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
