import { useTranslation } from 'react-i18next';
import { icons } from '@/assets/icons/icons';
import ImageSlot from '@/components/ImageSlot';
import Tag from '@/components/Tag';

/**
 * Nəşr kartı.
 * `slotId` verilibsə üz qapağı şəkli, əks halda placeholder göstərilir.
 */
export default function PublicationCard({ tagKey, titleKey, slotId }) {
  const { t } = useTranslation();
  const hasCover = Boolean(slotId);
  const title = t(titleKey);

  return (
    <div className="group flex flex-col overflow-hidden rounded-[12px] border border-hair-8 bg-white">
      {hasCover ? (
        <div className="relative aspect-[3/4] overflow-hidden border-b border-hair-6">
          <ImageSlot
            slotId={slotId}
            alt={title}
            className="transition-transform duration-500 ease-linear group-hover:scale-[1.06]"
          />
        </div>
      ) : (
        <div className="flex aspect-[3/4] items-center justify-center border-b border-hair-6 bg-[linear-gradient(160deg,#e4e7ea,#f3f4f6)] text-ink-300">
          <icons.fileBlank size={38} />
        </div>
      )}

      <div className={`flex flex-1 flex-col ${hasCover ? 'px-5 pb-[22px] pt-5' : 'p-5'}`}>
        <Tag className="mb-[14px] self-start">{t(tagKey)}</Tag>
        <div className="mb-4 text-[15px] font-semibold leading-[1.4]">{title}</div>
        <a
          href="#"
          onClick={(event) => event.preventDefault()}
          className="mt-auto inline-flex items-center gap-[8px] text-[13.5px] font-semibold text-brand transition-colors duration-[180ms] hover:text-brand-dark"
        >
          <icons.download size={16} />
          {t('common.downloadPdf')}
        </a>
      </div>
    </div>
  );
}
