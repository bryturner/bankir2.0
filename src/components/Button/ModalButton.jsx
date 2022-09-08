import Button from "./Button";

function ModalButton({ text, onClick, value }) {
  return <Button type="button" text={text} onClick={onClick} value={value} />;
}

export default ModalButton;
