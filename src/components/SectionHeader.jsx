import ArrowLink from '@/components/ArrowLink';
import Eyebrow from '@/components/Eyebrow';

/**
 * Bölmə başlığı.
 * `link` verilibsə başlıq və keçid iki tərəfə dağılır, əks halda sola yığılır.
 */
export default function SectionHeader({
  eyebrow,
  title,
  titleClass = 'text-[34px]',
  link,
  reveal = false,
  className = '',
}) {
  const heading = (
    <div>
      <Eyebrow className="mb-3">{eyebrow}</Eyebrow>
      <h2
        className={`m-0 font-light leading-[1.15] tracking-[-0.02em] text-ink ${titleClass} to-900:!text-[28px] to-540:!text-[24px] to-360:!text-[21px]`}
      >
        {title}
      </h2>
    </div>
  );

  if (!link) {
    return (
      <div className={`max-w-[640px] ${reveal ? 'reveal' : ''} ${className}`}>
        {heading}
      </div>
    );
  }

  return (
    <div
      className={`flex flex-wrap items-end justify-between gap-4 ${reveal ? 'reveal' : ''} ${className}`}
    >
      {heading}
      <ArrowLink to={link.to}>{link.label}</ArrowLink>
    </div>
  );
}
