import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { newsService } from '@/api/services/newsService';
import { useAsyncData } from '@/hooks/useAsyncData';
import CtaSection from '@/pages/Home/sections/CtaSection';
import DirectionsSection from '@/pages/Home/sections/DirectionsSection';
import DocumentsSection from '@/pages/Home/sections/DocumentsSection';
import HeroSection from '@/pages/Home/sections/HeroSection';
import MilestoneStrip from '@/pages/Home/sections/MilestoneStrip';
import NewsSection from '@/pages/Home/sections/NewsSection';
import PublicationsSection from '@/pages/Home/sections/PublicationsSection';

/** Dizaynda 3 sütunlu grid var. */
const HOME_NEWS_LIMIT = 3;

export default function Home() {
  const { i18n } = useTranslation();

  const loadLatestNews = useCallback(() => newsService.getLatestNews(HOME_NEWS_LIMIT), []);
  const {
    data: news,
    loading,
    error,
    refetch,
  } = useAsyncData(loadLatestNews, [i18n.resolvedLanguage], []);

  return (
    <>
      <HeroSection />
      <MilestoneStrip />
      <DirectionsSection />
      <NewsSection news={news} loading={loading} error={error} onRetry={refetch} />
      <PublicationsSection />
      <DocumentsSection />
      <CtaSection />
    </>
  );
}
