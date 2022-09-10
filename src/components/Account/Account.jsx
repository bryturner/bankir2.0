import styled from "styled-components";
import Total from "../Total/Total";
import TotalAPY from "../Total/TotalAPY";
import TotalCurrency from "../Total/TotalCurrency";
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
  grid-template-columns: 60fr 40fr;
  margin-bottom: 30px;
  padding: 0 0.6rem;
`;

const Title = styled.h3`
  font-size: ${({ theme }) => theme.heading.tertiary};
`;

const HeadingsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
  padding: 0 1.2rem;
  border-bottom: 3px solid ${({ theme }) => theme.color.primaryLight};
`;

const Heading = styled.p`
  font-weight: 400;
  color: ${({ theme }) => theme.color.primaryMid};

  &:nth-child(2) {
    text-align: center;
  }

  &:last-child {
    text-align: right;
  }
`;

const TransactionsContainer = styled.ul`
  list-style: none;
`;

const DefaultText = styled.p`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.color.primaryMidLight};
  text-align: center;
  margin: 2rem 0 0.6rem 0;
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
              transDate={transaction.date}
              description={transaction.description}
              amount={transaction.amount}
              key={transaction.id}
            />
          ))
        )}
      </TransactionsContainer>
    </Container>
  );
}

export default Account;
