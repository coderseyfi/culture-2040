import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { icons } from '@/assets/icons/icons';
import { DYN_BG, DYN_COLORS } from '@/constants/home';

/** Ana səhifədəki sənəd kateqoriyası kartı. */
export default function DocCategoryCard({ titleKey, descKey, count, icon, tone, to }) {
  const { t } = useTranslation();
  const Icon = icons[icon];

  return (
    <Link
      to={to}
      className="reveal group flex flex-col gap-4 rounded-[14px] border border-hair-9 bg-white px-6 py-[26px] text-ink transition-[transform,box-shadow,border-color] duration-[350ms] ease-card hover:-translate-y-[6px] hover:scale-[1.015] hover:shadow-card"
    >
      <span
        className={`inline-flex h-[46px] w-[46px] items-center justify-center rounded-[11px] transition-transform duration-[400ms] ease-icon group-hover:-rotate-[8deg] group-hover:scale-110 group-hover:saturate-[1.3] ${DYN_BG[tone]}`}
      >
        <Icon size={22} color={DYN_COLORS[tone]} />
      </span>
      <div className="text-[16.5px] font-semibold leading-[1.35]">{t(titleKey)}</div>
      <div className="mb-auto text-[13.5px] leading-[1.5] text-ink-600">{t(descKey)}</div>
      <div className="flex items-center justify-between pt-[6px]">
        <span className="text-[12.5px] font-semibold text-ink-500">
          {t('docCategories.count', { value: count })}
        </span>
        <span className="inline-flex items-center gap-[5px] text-[13px] font-semibold text-brand transition-transform duration-[250ms] group-hover:translate-x-[4px]">
          {t('common.view')}
          <icons.arrowRight size={13} strokeWidth={2.4} />
        </span>
      </div>
    </Link>
  );
}
