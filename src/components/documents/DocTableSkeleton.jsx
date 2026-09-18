import { SKELETON_WIDTHS } from '@/constants/documents';

const SK =
  'animate-shimmer rounded-[6px] bg-surface-deep bg-[linear-gradient(90deg,#EDF1F5_0px,#F7FAFC_180px,#EDF1F5_360px)] bg-[length:840px_100%]';

/** Filtr tətbiq olunarkən göstərilən yüklənmə skeleti. */
export default function DocTableSkeleton() {
  return (
    <div className="overflow-hidden rounded-[14px] border border-hair-11 bg-white">
      <div className="flex gap-4 bg-surface-muted px-[18px] py-[15px]">
        <span className={`${SK} h-3 w-[46px]`} />
        <span className={`${SK} h-3 flex-1`} />
        <span className={`${SK} h-3 w-[112px]`} />
        <span className={`${SK} h-3 w-[104px]`} />
      </div>

      {SKELETON_WIDTHS.map((width, index) => (
        <div
          key={index}
          className="flex items-center gap-4 border-t border-hair-8 p-[18px]"
        >
          <span className={`${SK} h-[17px] w-[17px] rounded-[4px]`} />
          <span className={`${SK} h-[34px] w-[34px] rounded-[8px]`} />
          <span className="flex flex-1 flex-col gap-2">
            <span className={`${SK} h-[13px]`} style={{ width }} />
            <span className={`${SK} h-[11px] w-[38%]`} />
          </span>
          <span className={`${SK} h-6 w-[92px] rounded-full`} />
          <span className={`${SK} h-3 w-[104px]`} />
          <span className={`${SK} h-[34px] w-[120px] rounded-[9px]`} />
        </div>
      ))}
    </div>
  );
}
