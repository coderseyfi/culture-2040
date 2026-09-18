import Container from '@/components/Container';
import Eyebrow from '@/components/Eyebrow';

/** Daxili səhifələrin başlıq bloku (Konsepsiya, Sənədlər, Xəbərlər). */
export default function PageHero({
  eyebrow,
  title,
  description,
  descriptionTone = 'text-ink-700',
  eyebrowSpacing = 'mb-3',
  paddingBottom = 'pb-10',
}) {
  return (
    <section className="border-b border-hair-6 bg-surface">
      <Container className={`pt-14 to-640:pt-10 to-420:pt-8 ${paddingBottom}`}>
        <div className="max-w-[760px]">
          <Eyebrow className={eyebrowSpacing}>{eyebrow}</Eyebrow>
          <h1 className="m-0 mb-[18px] text-[44px] font-light leading-[1.12] tracking-[-0.02em] text-ink to-820:text-[36px] to-540:text-[30px] to-360:text-[26px]">
            {title}
          </h1>
          <p className={`m-0 text-[18px] to-540:text-[16px] ${descriptionTone}`}>{description}</p>
        </div>
      </Container>
    </section>
  );
}
