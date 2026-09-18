/** Saytın standart 1320px-lik mərkəzi sahəsi. */
export default function Container({ className = '', children, ...rest }) {
  return (
    <div className={`mx-auto max-w-container px-4 to-320:px-3 ${className}`} {...rest}>
      {children}
    </div>
  );
}
