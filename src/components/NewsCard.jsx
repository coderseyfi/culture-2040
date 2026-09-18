import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { icons } from '@/assets/icons/icons';
import ImageSlot from '@/components/ImageSlot';
import { newsPath } from '@/constants/routes';

const MEDIA_ZOOM = 'transition-transform duration-500 ease-linear group-hover:scale-[1.06]';

function ReadMore({ label }) {
  return (
    <span className="mt-auto inline-flex items-center gap-[6px] text-[13.5px] font-semibold text-brand">
      {label}
      <icons.arrowRight
        size={14}
        strokeWidth={2.2}
        className="transition-transform duration-[250ms] group-hover:translate-x-[4px]"
      />
    </span>
  );
}

/**
 * Xəbər kartı. Data `/news` endpoint-indən gəlir; tarix etiketi (`dateLabel`)
 * və kateqoriya adı serverdə aktiv dilə görə hazırlanır.
 *
 * variant: 'home' (ana səhifə) | 'list' (xəbərlər siyahısı) | 'compact' (digər xəbərlər)
 */
export default function NewsCard({ news, variant = 'home' }) {
  const { t } = useTranslation();
  const to = newsPath(news.slug);

  if (variant === 'list') {
    return (
      <Link
        to={to}
        className="reveal group flex flex-col overflow-hidden rounded-[14px] border border-hair-9 bg-white text-ink"
      >
        <div className="aspect-[16/10] overflow-hidden border-b border-hair-6">
          <ImageSlot src={news.image} alt={news.imageAlt} className={MEDIA_ZOOM} />
        </div>
        <div className="flex flex-1 flex-col px-[22px] pb-6 pt-[22px]">
          <div className="mb-[11px] flex flex-wrap items-center gap-[10px]">
            {news.category && (
              <span
                className="rounded-full px-[10px] py-[4px] text-[11.5px] font-bold tracking-[0.05em]"
                style={{
                  color: news.category.color ?? undefined,
                  background: `${news.category.color ?? '#0E6E6E'}14`,
                }}
              >
                {news.category.label}
              </span>
            )}
            <time dateTime={news.date ?? undefined} className="text-[13px] font-semibold text-ink-600">
              {news.dateLabel}
            </time>
          </div>
          <div className="mb-[10px] text-[18px] font-semibold leading-[1.35]">{news.title}</div>
          <p className="m-0 mb-4 text-[14px] leading-[1.6] text-ink-600">{news.lead}</p>
          <ReadMore label={t('common.read')} />
        </div>
      </Link>
    );
  }

  if (variant === 'compact') {
    return (
      <Link to={to} className="group flex flex-col text-ink">
        <div className="mb-4 aspect-[16/10] overflow-hidden rounded-[12px] border border-hair-8">
          <ImageSlot src={news.image} alt={news.imageAlt} className={MEDIA_ZOOM} />
        </div>
        <time
          dateTime={news.date ?? undefined}
          className="mb-[9px] text-[13px] font-semibold text-ink-600"
        >
          {news.dateLabel}
        </time>
        <div className="text-[18px] font-semibold leading-[1.35]">{news.title}</div>
      </Link>
    );
  }

  return (
    <Link to={to} className="reveal group flex flex-col text-ink">
      <div className="relative mb-[18px] aspect-[16/10] overflow-hidden rounded-[12px]">
        <ImageSlot src={news.image} alt={news.imageAlt} className={MEDIA_ZOOM} />
      </div>
      <time
        dateTime={news.date ?? undefined}
        className="mb-[9px] block text-[13px] font-semibold tracking-[0.02em] text-ink-500"
      >
        {news.dateLabel}
      </time>
      <div className="mb-[14px] text-[18px] font-semibold leading-[1.35]">{news.title}</div>
      <ReadMore label={t('common.read')} />
    </Link>
  );
}
