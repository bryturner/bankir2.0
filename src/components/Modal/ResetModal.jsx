import FormModal from "./FormModal";

function ResetModal({ showModal, setShowModal, handleConfirmClick }) {
  const text =
    "Resetting your account will reset all the values. Are you sure you would like to do this?";

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
