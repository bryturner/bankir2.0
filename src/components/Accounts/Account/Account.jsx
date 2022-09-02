import styled from "styled-components";
import Total from "../../Total/Total";
import Transaction from "./Transaction";

const Container = styled.div`
  margin-right: ${({ theme }) => theme.spacing.utilGap};
  margin-bottom: ${({ theme }) => theme.spacing.utilGap};
  background-color: #fff;
  padding: 1.8rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  margin-bottom: 30px;
  padding: 0 0.6rem;
`;

const Title = styled.h3`
  font-size: ${({ theme }) => theme.heading.tertiary};
`;

const TotalsContainer = styled.div`
  > div > p {
    color: ${({ theme }) => theme.color.primaryMid};
  }

  > div > span {
    font-size: 1.8rem;
  }
`;

const APYWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

const APYTitle = styled.p``;

const APYText = styled.span``;

const TransactionsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
  padding: 0 1.2rem;
  border-bottom: 3px solid ${({ theme }) => theme.color.primaryLight};
`;

const TransactionHeader = styled.p`
  font-weight: 400;
  font-size: 1.4rem;
  color: ${({ theme }) => theme.color.primaryMid};

  &:nth-child(2) {
    text-align: center;
  }

  &:last-child {
    text-align: right;
  }
`;

function Account({ title, balance, earnings, apy, transactions }) {
  return (
    <Container>
      <Grid>
        <Title>{title}</Title>
        <TotalsContainer>
          <Total type="Account Balance" val={balance} />
          <Total type="Interest Earned" val={earnings} />
          <APYWrapper>
            <APYTitle>APY</APYTitle>
            <APYText>{apy}%</APYText>
          </APYWrapper>
        </TotalsContainer>
      </Grid>
      <TransactionsContainer>
        <TransactionHeader>Date</TransactionHeader>
        <TransactionHeader>Description</TransactionHeader>
        <TransactionHeader>Amount</TransactionHeader>
      </TransactionsContainer>
      <Transaction transDate="8/30/22" description="Dinner" amount="50.00" />
      <Transaction transDate="8/30/22" description="Dinner" amount="50.00" />
    </Container>
  );
}

export default Account;
