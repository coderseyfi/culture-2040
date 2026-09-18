import { Link } from 'react-router-dom';

const VARIANTS = {
  /** Qara düymə — #161616 */
  dark: 'bg-ink-black text-white hover:bg-black',
  /** Hero-nun animasiyalı qradient düyməsi */
  gradient:
    'text-white bg-[linear-gradient(120deg,#161616,#0E6E6E,#161616)] bg-[length:220%_220%] animate-btn-bg',
  /** Ağ fon + nazik çərçivə */
  outline:
    'bg-white text-ink border border-hair-16 hover:border-brand hover:text-brand',
  /** Ağ fon + bir az daha tünd çərçivə */
  outlineStrong:
    'bg-white text-ink-700 border border-hair-18 hover:border-brand hover:text-brand',
  /** Brend rəngli düymə */
  brand: 'bg-brand text-white hover:bg-brand-dark',
  /** Tünd fonun üzərində ağ düymə (CTA zolağı) */
  white: 'bg-white text-brand hover:bg-surface-soft hover:text-brand-dark',
};

const SIZES = {
  xs: 'text-[14px] font-semibold px-[18px] py-[10px] rounded-[9px] gap-[7px]',
  sm: 'text-[14px] font-semibold px-[18px] py-[11px] rounded-[9px] gap-[8px]',
  md: 'text-[15px] font-semibold px-[24px] py-[13px] rounded-[10px] gap-[8px]',
  lg: 'text-[15px] font-semibold px-[26px] py-[14px] rounded-[10px] gap-[9px]',
  xl: 'text-[16px] font-bold px-[30px] py-[16px] rounded-[11px] gap-[9px]',
  block:
    'w-full justify-center text-[15px] font-semibold py-[14px] rounded-[10px] gap-[9px]',
  blockSm:
    'w-full justify-center text-[15px] font-semibold py-[13px] rounded-[10px] gap-[9px]',
};

/**
 * Universal düymə/keçid.
 * `to` → react-router Link, `href` → <a>, əks halda <button>.
 */
export default function Button({
  variant = 'dark',
  size = 'md',
  to,
  href,
  className = '',
  children,
  ...rest
}) {
  const classes = [
    'inline-flex items-center cursor-pointer transition-colors duration-[180ms]',
    VARIANTS[variant],
    SIZES[size],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  if (href !== undefined) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  );
}
