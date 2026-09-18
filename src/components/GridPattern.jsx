/**
 * Hero və timeline bölmələrindəki maskalı şəbəkə fonu.
 * Sinif adları tam yazılıb — Tailwind JIT dinamik birləşdirilmiş adları görmür.
 */
const VARIANTS = {
  hero: 'bg-[image:linear-gradient(rgba(17,20,24,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(17,20,24,0.035)_1px,transparent_1px)] bg-[length:72px_72px] [mask-image:radial-gradient(ellipse_70%_80%_at_70%_30%,#000_40%,transparent_78%)] [-webkit-mask-image:radial-gradient(ellipse_70%_80%_at_70%_30%,#000_40%,transparent_78%)]',
  strip:
    'bg-[image:linear-gradient(rgba(17,20,24,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(17,20,24,0.04)_1px,transparent_1px)] bg-[length:64px_64px] [mask-image:radial-gradient(ellipse_90%_100%_at_50%_50%,#000_30%,transparent_85%)] [-webkit-mask-image:radial-gradient(ellipse_90%_100%_at_50%_50%,#000_30%,transparent_85%)]',
};

export default function GridPattern({ variant = 'hero' }) {
  return <div aria-hidden="true" className={`absolute inset-0 ${VARIANTS[variant]}`} />;
}
