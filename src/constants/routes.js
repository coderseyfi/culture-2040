/** Bütün route path-ları tək mənbədən idarə olunur. */
export const ROUTES = {
  HOME: '/',
  KONSEPSIYA: '/konsepsiya',
  IRS: '/istiqametler/medeni-irsin-qorunmasi',
  SENEDLER: '/senedler',
  XEBERLER: '/xeberler',
  XEBER_DETAIL: '/xeberler/:slug',
  LOGIN: '/giris',
  REGISTER: '/qeydiyyat',
};

/** Xəbər detalı üçün path qurucusu (API `slug`-ı ilə). */
export const newsPath = (slug) => `${ROUTES.XEBERLER}/${slug}`;
