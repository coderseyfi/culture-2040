import { useTranslation } from 'react-i18next';
import Container from '@/components/Container';
import PublicationCard from '@/components/PublicationCard';
import SectionHeader from '@/components/SectionHeader';
import { PUBLICATIONS } from '@/constants/home';

export default function PublicationsSection() {
  const { t } = useTranslation();

  return (
    <section className="border-t border-hair-6 bg-surface-soft">
      <Container className="py-20 to-900:py-14 to-540:py-10">
        <SectionHeader
          eyebrow={t('home.publicationsEyebrow')}
          title={t('home.publicationsTitle')}
          className="mb-11"
        />
        <div className="grid grid-cols-4 gap-5 to-1100:grid-cols-3 to-900:grid-cols-2 to-480:grid-cols-1">
          {PUBLICATIONS.map((publication) => (
            <PublicationCard key={publication.slotId} {...publication} />
          ))}
        </div>
      </Container>
    </section>
  );
}
