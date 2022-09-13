function Input({
  type,
  value,
  defaultValue,
  onChange,
  onBlur,
  formName,
  id,
  placeholder,
  inputMode,
  pattern,
  max,
  min,
  maxLength,
  required,
  dataTestId,
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
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
      data-testid={dataTestId}
    />
  );
}

export default Input;
