import styled from "styled-components";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
  padding: 1.2rem;
  border-bottom: 0.75px solid ${({ theme }) => theme.color.primaryLight};
`;

const Text = styled.p`
  &:nth-child(2) {
    text-align: center;
  }

  &:last-child {
    text-align: right;
  }
`;

function Transaction({ transDate, description, amount }) {
  return (
    <Container>
      <Text>{transDate}</Text>
      <Text>{description}</Text>
      <Text>${amount}</Text>
    </Container>
  );
}

export default Transaction;
