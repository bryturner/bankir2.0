import styled from "styled-components";
import Total from "../../Total/Total";
import Greeting from "./Greeting";

const Container = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  align-items: center;
  max-width: 120rem;
  margin: ${({ theme }) => theme.spacing.utilGap} auto;
  padding: 2rem 0;
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
        <Total type="Account Total" val={accountTotal} />
        <Total type="Earnings Total" val={earningsTotal} />
      </Totals>
    </Container>
  );
}

export default AccountsHeader;
