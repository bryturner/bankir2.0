import styled from "styled-components";

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
  align-items: center;
  background-color: white;
  position: absolute;
  top: 25rem;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 40rem;
  max-width: 50rem;
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
