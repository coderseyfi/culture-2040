import { Link } from 'react-router-dom';
import { icons } from '@/assets/icons/icons';

/**
 * «Bütün xəbərlər →» tipli keçid.
 * Hover-də ox 4px sağa sürüşür (orijinal `.dyn-link:hover .dyn-arrow`).
 */
export default function ArrowLink({ to, href = '#', size = 15, className = '', children }) {
  const content = (
    <>
      {children}
      <icons.arrowRight
        size={size}
        className="transition-transform duration-[250ms] group-hover:translate-x-[4px]"
      />
    </>
  );

  const classes = `group inline-flex items-center gap-[7px] text-[14.5px] font-semibold text-brand transition-colors duration-[180ms] hover:text-brand-dark ${className}`;

  return to ? (
    <Link to={to} className={classes}>
      {content}
    </Link>
  ) : (
    <a href={href} className={classes}>
      {content}
    </a>
  );
}
