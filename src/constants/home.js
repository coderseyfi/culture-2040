import { ROUTES } from '@/constants/routes';

/** dyn-palitrası — orijinal DYN_COLORS massivi. */
export const DYN_COLORS = [
  '#0E6E6E',
  '#146C94',
  '#1F7A5C',
  '#12607F',
  '#1F6E5C',
  '#2A8560',
  '#136B7D',
  '#1A7A8F',
];

/** dyn-bg-0 … dyn-bg-7 fonlarının Tailwind qarşılığı. */
export const DYN_BG = [
  'bg-[oklch(93%_0.035_175)]',
  'bg-[oklch(93%_0.035_195)]',
  'bg-[oklch(93%_0.035_155)]',
  'bg-[oklch(93%_0.035_210)]',
  'bg-[oklch(93%_0.035_165)]',
  'bg-[oklch(93%_0.035_145)]',
  'bg-[oklch(93%_0.035_185)]',
  'bg-[oklch(93%_0.035_200)]',
];

/** Görünən mətnlər tərcümə açarları ilə verilir (`@/locales/*.json`). */
export const MILESTONES = [
  {
    year: 2025,
    phaseKey: 'milestones.initialPhase',
    labelKey: 'milestones.initialLabel',
    color: '#0E6E6E',
    tint: 'rgba(14,110,110,0.1)',
    icon: 'milestoneStart',
  },
  {
    year: 2030,
    phaseKey: 'milestones.middlePhase',
    labelKey: 'milestones.middleLabel',
    color: '#146C94',
    tint: 'rgba(20,108,148,0.1)',
    icon: 'bolt',
  },
  {
    year: 2040,
    phaseKey: 'milestones.finalPhase',
    labelKey: 'milestones.finalLabel',
    color: '#1F7A5C',
    tint: 'rgba(31,122,92,0.1)',
    icon: 'checkCircle',
  },
];

export const DIRECTIONS = [
  { titleKey: 'directions.governance', icon: 'chart', tone: 0, to: null },
  { titleKey: 'directions.language', icon: 'language', tone: 1, to: null },
  { titleKey: 'directions.behaviour', icon: 'personCircle', tone: 2, to: null },
  { titleKey: 'directions.literature', icon: 'books', tone: 3, to: null },
  { titleKey: 'directions.arts', icon: 'palette', tone: 4, to: null },
  { titleKey: 'directions.heritage', icon: 'shield', tone: 5, to: ROUTES.IRS },
  { titleKey: 'directions.creative', icon: 'star', tone: 6, to: null },
  { titleKey: 'directions.diplomacy', icon: 'globe', tone: 7, to: null },
];

export const PUBLICATIONS = [
  { tagKey: 'publicationTags.analytic', titleKey: 'publications.strategy', slotId: 'pub-1' },
  { tagKey: 'publicationTags.science', titleKey: 'publications.language', slotId: 'pub-2' },
  { tagKey: 'publicationTags.methodical', titleKey: 'publications.heritage', slotId: 'pub-3' },
  { tagKey: 'publicationTags.analytic', titleKey: 'publications.creative', slotId: 'pub-4' },
];

export const DOC_CATEGORIES = [
  {
    titleKey: 'docCategories.presidentialTitle',
    descKey: 'docCategories.presidentialDesc',
    count: 2,
    tone: 0,
    icon: 'fileCheck',
  },
  {
    titleKey: 'docCategories.cabinetTitle',
    descKey: 'docCategories.cabinetDesc',
    count: 3,
    tone: 1,
    icon: 'building',
  },
  {
    titleKey: 'docCategories.workingGroupsTitle',
    descKey: 'docCategories.workingGroupsDesc',
    count: 2,
    tone: 2,
    icon: 'users',
  },
  {
    titleKey: 'docCategories.reportsTitle',
    descKey: 'docCategories.reportsDesc',
    count: 4,
    tone: 3,
    icon: 'chartUp',
  },
];
