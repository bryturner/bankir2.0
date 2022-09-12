function Option({ value, title, dataTestId }) {
  return (
    <option data-testid={dataTestId} value={value}>
      {title}
    </option>
  );
}

export default Option;
