import { ROUTES } from '@/constants/routes';

/**
 * Naviqasiyada aktiv elementin müəyyən edilməsi.
 *
 * Diqqət: menyudakı valideyn elementlərin çoxu hələ qurulmamış bölmələrdir və
 * `ROUTES.HOME`-a baxır. Sadə `pathname === to` müqayisəsi ana səhifədə beş
 * elementi birdən aktiv göstərərdi — ona görə HOME placeholder-ləri uyğunluq
 * hesablanarkən nəzərə alınmır.
 */
function matchesPath(to, pathname) {
  if (!to || to === ROUTES.HOME) return false;
  return pathname === to || pathname.startsWith(`${to}/`);
}

/** Linkin özü cari route-a uyğundur? */
export function isLinkActive(link, pathname) {
  return matchesPath(link?.to, pathname);
}

/** Valideyn: özü və ya hər hansı alt elementi uyğundursa aktivdir. */
export function isBranchActive(link, pathname) {
  if (matchesPath(link?.to, pathname)) return true;
  return (link?.children ?? []).some((child) => matchesPath(child.to, pathname));
}
