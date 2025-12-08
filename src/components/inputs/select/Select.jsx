function Select({ options = [], className, onChange, placeholder }) {
  return (
    <select defaultValue="" className={className} onChange={onChange}>
      <option value="" disabled>
        {placeholder}
      </option>
      {options.length > 0 &&
        options.map((option) => (
          <option key={option.label} value={option.value}>
            {option.label}
          </option>
        ))}
    </select>
  );
}

export default Select;
