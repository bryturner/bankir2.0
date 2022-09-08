import Button from "./Button";

function TransactionFormButton({ onClick }) {
  return <Button type="button" text="Submit Transaction" onClick={onClick} />;
}

export default TransactionFormButton;
