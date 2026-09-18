import { useEffect } from 'react';

/**
 * Overlay açıq ikən arxa səhifənin sürüşməsini dayandırır.
 * iOS Safari `overflow: hidden`-ə məhəl qoymur, ona görə body `position: fixed`
 * edilir və scroll mövqeyi saxlanılıb bağlananda bərpa olunur.
 */
export function useBodyScrollLock(locked) {
  useEffect(() => {
    if (!locked) return undefined;

    const { body } = document;
    const scrollY = window.scrollY;
    const previous = {
      overflow: body.style.overflow,
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
    };

    body.style.overflow = 'hidden';
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.width = '100%';

    return () => {
      body.style.overflow = previous.overflow;
      body.style.position = previous.position;
      body.style.top = previous.top;
      body.style.width = previous.width;
      window.scrollTo(0, scrollY);
    };
  }, [locked]);
}
