import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../../constants/paths";
import ResetModal from "../Modal/ResetModal";
import Button from "./Button";

function ResetButton({ fetchAccountData, firstName }) {
  const [showModal, setShowModal] = useState(false);

  const handleResetClick = () => {
    setShowModal(true);
  };

  const handleConfirmClick = async () => {
    try {
      const data = { firstName: firstName };

      await axios.put(`${BASE_URL}account/reset`, data);

      fetchAccountData();
    } catch (err) {
      console.error(err);
    } finally {
      setShowModal(false);
    }
  };
  return (
    <div>
      <ResetModal
        showModal={showModal}
        setShowModal={setShowModal}
        handleConfirmClick={handleConfirmClick}
      />
      <Button type="button" onClick={handleResetClick} text="Reset Account" />
    </div>
  );
}

export default ResetButton;
