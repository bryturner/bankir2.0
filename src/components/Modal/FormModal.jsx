import styled from "styled-components";
import Modal from "./Modal";
import ModalButton from "./ModalButton";

const Container = styled.div`
  padding: 5rem;
  display: flex;
  flex-direction: column;
  gap: 2.6rem;
  align-items: center;
`;

const Text = styled.div`
  text-align: center;
  font-size: 1.6rem;
`;

const ButtonsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;

  > button {
    flex: 1;
  }

  > button:last-child {
    align-self: center;
    width: fit-content;
    background-image: none;
    color: ${({ theme }) => theme.color.secondary};
    padding: 0;

    &:hover {
      text-decoration: underline;
    }
  }
`;

function FormModal({
  showModal,
  setShowModal,
  confirmText,
  confirmButtonText,
  handleConfirmClick,
}) {
  const handleCancelClick = () => {
    setShowModal(false);
  };

  return (
    <Modal showModal={showModal}>
      <Container>
        <Text data-testid="modal-text">{confirmText}</Text>
        <ButtonsContainer>
          <ModalButton
            type="submit"
            text={confirmButtonText}
            onClick={handleConfirmClick}
          />
          <ModalButton
            type="button"
            text="Cancel"
            onClick={handleCancelClick}
          />
        </ButtonsContainer>
      </Container>
    </Modal>
  );
}

export default FormModal;
