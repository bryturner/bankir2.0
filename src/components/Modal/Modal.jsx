import styled from "styled-components";
import { ModalMessage } from "../../constants/helpers";
import ModalButton from "../Button/ModalButton";

const Container = styled.div`
  position: fixed;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.4);
  width: 100%;
  min-height: 100%;
  display: block;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.6rem;
  align-items: center;
  background-color: white;
  position: absolute;
  top: 50vh;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 40rem;
  padding: 5rem;
`;

const Text = styled.p`
  text-align: center;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;

  > button {
  }
`;

function Modal({ modalData, showModal, setShowModal, setConfirm }) {
  //   const cancel = () => {
  //     setShowModal(false);
  //     setConfirm(false);
  //   };

  //   const confirm = () => {
  //     setShowModal(false);
  //     setConfirm(true);
  //   };

  //   const modalClick = (e) => {
  //     setConfirm(e.target.value);
  //     setShowModal(false);
  //   };

  const handleClick = (e) => {
    setShowModal(false);
  };

  const message = new ModalMessage(modalData);
  const { type, transfer, withdrawal, deposit, deleteAccount, error } = message;
  return (
    <>
      {showModal ? (
        <Container>
          <Box>
            <Text>
              {type === "transfer"
                ? transfer
                : type === "withdrawal"
                ? withdrawal
                : type === "deposit"
                ? deposit
                : type === "delete"
                ? deleteAccount
                : error}
              <span>?</span>
            </Text>
            <ButtonsContainer>
              <ModalButton
                text="Confirm"
                onClick={handleClick}
                value="confirm"
              />
              <ModalButton text="Cancel" onClick={handleClick} value="cancel" />
            </ButtonsContainer>
          </Box>
        </Container>
      ) : (
        <></>
      )}
    </>
  );
}

export default Modal;
