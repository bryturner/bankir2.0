import styled from "styled-components";
import Account from "../components/Accounts/Account/Account";
import AccountsHeader from "../components/Accounts/AccountsHeader/AccountsHeader";

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
        <AccountsHeader
          firstName="Bryan"
          accountTotal="15000"
          earningsTotal="700"
        />
      </HeaderContainer>
      <Account
        title="Standard Savings"
        balance="10000"
        earnings="200"
        apy="2.5"
      />
    </Container>
  );
}

export default AccountPage;
