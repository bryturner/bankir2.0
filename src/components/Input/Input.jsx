function Input({
  type,
  value,
  defaultValue,
  onChange,
  formName,
  id,
  placeholder,
  inputMode,
  pattern,
  max,
  min,
  maxLength,
  required,
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      name={formName}
      id={id}
      inputMode={inputMode}
      pattern={pattern}
      placeholder={placeholder}
      max={max}
      min={min}
      maxLength={maxLength}
      defaultValue={defaultValue}
      required={required}
    />
  );
}

export default Input;
