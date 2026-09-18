import { useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ITEM_CLASS =
  'block whitespace-nowrap rounded-[8px] px-3 py-[9px] text-[14px] font-medium text-ink-700 transition-colors duration-[180ms] hover:bg-surface-soft hover:text-brand';

/**
 * Header-in açılan alt menyusu.
 *
 * Mövqe: parent <li> `relative`, menyu isə `top-full left-0` — yəni
 * parentin düz altından başlayır. Aralarında boşluq yoxdur, ona görə
 * siçan aşağı keçəndə menyu bağlanmır. <ul>-un default padding/margin-i
 * sıfırlanıb. Ekranın sağ kənarından çıxarsa, sağa hizalanır.
 */
export default function NavDropdown({ items, onNavigate }) {
  const { t } = useTranslation();
  const ref = useRef(null);
  const [alignRight, setAlignRight] = useState(false);

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;

    const { right } = element.getBoundingClientRect();
    if (right > window.innerWidth - 8) setAlignRight(true);
  }, []);

  return (
    <ul
      ref={ref}
      className={`absolute top-full z-[60] m-0 w-max min-w-[max(250px,100%)] animate-drop-in list-none rounded-[12px] border border-hair-10 bg-white p-2 shadow-dropdown ${
        alignRight ? 'right-0' : 'left-0'
      }`}
    >
      {items.map((item) => (
        <li key={item.labelKey} className="m-0 list-none p-0">
          {item.to ? (
            <Link to={item.to} className={ITEM_CLASS} onClick={onNavigate}>
              {t(item.labelKey)}
            </Link>
          ) : (
            <a href="#" className={ITEM_CLASS} onClick={(event) => event.preventDefault()}>
              {t(item.labelKey)}
            </a>
          )}
        </li>
      ))}
    </ul>
  );
}
