import styled from "styled-components";
import ModalButton from "../Button/ModalButton";

const Container = styled.div`
  position: absolute;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.4);
  width: 100%;
  height: 100%;
  display: block;
  /* display: ${(props) => (props.display === "hidden" ? "block" : "none")}; */
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.6rem;
  align-items: center;
  background-color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 12rem;
  padding: 3rem;

  > button {
    display: inline-block;
    width: 50%;
  }
`;

const Text = styled.p`
  text-align: center;
`;

function Modal() {
  return (
    <Container>
      <Box>
        <Text>
          You are transfering $40 from Standard Account to Premium Account
        </Text>
        <ModalButton />
      </Box>
    </Container>
  );
}

export default Modal;
