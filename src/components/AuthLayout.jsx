import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ROUTES } from '@/constants/routes';

/** Giriş və qeydiyyat səhifələrinin ortaq kart çərçivəsi. */
export default function AuthLayout({
  icon,
  title,
  subtitle,
  subtitleTone = 'text-ink-600',
  backTone = 'text-ink-600',
  maxWidth = 'max-w-[420px]',
  children,
}) {
  const { t } = useTranslation();

  return (
    <section className="flex min-h-[calc(100vh-68px)] items-center justify-center bg-surface-soft px-4 py-12 to-480:py-8 to-320:px-3">
      <div className={`w-full ${maxWidth}`}>
        <div className="rounded-[16px] border border-hair-9 bg-white px-9 py-10 shadow-auth to-480:px-5 to-480:py-8 to-320:px-4">
          <div className="mb-7 flex flex-col items-center text-center">
            <span className="mb-4 inline-flex h-[52px] w-[52px] items-center justify-center rounded-[13px] bg-ink-black">
              {icon}
            </span>
            <h1 className="m-0 mb-[6px] text-[24px] font-semibold tracking-[-0.01em] text-ink">
              {title}
            </h1>
            <p className={`m-0 text-[14.5px] leading-[1.5] ${subtitleTone}`}>{subtitle}</p>
          </div>
          {children}
        </div>

        <p className="m-0 mt-[22px] text-center">
          <Link
            to={ROUTES.HOME}
            className={`text-[14px] font-medium ${backTone} transition-colors duration-[180ms] hover:text-brand`}
          >
            ← {t('common.backHome')}
          </Link>
        </p>
      </div>
    </section>
  );
}
