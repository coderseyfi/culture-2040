import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** Route dəyişəndə səhifəni yuxarı qaytarır (orijinaldakı setView davranışı). */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) return;
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}
