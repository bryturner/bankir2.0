import FormModal from "../Modal/FormModal";

function InterestModal({
  showModal,
  modalData,
  setShowModal,
  handleConfirmClick,
}) {
  const { years, standardEarned, premiumEarned } = modalData;

  const text = `In a ${years} year period you will have earned $${standardEarned} in your Standard account and $${premiumEarned} in your Premium account. Would you like to add these earnings to your accounts?`;

  return (
    <FormModal
      showModal={showModal}
      setShowModal={setShowModal}
      handleConfirmClick={handleConfirmClick}
      confirmText={text}
    />
  );
}

export default InterestModal;
