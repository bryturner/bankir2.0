import { firstToUpperCase } from "../../constants/helpers";
import FormModal from "../Modal/FormModal";

const formatTransferTo = (transferTo) => {
  if (transferTo !== "premium" || transferTo !== "standard") {
    return transferTo;
  }
  return firstToUpperCase(transferTo);
};

function TransferFormModal({ showModal, modalData, setShowModal }) {
  const { amount, transferFrom, transferTo } = modalData;

  const formattedTransferTo = formatTransferTo(transferTo);

  const text = `Transfer $${amount} from ${firstToUpperCase(
    transferFrom
  )} to ${formattedTransferTo}?`;

  return (
    <FormModal
      showModal={showModal}
      setShowModal={setShowModal}
      confirmText={text}
    />
  );
}

export default TransferFormModal;
