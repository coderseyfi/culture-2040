import { ROUTES } from '@/constants/routes';

/**
 * Header naviqasiyası. `to` verilmiş elementlər real route-a gedir,
 * `to: null` olanlar orijinal dizayndakı kimi hələ bağlanmamış keçidlərdir.
 * Bütün adlar tərcümə açarıdır (`nav.*`).
 */
export const NAV_LINKS = [
  {
    labelKey: 'nav.concept',
    to: ROUTES.HOME,
    children: [
      { labelKey: 'nav.conceptAbout', to: ROUTES.KONSEPSIYA },
      { labelKey: 'nav.vision', to: null },
      { labelKey: 'nav.actionPlan', to: null },
    ],
  },
  {
    labelKey: 'nav.directions',
    to: ROUTES.HOME,
    children: [
      { labelKey: 'directions.governance', to: null },
      { labelKey: 'directions.language', to: null },
      { labelKey: 'directions.behaviour', to: null },
      { labelKey: 'directions.literature', to: null },
      { labelKey: 'directions.arts', to: null },
      { labelKey: 'directions.heritage', to: ROUTES.IRS },
      { labelKey: 'directions.creative', to: null },
      { labelKey: 'directions.diplomacy', to: null },
    ],
  },
  {
    labelKey: 'nav.programs',
    to: ROUTES.HOME,
    children: [
      { labelKey: 'nav.progDigital', to: null },
      { labelKey: 'nav.progRegional', to: null },
      { labelKey: 'nav.progCreative', to: null },
      { labelKey: 'nav.progLibrary', to: null },
      { labelKey: 'nav.progDiplomacy', to: null },
      { labelKey: 'nav.progStaff', to: null },
    ],
  },
  {
    labelKey: 'nav.documents',
    to: ROUTES.SENEDLER,
    children: [
      { labelKey: 'nav.docPresidential', to: ROUTES.SENEDLER },
      { labelKey: 'nav.docCabinet', to: ROUTES.SENEDLER },
      { labelKey: 'nav.docReports', to: ROUTES.SENEDLER },
    ],
  },
  {
    labelKey: 'nav.media',
    to: ROUTES.HOME,
    children: [
      { labelKey: 'nav.news', to: ROUTES.XEBERLER },
      { labelKey: 'nav.photo', to: null },
      { labelKey: 'nav.video', to: null },
      { labelKey: 'nav.announcements', to: null },
    ],
  },
  {
    labelKey: 'nav.research',
    to: ROUTES.HOME,
    children: [
      { labelKey: 'nav.resScience', to: null },
      { labelKey: 'nav.resAnalytics', to: null },
      { labelKey: 'nav.resMethodical', to: null },
      { labelKey: 'nav.resAll', to: null },
    ],
  },
];

export const FOOTER_NAV = [
  { labelKey: 'nav.concept', to: ROUTES.HOME, hash: '#top' },
  { labelKey: 'nav.directions', to: ROUTES.HOME, hash: '#istiqametler' },
  { labelKey: 'nav.programs', to: null },
  { labelKey: 'nav.media', to: null },
  { labelKey: 'nav.research', to: null },
];

export const FOOTER_DOCS = ['nav.docPresidential', 'nav.docCabinet', 'nav.docReports'];
