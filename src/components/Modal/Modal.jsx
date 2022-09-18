import styled from "styled-components";

const Container = styled.div`
  background-color: rgba(0, 0, 0, 0.4);
  height: 100%;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 999;
`;

const Box = styled.div`
  align-items: center;
  background-color: white;
  border-radius: 3px;
  left: 50%;
  min-width: 40rem;
  max-width: 50rem;
  position: absolute;
  top: 25rem;
  transform: translate(-50%, -50%);
`;

function Modal({ showModal, children }) {
  return (
    <>
      {showModal ? (
        <Container>
          <Box data-testid="modal">{children}</Box>
        </Container>
      ) : (
        <></>
      )}
    </>
  );
}

export default Modal;
