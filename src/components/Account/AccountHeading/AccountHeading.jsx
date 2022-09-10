import styled from "styled-components";

import TotalCurrency from "../../Total/TotalCurrency";
import Greeting from "./Greeting";

const Container = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  align-items: center;
  max-width: 120rem;
  margin: ${({ theme }) => theme.spacing.utilGap} auto;
  padding: 2rem;
`;

const Totals = styled.div`
  > div > p {
    color: ${({ theme }) => theme.color.primaryMid};
    font-size: 1.8rem;
  }
  > div > span {
    font-size: 2rem;
  }
`;

function AccountsHeader({ firstName, accountTotal, earningsTotal }) {
  return (
    <Container data-testid="accounts-header">
      <Greeting firstName={firstName} />
      <Totals>
        <TotalCurrency text="Account Total" amount={accountTotal} />
        <TotalCurrency text="Earnings Total" amount={earningsTotal} />
      </Totals>
    </Container>
  );
}

export default AccountsHeader;
