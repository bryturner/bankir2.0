function Option({ value, title, disabled, selected }) {
  return (
    <option value={value} disabled={disabled} selected={selected}>
      {title}
    </option>
  );
}

export default Option;
