import styled from "styled-components";

const Container = styled.div`
  background-color: #fff;
  padding: 2rem;
`;

const Summary = styled.summary`
  font-size: 1.8rem;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 2rem;
`;

function FormBox({ children, header }) {
  return (
    <Container>
      <details>
        <Summary>{header}</Summary>
        <ContentContainer>{children}</ContentContainer>
      </details>
    </Container>
  );
}

export default FormBox;
