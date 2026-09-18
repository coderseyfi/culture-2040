import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { icons } from '@/assets/icons/icons';
import { DYN_BG, DYN_COLORS } from '@/constants/home';

/** Ana səhifədəki «Fəaliyyət istiqamətləri» kartı. */
export default function DirectionCard({ titleKey, icon, tone, to }) {
  const { t } = useTranslation();
  const Icon = icons[icon];

  const content = (
    <>
      <span
        className={`mb-5 inline-flex h-[44px] w-[44px] items-center justify-center rounded-[10px] transition-transform duration-[400ms] ease-icon group-hover:-rotate-[8deg] group-hover:scale-110 group-hover:saturate-[1.3] ${DYN_BG[tone]}`}
      >
        <Icon size={22} color={DYN_COLORS[tone]} />
      </span>
      <div className="mb-auto text-[16px] font-semibold leading-[1.35]">{t(titleKey)}</div>
      <span className="mt-[18px] inline-flex items-center gap-[6px] text-[13.5px] font-semibold text-brand">
        {t('common.readMore')}
        <icons.arrowRight
          size={14}
          strokeWidth={2.2}
          className="transition-transform duration-[250ms] group-hover:translate-x-[4px]"
        />
      </span>
    </>
  );

  const classes =
    'reveal group flex min-h-[196px] flex-col rounded-[12px] border border-hair-9 bg-white px-4 py-[26px] text-ink transition-[transform,box-shadow,border-color] duration-[350ms] ease-card hover:-translate-y-[6px] hover:scale-[1.015] hover:shadow-card';

  return to ? (
    <Link to={to} className={classes}>
      {content}
    </Link>
  ) : (
    <a href="#" className={classes} onClick={(event) => event.preventDefault()}>
      {content}
    </a>
  );
}
