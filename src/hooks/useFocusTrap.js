import { useEffect } from 'react';

const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

/**
 * Modal overlay üçün fokus tələsi.
 * Açılanda fokus `initialFocusRef`-ə keçir, Tab yalnız panel daxilində gəzir,
 * bağlananda fokus əvvəlki elementə (hamburger düyməsinə) qayıdır.
 */
export function useFocusTrap(active, containerRef, { initialFocusRef, restoreFocusRef } = {}) {
  useEffect(() => {
    if (!active) return undefined;

    const container = containerRef.current;
    if (!container) return undefined;

    const previouslyFocused = document.activeElement;
    // Cleanup anında ref dəyişmiş ola bilər — indi tuturuq.
    const restoreTarget = restoreFocusRef?.current ?? previouslyFocused;
    const getFocusable = () =>
      [...container.querySelectorAll(FOCUSABLE)].filter(
        (el) => el.getClientRects().length > 0,
      );

    // Panel görünən kimi fokusu içəri gətiririk.
    const focusTimer = setTimeout(() => {
      (initialFocusRef?.current ?? getFocusable()[0])?.focus();
    }, 0);

    const onKeyDown = (event) => {
      if (event.key !== 'Tab') return;
      const items = getFocusable();
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);

    return () => {
      clearTimeout(focusTimer);
      document.removeEventListener('keydown', onKeyDown);
      if (restoreTarget && typeof restoreTarget.focus === 'function') restoreTarget.focus();
    };
  }, [active, containerRef, initialFocusRef, restoreFocusRef]);
}
