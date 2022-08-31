import styled from "styled-components";
import Greeting from "../components/account/AccountsHeader/Greeting";
import Total from "../components/account/AccountsHeader/Total";
import Totals from "../components/account/AccountsHeader/Totals";

const Container = styled.div`
  margin-top: ${({ theme }) => theme.spacing.utilGap};
`;

const HeaderContainer = styled.div`
  background-color: #fff;
`;

const HeaderGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  max-width: 120rem;
  margin: 0 auto;
`;

function AccountPage() {
  return (
    <Container>
      <HeaderContainer>
        <HeaderGrid>
          <Greeting firstName="Bryan" />
          <Totals />
        </HeaderGrid>
      </HeaderContainer>
    </Container>
  );
}

export default AccountPage;
