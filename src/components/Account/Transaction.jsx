import styled from "styled-components";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
  padding: 1rem;
  border-bottom: 0.75px solid ${({ theme }) => theme.color.primaryLight};

  /* &:nth-child(even) {
    background-color: ${({ theme }) => theme.color.primaryLightest};
  } */
`;

const TransDate = styled.p``;

const Desc = styled.p`
  text-align: center;
`;

const Amount = styled.p`
  text-align: right;
  color: ${(props) => (props.type === "negative" ? "#ff0000" : "#376805")};
`;

function Transaction({ transDate, description, amount }) {
  return (
    <Container>
      <TransDate>{transDate}</TransDate>
      <Desc>{description}</Desc>
      {amount < 0 ? (
        <Amount type="negative">-${amount.toFixed(2).slice(1)}</Amount>
      ) : (
        <Amount type="positive">${amount.toFixed(2)}</Amount>
      )}
    </Container>
  );
}

export default Transaction;
