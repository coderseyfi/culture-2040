import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { images } from '@/assets/images/images';
import Container from '@/components/Container';
import { FOOTER_DOCS, FOOTER_NAV } from '@/constants/navigation';
import { ROUTES } from '@/constants/routes';

const LINK_CLASS =
  'mb-[11px] block text-[14px] text-ink-200 transition-colors duration-[180ms] hover:text-white';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-ink text-ink-200">
      <Container className="pb-8 pt-16 to-640:pt-10">
        <div className="grid grid-cols-[1.4fr_1fr_1fr_1fr] gap-10 to-900:grid-cols-2 to-900:gap-8 to-420:grid-cols-1">
          <div>
            <div className="mb-4 flex items-center gap-[11px]">
              <img
                src={images.coatOfArms}
                alt={t('site.coatOfArms')}
                className="block h-[38px] w-[34px] object-contain"
              />
              <span className="text-[16px] font-semibold text-white">{t('footer.title')}</span>
            </div>
            <p className="m-0 max-w-[280px] text-[14px] text-ink-500">{t('footer.about')}</p>
          </div>

          <div>
            <div className="mb-4 text-[13px] font-semibold tracking-[0.05em] text-white">
              {t('footer.links')}
            </div>
            {FOOTER_NAV.map((item) =>
              item.to ? (
                <Link
                  key={item.labelKey}
                  to={`${item.to}${item.hash ?? ''}`}
                  className={LINK_CLASS}
                >
                  {t(item.labelKey)}
                </Link>
              ) : (
                <a
                  key={item.labelKey}
                  href="#"
                  onClick={(event) => event.preventDefault()}
                  className={LINK_CLASS}
                >
                  {t(item.labelKey)}
                </a>
              ),
            )}
          </div>

          <div>
            <div className="mb-4 text-[13px] font-semibold tracking-[0.05em] text-white">
              {t('footer.documents')}
            </div>
            {FOOTER_DOCS.map((labelKey) => (
              <Link key={labelKey} to={ROUTES.SENEDLER} className={LINK_CLASS}>
                {t(labelKey)}
              </Link>
            ))}
          </div>

          <div>
            <div className="mb-4 text-[13px] font-semibold tracking-[0.05em] text-white">
              {t('footer.contact')}
            </div>
            <div className="text-[14px] leading-[1.7] text-ink-200">
              {t('footer.address')}
              <br />
              {t('footer.phone')}
              <br />
              <a
                href={`mailto:${t('footer.email')}`}
                className="text-ink-200 transition-colors duration-[180ms] hover:text-white"
              >
                {t('footer.email')}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-[13px] text-ink-500 to-640:mt-8">
          {t('footer.copyright', { year: 2026 })}
        </div>
      </Container>
    </footer>
  );
}
