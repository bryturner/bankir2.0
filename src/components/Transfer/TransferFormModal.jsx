import { firstToUpperCase } from "../../constants/helpers";
import FormModal from "../Modal/FormModal";

function TransferFormModal({ showModal, modalData, setShowModal }) {
  const { amount, transferFrom, transferTo } = modalData;

  const formatTransferTo = (transferTo) => {
    if (transferTo !== "premium" && transferTo !== "standard") {
      return transferTo;
    }
    return firstToUpperCase(transferTo);
  };

  const text = `Transfer $${amount} from ${firstToUpperCase(
    transferFrom
  )} to ${formatTransferTo(transferTo)}?`;

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
