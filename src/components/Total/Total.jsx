import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

const Title = styled.p``;

const TotalAmount = styled.span``;

function Total({ type, val }) {
  return (
    <Container>
      <Title>{type}</Title>
      <TotalAmount>${val.toFixed(2).toLocaleString()}</TotalAmount>
    </Container>
  );
}

export default Total;
