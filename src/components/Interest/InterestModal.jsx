import FormModal from "../Modal/FormModal";
import InterestText from "./InterestText";

function InterestModal({ showModal, modalData, setShowModal }) {
  return (
    <FormModal
      showModal={showModal}
      setShowModal={setShowModal}
      confirmText={<InterestText modalData={modalData} />}
      confirmButtonText="Add to Accounts"
    />
  );
}

export default InterestModal;
