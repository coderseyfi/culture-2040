import { useTranslation } from 'react-i18next';
import Container from '@/components/Container';
import DocCategoryCard from '@/components/DocCategoryCard';
import SectionHeader from '@/components/SectionHeader';
import { DOC_CATEGORIES } from '@/constants/home';
import { ROUTES } from '@/constants/routes';

export default function DocumentsSection() {
  const { t } = useTranslation();

  return (
    <section className="border-t border-hair-6 bg-surface">
      <Container className="py-20 to-900:py-14 to-540:py-10">
        <SectionHeader
          reveal
          eyebrow={t('home.documentsEyebrow')}
          title={t('home.documentsTitle')}
          link={{ to: ROUTES.SENEDLER, label: t('home.documentsAll') }}
          className="mb-10"
        />
        <div className="grid grid-cols-4 gap-[18px] to-1100:grid-cols-3 to-900:grid-cols-2 to-480:grid-cols-1">
          {DOC_CATEGORIES.map((category) => (
            <DocCategoryCard key={category.titleKey} {...category} to={ROUTES.SENEDLER} />
          ))}
        </div>
      </Container>
    </section>
  );
}
