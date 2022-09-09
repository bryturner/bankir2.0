function InterestInput({ value, onChange, id, formName }) {
  return (
    <input
      type="number"
      value={value}
      onChange={onChange}
      id={id}
      name={formName}
      min="1"
      max="30"
    />
  );
}

export default InterestInput;
