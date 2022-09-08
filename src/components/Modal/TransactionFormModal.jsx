import { firstToUpperCase } from "../../constants/helpers";
import FormModal from "./FormModal";

const getText = (type, amount, account) => {
  if (type === "withdrawal") {
    return `Withdraw $${amount} from ${firstToUpperCase(account)} Savings`;
  }
  if (type === "deposit") {
    return `Deposit $${amount} to ${firstToUpperCase(account)} Savings`;
  }
  return "ERROR";
};

function TransactionFormModal({
  showModal,
  modalData,
  setShowModal,
  handleConfirmClick,
}) {
  const { type, amount, account } = modalData;

  const text = getText(type, amount, account);

  return (
    <FormModal
      showModal={showModal}
      setShowModal={setShowModal}
      handleConfirmClick={handleConfirmClick}
      confirmText={text}
    />
  );
}

export default TransactionFormModal;
