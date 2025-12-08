export default function Input({
  type,
  className,
  id,
  placeholder,
  onChange,
  autoComplete,
  value,
  style,
}) {
  return (
    <>
      <input
        type={type}
        style={style}
        className={className}
        autoComplete={autoComplete}
        id={id}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
    </>
  );
}
