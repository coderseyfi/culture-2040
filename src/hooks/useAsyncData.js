import { useCallback, useEffect, useState } from 'react';

/**
 * Service çağırışlarını yükləmə/xəta vəziyyəti ilə birlikdə idarə edir.
 * `deps`-ə aktiv dil də daxil edilir — dil dəyişəndə data yenidən sorğulanır.
 *
 * @param {() => Promise<any>} loader
 * @param {any[]} deps
 * @param {any} initial
 */
export function useAsyncData(loader, deps = [], initial = null) {
  const [data, setData] = useState(initial);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [attempt, setAttempt] = useState(0);

  const refetch = useCallback(() => setAttempt((value) => value + 1), []);

  useEffect(() => {
    let active = true;
    // Data fetching üçün standart pattern: deps dəyişəndə yükləmə vəziyyəti
    // effekt daxilində qurulur. Qayda bunu xəbərdarlıq kimi göstərir.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);
    setError(null);

    loader()
      .then((result) => {
        if (active) setData(result);
      })
      .catch((err) => {
        if (active) {
          setError(err);
          setData(initial);
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, attempt]);

  return { data, loading, error, refetch };
}
