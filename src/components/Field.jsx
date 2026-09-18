const BORDERS = {
  soft: 'border-hair-16',
  strong: 'border-hair-20',
};

/**
 * Form sahəsi: etiket + input (+ opsional sağ tərəf keçidi və köməkçi mətn).
 */
export default function Field({
  label,
  hint,
  labelAction,
  border = 'strong',
  className = '',
  ...inputProps
}) {
  return (
    <div className={className}>
      {labelAction ? (
        <div className="mb-[7px] flex items-center justify-between">
          <label className="text-[13px] font-semibold text-ink-700">{label}</label>
          {labelAction}
        </div>
      ) : (
        <label className="mb-[7px] block text-[13px] font-semibold text-ink-700">
          {label}
        </label>
      )}

      <input
        className={`box-border w-full rounded-[10px] border ${BORDERS[border]} px-[14px] py-3 font-sans text-[15px] text-ink outline-none transition-colors duration-[180ms] focus:border-brand`}
        {...inputProps}
      />

      {hint && <p className="m-0 mt-2 text-[12.5px] text-ink-600">{hint}</p>}
    </div>
  );
}
