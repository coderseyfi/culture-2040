/** Nəşr/xəbər kartlarındakı kiçik brend rəngli etiket. */
export default function Tag({ className = '', children }) {
  return (
    <span
      className={`inline-block rounded-full bg-brandA-8 px-[10px] py-[4px] text-[11.5px] font-semibold tracking-[0.04em] text-brand ${className}`}
    >
      {children}
    </span>
  );
}
