import styled from "styled-components";

const Container = styled.div`
  background-color: #fff;
  padding: 2rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const Summary = styled.summary`
  font-size: 1.8rem;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 2rem;

  > button {
    margin-top: 1rem;
  }
`;

function DetailsBox({ children, header }) {
  return (
    <Container>
      <details>
        <Summary>{header}</Summary>
        <ContentContainer>{children}</ContentContainer>
      </details>
    </Container>
  );
}

export default DetailsBox;
