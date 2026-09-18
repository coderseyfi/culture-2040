/** Bölmə başlığının üstündəki kiçik, brend rəngli etiket. */
export default function Eyebrow({ className = '', children }) {
  return (
    <div
      className={`text-[13px] font-semibold tracking-[0.06em] text-brand ${className}`}
    >
      {children}
    </div>
  );
}
