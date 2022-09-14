import styled from "styled-components";

import TotalAPY from "../Total/TotalAPY";
import TotalCurrency from "../Total/TotalCurrency";
import Transaction from "./Transaction";

const Container = styled.div`
  background-color: #fff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: ${({ theme }) => theme.spacing.utilGap};
  margin-right: ${({ theme }) => theme.spacing.utilGap};
  padding: 1.8rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 60fr 40fr;
  margin-bottom: 30px;
  padding: 0 0.6rem;
`;

const Title = styled.h3`
  font-size: ${({ theme }) => theme.heading.tertiary};
`;

const HeadingsContainer = styled.div`
  border-bottom: 3px solid ${({ theme }) => theme.color.primaryLight};
  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
  padding: 0 1.2rem;
`;

const Heading = styled.p`
  color: ${({ theme }) => theme.color.primaryMid};
  font-weight: 400;

  &:nth-child(2) {
    text-align: center;
  }

  &:last-child {
    text-align: right;
  }
`;

const TransactionsContainer = styled.ul`
  list-style: none;
  max-height: 40rem;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const DefaultText = styled.p`
  color: ${({ theme }) => theme.color.primaryMidLight};
  font-size: 1.5rem;
  margin: 2rem 0 0.6rem 0;
  text-align: center;
`;

function Account({ title, balance, earnings, apy, transactions }) {
  return (
    <Container>
      <Grid>
        <Title>{title}</Title>
        <div>
          <TotalCurrency text="Account Balance" amount={balance} />
          <TotalCurrency text="Interest Earned" amount={earnings} />
          <TotalAPY text="Annual Yield" value={apy} />
        </div>
      </Grid>

      <HeadingsContainer>
        <Heading>Date</Heading>
        <Heading>Description</Heading>
        <Heading>Amount</Heading>
      </HeadingsContainer>

      <TransactionsContainer>
        {transactions.length === 0 ? (
          <DefaultText>No transactions or transfers recorded</DefaultText>
        ) : (
          transactions.map((transaction) => (
            <Transaction
              key={transaction.id}
              transDate={transaction.date}
              description={transaction.description}
              amount={transaction.amount}
            />
          ))
        )}
      </TransactionsContainer>
    </Container>
  );
}

export default Account;
