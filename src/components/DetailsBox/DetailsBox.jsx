import styled from "styled-components";

const Container = styled.div`
  background-color: #fff;
  padding: 2rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const Summary = styled.summary`
  font-size: 1.8rem;
  cursor: pointer;
`;

const ContentContainer = styled.div`
  margin-top: 2rem;
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
