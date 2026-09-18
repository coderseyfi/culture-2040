import { useTranslation } from 'react-i18next';
import { icons } from '@/assets/icons/icons';
import Button from '@/components/Button';
import GridPattern from '@/components/GridPattern';
import { ROUTES } from '@/constants/routes';

export default function HeroSection() {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden bg-white">
      <GridPattern variant="hero" />

      <icons.heroRings className="absolute -right-[60px] -top-10 h-[520px] w-[520px] opacity-50 to-900:hidden" />

      <div className="pointer-events-none absolute -top-[120px] left-[10%] h-[340px] w-[340px] animate-blob rounded-full bg-[radial-gradient(circle,rgba(14,110,110,0.14),transparent_70%)] blur-[10px] to-640:hidden" />
      <div className="pointer-events-none absolute -bottom-[160px] right-[8%] h-[420px] w-[420px] animate-blob-rev rounded-full bg-[radial-gradient(circle,rgba(22,22,22,0.06),transparent_70%)] blur-[14px] to-640:hidden" />

      <div className="relative mx-auto max-w-container px-4 pb-[104px] pt-24 to-900:pb-16 to-900:pt-14 to-540:pb-12 to-540:pt-10 to-320:px-3">
        <div className="max-w-[720px]">
          <div className="mb-[26px] inline-flex max-w-full items-center gap-2 rounded-full border border-brandA-18 bg-surface-soft px-[13px] py-[6px] text-[13px] font-semibold tracking-[0.04em] text-brand to-540:mb-5 to-360:text-[11.5px]">
            <span className="h-[6px] w-[6px] flex-none animate-pulse-dot rounded-full bg-brand" />
            {t('home.badge')}
          </div>

          <h1 className="m-0 mb-[22px] break-words text-[64px] font-light leading-[1.05] tracking-[-0.025em] text-ink to-1100:text-[54px] to-820:text-[44px] to-540:text-[36px] to-360:text-[30px] to-320:text-[27px]">
            {t('home.titleLead')}
            <span className="animate-grad-text bg-[linear-gradient(90deg,#0E6E6E,#146C94,#1F7A5C,#0E6E6E)] bg-[length:300%_100%] bg-clip-text font-semibold text-transparent">
              {t('home.titleAccent')}
            </span>
          </h1>

          <p className="m-0 mb-3 text-[20px] font-medium text-ink to-540:text-[17px]">{t('home.subtitle')}</p>
          <p className="m-0 mb-9 max-w-[600px] text-[17px] text-ink-600 to-540:mb-7 to-540:text-[15px]">{t('home.text')}</p>

          <div className="flex flex-wrap gap-[14px] to-360:[&>*]:w-full to-360:[&>*]:justify-center">
            <Button to={ROUTES.KONSEPSIYA} variant="gradient" size="lg" className="shadow-btn-lg">
              {t('home.ctaConcept')}
              <icons.arrowRight size={17} />
            </Button>
            <Button href="#" variant="outline" size="lg" onClick={(e) => e.preventDefault()}>
              {t('home.ctaPlan')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
