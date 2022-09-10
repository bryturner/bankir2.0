import { firstToUpperCase } from "../../constants/helpers";
import FormModal from "../Modal/FormModal";
import TransactionText from "./TransactionText";

const getText = (type, amount, account) => {
  if (type === "withdrawal") {
    return `Withdraw $${amount} from ${firstToUpperCase(account)} Savings?`;
  }
  if (type === "deposit") {
    return `Deposit $${amount} to ${firstToUpperCase(account)} Savings?`;
  }
  return "ERROR";
};

function TransactionFormModal({ showModal, modalData, setShowModal }) {
  const { type, amount, account } = modalData;

  const text = getText(type, amount, account);

  return (
    <FormModal
      showModal={showModal}
      setShowModal={setShowModal}
      confirmText={<TransactionText modalData={modalData} />}
      confirmButtonText="Confirm"
    />
  );
}

export default TransactionFormModal;
