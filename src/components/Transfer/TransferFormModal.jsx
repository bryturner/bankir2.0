import { firstToUpperCase, formatTransfer } from "../../constants/helpers";
import FormModal from "../Modal/FormModal";

function TransferFormModal({ showModal, modalData, setShowModal }) {
  const { amount, transferFrom, transferTo } = modalData;

  const text = `Transfer $${amount} from ${firstToUpperCase(
    transferFrom
  )} Savings to ${formatTransfer(transferTo)}?`;

  return (
    <FormModal
      showModal={showModal}
      setShowModal={setShowModal}
      confirmText={text}
      confirmButtonText="Confirm"
    />
  );
}

export default TransferFormModal;
