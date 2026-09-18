import { Link } from 'react-router-dom';

/**
 * Səhifə başlığının üstündəki naviqasiya zolağı.
 * @param {{label:string, to?:string}[]} items — sonuncu element aktiv sayılır.
 */
export default function Breadcrumbs({ items, tone = 'muted' }) {
  const linkColor = tone === 'muted' ? 'text-ink-500' : 'text-ink-600';

  return (
    <nav className="border-b border-hair-8 bg-white">
      <div className={`mx-auto flex max-w-container flex-wrap items-center gap-[9px] px-4 py-4 text-[13.5px] to-320:px-3 ${linkColor}`}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <span key={item.label} className="flex min-w-0 items-center gap-[9px]">
              {isLast ? (
                <span className="min-w-0 break-words font-medium text-ink">{item.label}</span>
              ) : (
                <Link
                  to={item.to ?? '#'}
                  className={`${linkColor} transition-colors duration-[180ms] hover:text-brand`}
                >
                  {item.label}
                </Link>
              )}
              {!isLast && <span className="text-ink-200">/</span>}
            </span>
          );
        })}
      </div>
    </nav>
  );
}
