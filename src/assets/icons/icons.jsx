/**
 * Layihədəki bütün SVG ikonlar.
 * Komponentlərdə birbaşa SVG yazılmır — hər şey buradan götürülür:
 *   import { icons } from '@/assets/icons/icons';
 *
 * Hər ikon `size`, `strokeWidth`, `color` və istənilən digər SVG prop-unu qəbul edir.
 */

function Svg({ size = 24, strokeWidth = 2, color = 'currentColor', children, ...rest }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...rest}
    >
      {children}
    </svg>
  );
}

export const icons = {
  /* ---------- Naviqasiya və interfeys ---------- */
  chevronDown: (p) => (
    <Svg strokeWidth={2.4} {...p}>
      <path d="M6 9l6 6 6-6" />
    </Svg>
  ),
  chevronLeft: (p) => (
    <Svg {...p}>
      <path d="M15 6l-6 6 6 6" />
    </Svg>
  ),
  chevronRight: (p) => (
    <Svg {...p}>
      <path d="M9 6l6 6-6 6" />
    </Svg>
  ),
  arrowRight: (p) => (
    <Svg {...p}>
      <path d="M5 12h14" />
      <path d="M13 6l6 6-6 6" />
    </Svg>
  ),
  arrowLeft: (p) => (
    <Svg {...p}>
      <path d="M19 12H5" />
      <path d="M11 6l-6 6 6 6" />
    </Svg>
  ),
  arrowUpRight: (p) => (
    <Svg {...p}>
      <path d="M7 17L17 7" />
      <path d="M8 7h9v9" />
    </Svg>
  ),
  menu: (p) => (
    <Svg {...p}>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </Svg>
  ),
  /** Hamburger ⇄ X morph. Animasiya .burger qaydaları ilə (index.css). */
  menuToggle: ({ open = false, size = 20, className = '', ...rest }) => (
    <svg
      className={`burger ${className}`}
      data-open={open}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      aria-hidden="true"
      {...rest}
    >
      <line className="burger-top" x1="4" y1="7" x2="20" y2="7" />
      <line className="burger-mid" x1="4" y1="12" x2="20" y2="12" />
      <line className="burger-bot" x1="4" y1="17" x2="20" y2="17" />
    </svg>
  ),
  close: (p) => (
    <Svg strokeWidth={3} {...p}>
      <path d="M6 6l12 12M18 6L6 18" />
    </Svg>
  ),
  check: (p) => (
    <Svg strokeWidth={2.6} {...p}>
      <path d="M5 13l4 4L19 7" />
    </Svg>
  ),
  search: (p) => (
    <Svg {...p}>
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4-4" />
    </Svg>
  ),
  clock: (p) => (
    <Svg {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </Svg>
  ),
  filter: (p) => (
    <Svg {...p}>
      <path d="M3 5h18M6 12h12M10 19h4" />
    </Svg>
  ),
  calendar: (p) => (
    <Svg {...p}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </Svg>
  ),
  eye: (p) => (
    <Svg {...p}>
      <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7z" />
      <circle cx="12" cy="12" r="3" />
    </Svg>
  ),
  download: (p) => (
    <Svg {...p}>
      <path d="M12 3v12" />
      <path d="M7 10l5 5 5-5" />
      <path d="M5 21h14" />
    </Svg>
  ),
  link: (p) => (
    <Svg {...p}>
      <path d="M10 14a4 4 0 0 0 6 .5l3-3a4 4 0 0 0-6-6l-1.5 1.5" />
      <path d="M14 10a4 4 0 0 0-6-.5l-3 3a4 4 0 0 0 6 6L12.5 17" />
    </Svg>
  ),
  print: (p) => (
    <Svg {...p}>
      <path d="M6 9V3h12v6M6 18H4v-6h16v6h-2" />
      <rect x="8" y="14" width="8" height="7" />
    </Svg>
  ),
  zoomIn: (p) => (
    <Svg {...p}>
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4-4M8 11h6M11 8v6" />
    </Svg>
  ),
  zoomOut: (p) => (
    <Svg {...p}>
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4-4M8 11h6" />
    </Svg>
  ),
  maximize: (p) => (
    <Svg {...p}>
      <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
    </Svg>
  ),
  minimize: (p) => (
    <Svg {...p}>
      <path d="M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5" />
    </Svg>
  ),
  image: (p) => (
    <Svg strokeWidth={1.4} {...p}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.6" />
      <path d="M21 15l-5-5L5 21" />
    </Svg>
  ),
  fileBlank: (p) => (
    <Svg strokeWidth={1.4} {...p}>
      <path d="M4 4h11l5 5v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z" />
      <path d="M14 4v5h5" />
    </Svg>
  ),

  /* ---------- İstifadəçi / auth ---------- */
  user: (p) => (
    <Svg {...p}>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </Svg>
  ),
  userPlus: (p) => (
    <Svg {...p}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M19 8v6M22 11h-6" />
    </Svg>
  ),
  mail: (p) => (
    <Svg strokeWidth={1.8} {...p}>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 8l9 5 9-5" />
    </Svg>
  ),

  /* ---------- Mərhələ ikonları ---------- */
  milestoneStart: (p) => (
    <Svg strokeWidth={1.6} {...p}>
      <path d="M12 2v6" />
      <path d="M5 8l7-6 7 6" />
      <rect x="6" y="10" width="12" height="11" rx="1.5" />
    </Svg>
  ),
  bolt: (p) => (
    <Svg strokeWidth={1.6} {...p}>
      <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z" />
    </Svg>
  ),
  checkCircle: (p) => (
    <Svg strokeWidth={1.6} {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M9 12l2 2 4-4" />
    </Svg>
  ),

  /* ---------- Fəaliyyət istiqamətləri ---------- */
  chart: (p) => (
    <Svg strokeWidth={1.6} {...p}>
      <path d="M3 3v18h18" />
      <path d="M7 14l3-3 3 3 5-6" />
    </Svg>
  ),
  language: (p) => (
    <Svg strokeWidth={1.6} {...p}>
      <path d="M4 5h16" />
      <path d="M9 3v2c0 6-3 10-6 12" />
      <path d="M6 11c3 3 7 3 10 0" />
      <path d="M14 21l4-9 4 9" />
      <path d="M15.5 18h5" />
    </Svg>
  ),
  personCircle: (p) => (
    <Svg strokeWidth={1.6} {...p}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
    </Svg>
  ),
  books: (p) => (
    <Svg strokeWidth={1.6} {...p}>
      <path d="M4 19V6a2 2 0 0 1 2-2h6v16H6a2 2 0 0 0-2-2z" />
      <path d="M20 19V6a2 2 0 0 0-2-2h-6v16h6a2 2 0 0 1 2-2z" />
    </Svg>
  ),
  palette: (p) => (
    <Svg strokeWidth={1.6} {...p}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="8.5" cy="9" r="1.2" />
      <circle cx="15.5" cy="9" r="1.2" />
      <circle cx="16" cy="14" r="1.2" />
      <path d="M12 21c1.5 0 2-1 1-2s-1-2 1-2c3 0 3-2 3-3" />
    </Svg>
  ),
  shield: (p) => (
    <Svg strokeWidth={1.6} {...p}>
      <path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7z" />
      <path d="M9 12l2 2 4-4" />
    </Svg>
  ),
  star: (p) => (
    <Svg strokeWidth={1.6} {...p}>
      <path d="M12 2l2.4 4.9 5.4.8-3.9 3.8.9 5.4-4.8-2.5-4.8 2.5.9-5.4L3.2 7.7l5.4-.8z" />
    </Svg>
  ),
  globe: (p) => (
    <Svg strokeWidth={1.6} {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" />
    </Svg>
  ),

  /* ---------- Sənəd kateqoriyaları ---------- */
  fileCheck: (p) => (
    <Svg strokeWidth={1.6} {...p}>
      <path d="M6 2h9l5 5v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z" />
      <path d="M14 2v6h6" />
      <path d="M9 15l2 2 4-4" />
    </Svg>
  ),
  building: (p) => (
    <Svg strokeWidth={1.6} {...p}>
      <path d="M3 21h18" />
      <path d="M5 21V8l7-4 7 4v13" />
      <path d="M9 21v-5h6v5" />
    </Svg>
  ),
  users: (p) => (
    <Svg strokeWidth={1.6} {...p}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    </Svg>
  ),
  chartUp: (p) => (
    <Svg strokeWidth={1.6} {...p}>
      <path d="M3 3v18h18" />
      <path d="M7 15l3-4 3 3 5-7" />
    </Svg>
  ),

  /* ---------- Fayl formatı ikonları ---------- */
  filePdf: (p) => (
    <Svg strokeWidth={1.7} {...p}>
      <path d="M6 2h9l5 5v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z" />
      <path d="M14 2v6h6" />
      <path d="M8 16h2.2a1.3 1.3 0 0 0 0-2.6H8V18" />
    </Svg>
  ),
  fileDocx: (p) => (
    <Svg strokeWidth={1.7} {...p}>
      <path d="M6 2h9l5 5v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z" />
      <path d="M14 2v6h6" />
      <path d="M8 13l1.4 5 1.6-3.4 1.6 3.4L14 13" />
    </Svg>
  ),
  fileXlsx: (p) => (
    <Svg strokeWidth={1.7} {...p}>
      <path d="M6 2h9l5 5v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z" />
      <path d="M14 2v6h6" />
      <path d="M8.5 13l4 5m0-5l-4 5" />
    </Svg>
  ),

  /* ---------- Dekorativ fon qrafikaları ---------- */
  heroRings: (p) => (
    <svg viewBox="0 0 200 200" fill="none" stroke="#0E6E6E" strokeWidth="0.4" opacity="0.5" {...p}>
      <g strokeOpacity="0.35">
        <circle cx="140" cy="70" r="70" />
        <circle cx="140" cy="70" r="52" />
        <circle cx="140" cy="70" r="34" />
        <path d="M20 160 L180 30 M40 190 L200 60" />
      </g>
    </svg>
  ),
  pageRings: (p) => (
    <svg viewBox="0 0 200 200" fill="none" stroke="#0E6E6E" strokeWidth="0.4" {...p}>
      <g strokeOpacity="0.3">
        <circle cx="140" cy="70" r="70" />
        <circle cx="140" cy="70" r="52" />
        <circle cx="140" cy="70" r="34" />
      </g>
    </svg>
  ),
  ctaRings: (p) => (
    <svg viewBox="0 0 200 200" fill="none" stroke="#fff" strokeWidth="0.5" {...p}>
      <circle cx="120" cy="80" r="80" />
      <circle cx="120" cy="80" r="58" />
      <circle cx="120" cy="80" r="36" />
    </svg>
  ),
};
