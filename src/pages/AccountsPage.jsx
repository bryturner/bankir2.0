import axios from "axios";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Account from "../components/Account/Account";
import AccountForm from "../components/Form/AccountForm";
import AccountsHeader from "../components/Header/AccountsHeader/AccountsHeader";
import Messages from "../components/DetailsBox/MessagesBox/Messages";
import AccountContext from "../contexts/AccountContext";
import Modal from "../components/Modal/Modal";

const Container = styled.div`
  position: relative;
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
  const [firstName, setFirstName] = useState("");
  const [accountTotal, setAccountTotal] = useState(0);
  const [earningsTotal, setEarningsTotal] = useState(0);
  const [standardBalance, setStandardBalance] = useState(0);
  const [standardEarnings, setStandardEarnings] = useState(0);
  const [standardTransactions, setStandardTransactions] = useState([]);
  const [standardAPY, setStandardAPY] = useState(0);
  const [premiumBalance, setPremiumBalance] = useState(0);
  const [premiumEarnings, setPremiumEarnings] = useState(0);
  const [premiumTransactions, setPremiumTransactions] = useState([]);
  const [premiumAPY, setPremiumAPY] = useState(0);
  const [messages, setMessages] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  async function getAccountInfo() {
    //  setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:5002/account/");
      const { data } = response;

      setFirstName(data.firstName);
      setAccountTotal(data.accountTotal);
      setEarningsTotal(data.earningsTotal);
      setStandardBalance(data.standard.balance);
      setStandardEarnings(data.standard.earnings);
      setStandardTransactions(data.standard.transactions);
      setStandardAPY(data.standard.apy);
      setPremiumBalance(data.premium.balance);
      setPremiumEarnings(data.premium.earnings);
      setPremiumTransactions(data.premium.transactions);
      setPremiumAPY(data.premium.apy);
      setMessages(data.messages);
      //   setIsLoading(false);
    } catch (err) {
      console.error(err);
    }
  }

  const fetchAccountInfo = () => {
    fetch("testData.json")
      .then((response) => response.json())
      .then((data) => {
        setFirstName(data.firstName);
        setAccountTotal(data.accountTotal);
        setEarningsTotal(data.earningsTotal);
        setStandardBalance(data.standard.balance);
        setStandardEarnings(data.standard.earnings);
        setStandardTransactions(data.standard.transactions);
        setStandardAPY(data.standard.apy);
        setPremiumBalance(data.premium.balance);
        setPremiumEarnings(data.premium.earnings);
        setPremiumTransactions(data.premium.transactions);
        setPremiumAPY(data.premium.apy);
        setMessages(data.messages);
      });
  };

  useEffect(() => {
    //  getAccountInfo();
    fetchAccountInfo();
  }, []);

  return (
    <>
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <Container>
          {/* <Modal /> */}
          <HeaderContainer>
            <AccountsHeader
              firstName={firstName}
              accountTotal={accountTotal}
              earningsTotal={earningsTotal}
            />
          </HeaderContainer>

          <BodyContainer>
            <AccountsContainer>
              <Account
                title="Standard Savings"
                balance={standardBalance}
                earnings={standardEarnings}
                apy={standardAPY}
                transactions={standardTransactions}
              />
              <Account
                title="Premium Savings"
                balance={premiumBalance}
                earnings={premiumEarnings}
                apy={premiumAPY}
                transactions={premiumTransactions}
              />
            </AccountsContainer>

            <FormContainer>
              <AccountForm />
              <Messages messages={messages} />
            </FormContainer>
          </BodyContainer>
        </Container>
      )}
    </>
  );
}

export default AccountPage;
