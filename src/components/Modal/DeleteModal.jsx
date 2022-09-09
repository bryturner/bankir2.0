import styled from "styled-components";
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

function DeleteModal({ showModal, setShowModal }) {
  const handleClick = (e) => {
    const value = e.target.value;
    if (value === "confirm") {
      setShowModal(false);
      // delete account, path to login page
    } else {
      setShowModal(false);
    }
  };

  return (
    <>
      {showModal ? (
        <Container>
          <Box>
            <Text>Confirm that you would like to delete your account.</Text>
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

export default DeleteModal;
