import { useTranslation } from 'react-i18next';
import Container from '@/components/Container';
import DirectionCard from '@/components/DirectionCard';
import SectionHeader from '@/components/SectionHeader';
import { DIRECTIONS } from '@/constants/home';

export default function DirectionsSection() {
  const { t } = useTranslation();

  return (
    <section id="istiqametler" className="bg-surface">
      <Container className="py-[88px] to-900:py-14 to-540:py-10">
        <SectionHeader
          reveal
          eyebrow={t('home.directionsEyebrow')}
          title={t('home.directionsTitle')}
          titleClass="text-[38px]"
          className="mb-11"
        />
        <div className="grid grid-cols-4 gap-5 to-1100:grid-cols-3 to-900:grid-cols-2 to-480:grid-cols-1">
          {DIRECTIONS.map((direction) => (
            <DirectionCard key={direction.titleKey} {...direction} />
          ))}
        </div>
      </Container>
    </section>
  );
}
