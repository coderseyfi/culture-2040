import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { icons } from '@/assets/icons/icons';
import { images } from '@/assets/images/images';

/**
 * Şəkil sahəsi.
 * `src` — API-dən gələn URL, `slotId` — `images.js`-dəki lokal şəkil.
 * Şəkil yoxdursa və ya yüklənməzsə, dizayndakı boz placeholder göstərilir.
 */
export default function ImageSlot({ src, slotId, alt = '', className = '' }) {
  const { t } = useTranslation();
  const [failed, setFailed] = useState(false);

  const resolved = src ?? (slotId ? images[slotId] : null);

  if (!resolved || failed) {
    return (
      <div
        className={`flex h-full w-full items-center justify-center bg-surface-grey text-ink-300 ${className}`}
        role="img"
        aria-label={alt || t('common.imagePlaceholder')}
      >
        <icons.image size={40} />
      </div>
    );
  }

  return (
    <img
      src={resolved}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={`block h-full w-full object-cover ${className}`}
    />
  );
}
