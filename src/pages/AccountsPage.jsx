import styled from "styled-components";
import Account from "../components/Accounts/Account/Account";
import AccountForm from "../components/Accounts/AccountForm/AccountForm";
import AccountsHeader from "../components/Accounts/AccountsHeader/AccountsHeader";
import Messages from "../components/Accounts/Messages/Messages";

const Container = styled.div`
  margin-top: ${({ theme }) => theme.spacing.utilGap};
`;

const HeaderContainer = styled.div`
  background-color: #fff;
`;

const BodyContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  max-width: 120rem;
  margin: 0 auto;
`;

const AccountsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const FormContainer = styled.div``;

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

      <BodyContainer>
        <AccountsContainer>
          <Account
            title="Standard Savings"
            balance="10000"
            earnings="200"
            apy="2.5"
            // transactions={transactions}
          />
          <Account
            title="Premium Savings"
            balance="5000"
            earnings="500"
            apy="6.5"
            // transactions={transactions}
          />
        </AccountsContainer>

        <FormContainer>
          <AccountForm />
          <Messages />
        </FormContainer>
      </BodyContainer>
    </Container>
  );
}

export default AccountPage;
