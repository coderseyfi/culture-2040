import { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { icons } from '@/assets/icons/icons';
import { images } from '@/assets/images/images';
import { NAV_LINKS } from '@/constants/navigation';
import { ROUTES } from '@/constants/routes';
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import { isBranchActive, isLinkActive } from '@/utils/nav';

const DESKTOP_QUERY = '(min-width: 1181px)';

/** Stagger 8 addımdan sonra dayanır ki, son elementlər gec görünməsin. */
const MAX_STAGGER = 7;

const PARENT_BASE =
  'flex min-h-[48px] items-center rounded-[8px] border-l-[3px] px-3 text-[17px] transition-colors duration-[180ms]';
const CHILD_BASE =
  'flex min-h-[48px] items-center rounded-[8px] border-l-[3px] py-1 pl-5 pr-3 text-[15px] transition-colors duration-[180ms]';

export default function MobileMenu({ open, onClose, triggerRef }) {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const panelRef = useRef(null);
  const closeRef = useRef(null);
  const closeFn = useRef(onClose);

  // Effektlərin köhnə closure-a ilişməməsi üçün həmişə son onClose saxlanılır.
  useEffect(() => {
    closeFn.current = onClose;
  });

  // Bağlı panelin linkləri Tab ilə fokuslanmamalıdır. `visibility: hidden`
  // gecikməli keçidlə gəldiyi üçün etibarlı deyil — `inert` dərhal tətbiq olunur
  // və slide-out animasiyasına mane olmur.
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    if (open) panel.removeAttribute('inert');
    else panel.setAttribute('inert', '');
  }, [open]);

  useBodyScrollLock(open);
  useFocusTrap(open, panelRef, { initialFocusRef: closeRef, restoreFocusRef: triggerRef });

  // Escape ilə bağlanma
  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') closeFn.current();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  // Desktop breakpoint-i keçiləndə avtomatik bağlanma
  useEffect(() => {
    const query = window.matchMedia(DESKTOP_QUERY);
    const onChange = (event) => {
      if (event.matches) closeFn.current();
    };
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  // Route dəyişəndə (brauzerin geri düyməsi daxil) bağlanır
  useEffect(() => {
    closeFn.current();
  }, [pathname]);

  return (
    <div
      ref={panelRef}
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label={t('common.mainMenu')}
      data-open={open}
      className="mm-panel fixed inset-0 z-[200] flex w-full flex-col bg-[rgba(10,82,82,0.98)] backdrop-blur-[12px] pb-[max(24px,env(safe-area-inset-bottom))] pl-[max(16px,env(safe-area-inset-left))] pr-[max(16px,env(safe-area-inset-right))] pt-[max(20px,env(safe-area-inset-top))] hd:hidden"
    >
      <div className="flex flex-none items-center justify-between gap-3 pb-4">
        <Link
          to={ROUTES.HOME}
          onClick={onClose}
          className="flex min-w-0 items-center gap-[11px] text-white"
        >
          <img
            src={images.coatOfArms}
            alt={t('site.coatOfArms')}
            className="block h-[40px] w-[36px] flex-none object-contain"
          />
          <span className="flex min-w-0 flex-col leading-[1.25]">
            <span className="truncate text-[10.5px] font-semibold tracking-[0.04em] text-white/75">
              {t('site.republic')}
            </span>
            <span className="truncate text-[10.5px] font-semibold tracking-[0.04em] text-white/75">
              {t('site.ministry')}
            </span>
          </span>
        </Link>

        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label={t('common.closeMenu')}
          className="inline-flex h-11 w-11 flex-none cursor-pointer items-center justify-center rounded-[10px] border border-white/25 bg-transparent text-white transition-[transform,opacity] duration-200 hover:rotate-90 hover:opacity-80 focus-visible:rotate-90"
        >
          <icons.close size={20} strokeWidth={2} />
        </button>
      </div>

      <nav className="-mx-1 flex-1 overflow-y-auto overscroll-contain px-1 pb-2">
        <ul className="m-0 list-none p-0">
          {NAV_LINKS.map((link, index) => {
            const branchActive = isBranchActive(link, pathname);
            const selfActive = isLinkActive(link, pathname);

            return (
              <li
                key={link.labelKey}
                className="mm-item m-0 list-none border-b border-white/10 py-2 last:border-b-0"
                style={{ '--i': Math.min(index, MAX_STAGGER) }}
              >
                <Link
                  to={link.to}
                  onClick={onClose}
                  aria-current={selfActive ? 'page' : undefined}
                  className={`${PARENT_BASE} ${
                    branchActive
                      ? 'border-white bg-white/10 font-bold text-white'
                      : 'border-transparent font-semibold text-white/90 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {t(link.labelKey)}
                </Link>

                {link.children.length > 0 && (
                  <ul className="m-0 mt-1 list-none p-0">
                    {link.children.map((child) => {
                      const childActive = isLinkActive(child, pathname);
                      const classes = `${CHILD_BASE} ${
                        childActive
                          ? 'border-white bg-white/10 font-semibold text-white'
                          : 'border-transparent font-medium text-white/70 hover:bg-white/5 hover:text-white'
                      }`;

                      return (
                        <li key={child.labelKey} className="m-0 list-none p-0">
                          {child.to ? (
                            <Link
                              to={child.to}
                              onClick={onClose}
                              aria-current={childActive ? 'page' : undefined}
                              className={classes}
                            >
                              {t(child.labelKey)}
                            </Link>
                          ) : (
                            <a
                              href="#"
                              onClick={(event) => {
                                event.preventDefault();
                                onClose();
                              }}
                              className={classes}
                            >
                              {t(child.labelKey)}
                            </a>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
