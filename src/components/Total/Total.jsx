import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

const Title = styled.p``;

const TotalAmount = styled.span``;

function Total({ type, val }) {
  const formattedVal = val.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return (
    <Container>
      <Title>{type}</Title>
      <TotalAmount>${formattedVal}</TotalAmount>
    </Container>
  );
}

export default Total;
