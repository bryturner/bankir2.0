import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Title = styled.p``;

const TotalAmount = styled.p``;

function Total({ title, amount }) {
  return (
    <Container>
      <Title>{title}</Title>
      <TotalAmount>{amount}</TotalAmount>
    </Container>
  );
}

export default Total;
