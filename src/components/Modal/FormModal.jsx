import styled from "styled-components";
import ModalButton from "./ModalButton";

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.4);
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

const ButtonsContainer = styled.div``;

function FormModal({
  showModal,
  setShowModal,
  handleConfirmClick,
  confirmText,
}) {
  const handleCancelClick = () => {
    setShowModal(false);
  };

  return (
    <>
      {showModal ? (
        <Container>
          <Box>
            <Text>{confirmText}</Text>
            <ButtonsContainer>
              <ModalButton
                type="submit"
                text="Confirm"
                onClick={handleConfirmClick}
              />
              <ModalButton
                type="button"
                text="Cancel"
                onClick={handleCancelClick}
              />
            </ButtonsContainer>
          </Box>
        </Container>
      ) : (
        <></>
      )}
    </>
  );
}

export default FormModal;
