import FormModal from "./FormModal";

function ResetModal({ showModal, setShowModal, handleConfirmClick }) {
  const text =
    "Are you sure you would like to reset this account to the default values?";

  return (
    <FormModal
      showModal={showModal}
      setShowModal={setShowModal}
      confirmText={text}
      confirmButtonText="Confirm"
      handleConfirmClick={handleConfirmClick}
    />
  );
}

export default ResetModal;
