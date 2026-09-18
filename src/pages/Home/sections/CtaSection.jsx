import { useTranslation } from 'react-i18next';
import { icons } from '@/assets/icons/icons';
import Button from '@/components/Button';
import { ROUTES } from '@/constants/routes';

export default function CtaSection() {
  const { t } = useTranslation();

  return (
    <section className="relative animate-cta-bg overflow-hidden bg-[linear-gradient(120deg,#0E6E6E,#146C94,#0a5252,#1F7A5C,#0E6E6E)] bg-[length:320%_320%]">
      <icons.ctaRings className="absolute -right-10 -top-[60px] h-[420px] w-[420px] opacity-[0.14] to-900:hidden" />

      <div className="relative mx-auto flex max-w-container flex-wrap items-center justify-between gap-8 px-4 py-[72px] to-640:py-12 to-320:px-3">
        <div className="max-w-[640px]">
          <h2 className="m-0 mb-[14px] text-[36px] font-light leading-[1.15] tracking-[-0.02em] text-white to-900:text-[30px] to-540:text-[25px]">
            {t('home.ctaTitle')}
          </h2>
          <p className="m-0 text-[17px] text-white/85 to-540:text-[15px]">{t('home.ctaText')}</p>
        </div>
        <Button to={ROUTES.LOGIN} variant="white" size="xl" className="flex-none to-420:w-full to-420:justify-center">
          {t('home.ctaButton')}
          <icons.arrowRight size={18} />
        </Button>
      </div>
    </section>
  );
}
