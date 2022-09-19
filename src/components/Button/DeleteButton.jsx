import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../../constants/paths";
import DeleteModal from "../Modal/DeleteModal";
import Button from "./Button";

function DeleteButton() {
  const [showModal, setShowModal] = useState(false);

  const handleDeleteClick = () => {
    setShowModal(true);
  };

  const handleConfirmClick = async () => {
    try {
      await axios.delete(`${BASE_URL}user/delete`);
    } catch (err) {
      console.error(err);
    } finally {
      setShowModal(false);
    }
  };
  return (
    <div>
      <DeleteModal
        showModal={showModal}
        setShowModal={setShowModal}
        handleConfirmClick={handleConfirmClick}
      />
      <Button type="button" onClick={handleDeleteClick} text="Delete Account" />
    </div>
  );
}

export default DeleteButton;
