import Button from "../Button/Button";

function ModalButton({ type, text, onClick, value }) {
  return <Button type={type} text={text} onClick={onClick} value={value} />;
}

export default ModalButton;
