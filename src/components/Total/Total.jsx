import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Title = styled.p``;

const TotalAmount = styled.p``;

function Total({ type, val }) {
  return (
    <Container>
      <Title>{type}</Title>
      <TotalAmount>${val}</TotalAmount>
    </Container>
  );
}

export default Total;
