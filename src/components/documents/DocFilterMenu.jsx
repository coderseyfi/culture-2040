import { icons } from '@/assets/icons/icons';

/**
 * «Növ» və «Orqan» filtrlərinin açılan siyahısı.
 * @param {{value:string,label:string}[]} options
 */
export default function DocFilterMenu({
  name,
  ariaLabel,
  value,
  valueLabel,
  options,
  open,
  onToggle,
  onClose,
  onSelect,
  menuWidth = 'min-w-[230px]',
}) {
  return (
    <div className="relative">
      <button
        type="button"
        onClick={onToggle}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={ariaLabel ?? name}
        className="flex h-[46px] cursor-pointer items-center gap-2 rounded-[10px] border border-hair-20 bg-white px-[13px] font-sans"
      >
        <span className="whitespace-nowrap text-[13px] text-ink-600">{name}</span>
        <span className="whitespace-nowrap text-[14.5px] font-medium text-ink">
          {valueLabel}
        </span>
        <icons.chevronDown size={14} strokeWidth={2.2} className="flex-none text-ink-600" />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={onClose} />
          <div
            role="listbox"
            className={`absolute left-0 top-[52px] z-[41] animate-drop-in rounded-[11px] border border-hair-12 bg-white p-[6px] shadow-menu ${menuWidth}`}
          >
            {options.map((option) => {
              const active = option.value === value;
              return (
                <button
                  key={option.value}
                  type="button"
                  role="option"
                  aria-selected={active}
                  onClick={() => onSelect(option.value)}
                  className={`flex w-full cursor-pointer items-center justify-between gap-3 rounded-[8px] border-none px-3 py-[10px] text-left font-sans text-[14px] font-medium transition-colors duration-[180ms] hover:bg-surface-muted ${
                    active ? 'bg-brandA-9 text-brand' : 'bg-transparent text-ink-700'
                  }`}
                >
                  {option.label}
                  <icons.check
                    size={15}
                    className={`flex-none ${active ? 'opacity-100' : 'opacity-0'}`}
                  />
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
