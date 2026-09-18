import { useEffect, useRef } from 'react';

const HEADER_HEIGHT = 68;

/**
 * Filtr panelinin hündürlüyünü ölçüb `--doc-th-top` CSS dəyişənini yeniləyir —
 * cədvəl başlığı sticky qalanda düzgün offset alsın deyə.
 */
export function useStickyHeaderOffset() {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const sync = () => {
      const top = Math.round(HEADER_HEIGHT + node.getBoundingClientRect().height);
      document.documentElement.style.setProperty('--doc-th-top', `${top}px`);
    };

    sync();
    const observer = new ResizeObserver(sync);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return ref;
}
