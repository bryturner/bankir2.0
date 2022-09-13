import AmountInput from "../Input/AmountInput";

function TransferAmountInput({
  formName,
  id,
  value,
  setAmount,
  amountIsValid,
  setAmountIsValid,
  setError,
}) {
  return (
    <AmountInput
      formName={formName}
      id={id}
      value={value}
      setAmount={setAmount}
      amountIsValid={amountIsValid}
      setAmountIsValid={setAmountIsValid}
      setError={setError}
    />
  );
}

export default TransferAmountInput;
