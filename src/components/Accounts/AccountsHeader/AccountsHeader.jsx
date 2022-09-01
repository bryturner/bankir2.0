import styled from "styled-components";
import Total from "../../Total/Total";
import Greeting from "./Greeting";

const Container = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  max-width: 120rem;
  margin: 0 auto;
  margin-bottom: ${({ theme }) => theme.spacing.utilGap};
`;

const Totals = styled.div``;

function AccountsHeader({ firstName, accountTotal, earningsTotal }) {
  return (
    <Container>
      <Greeting firstName={firstName} />
      <Totals>
        <Total type="Account Total" val={accountTotal} />
        <Total type="Interest Total" val={earningsTotal} />
      </Totals>
    </Container>
  );
}

export default AccountsHeader;
