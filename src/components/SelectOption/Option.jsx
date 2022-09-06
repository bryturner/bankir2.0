function Option({ value, title, selected }) {
  return (
    <option value={value} selected={selected}>
      {title}
    </option>
  );
}

export default Option;
