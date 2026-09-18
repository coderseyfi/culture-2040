import { useEffect, useRef, useState } from 'react';

const DURATION = 1400;

/**
 * Element ekrana girəndə illəri 2000-dən hədəf dəyərə qədər sayır.
 * Orijinaldakı kimi cubic ease-out və 1400 ms.
 *
 * @param {number[]} targets — məs. [2025, 2030, 2040]
 * @returns {[React.RefObject, number[], boolean]} ref, cari dəyərlər, animasiya başlayıbmı
 */
export function useCountUpYears(targets) {
  const ref = useRef(null);
  const [values, setValues] = useState(targets);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    let frame;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        setStarted(true);

        const start = performance.now();
        const step = (now) => {
          const progress = Math.min(1, (now - start) / DURATION);
          const eased = 1 - (1 - progress) ** 3;
          setValues(targets.map((target) => Math.round(2000 + eased * (target - 2000))));
          if (progress < 1) frame = requestAnimationFrame(step);
        };
        frame = requestAnimationFrame(step);
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [ref, values, started];
}
