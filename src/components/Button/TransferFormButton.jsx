import Button from "./Button";

function TransferFormButton({ onClick }) {
  return <Button type="button" text="Submit Transfer" onClick={onClick} />;
}

export default TransferFormButton;
