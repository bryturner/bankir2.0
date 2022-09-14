import styled from "styled-components";
import Modal from "./Modal";
import ModalButton from "./ModalButton";

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 2.6rem;
  padding: 5rem;
`;

const Text = styled.div`
  font-size: 1.6rem;
  text-align: center;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  width: 100%;

  > button {
    flex: 1;
  }

  > button:last-child {
    align-self: center;
    background-image: none;
    color: ${({ theme }) => theme.color.secondary};
    padding: 0;
    width: fit-content;

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
            onClick={handleConfirmClick}
            text={confirmButtonText}
          />
          <ModalButton
            type="button"
            onClick={handleCancelClick}
            text="Cancel"
          />
        </ButtonsContainer>
      </Container>
    </Modal>
  );
}

export default FormModal;
