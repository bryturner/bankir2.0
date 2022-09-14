import FormModal from "../Modal/FormModal";
import TransactionText from "./TransactionText";

function TransactionFormModal({ showModal, modalData, setShowModal }) {
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
