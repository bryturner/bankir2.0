import axios from "axios";
import { useState } from "react";
import ResetModal from "../Modal/ResetModal";
import Button from "./Button";

function ResetButton({ fetchAccountData, firstName }) {
  const [showModal, setShowModal] = useState(false);

  const handleResetClick = () => {
    setShowModal(true);
  };

  const handleConfirmClick = async () => {
    try {
      const data = { firstName };

      await axios.put("http://localhost:5002/account/reset", data);

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
