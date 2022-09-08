import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Account from "../components/Account/Account";
import AccountsHeader from "../components/Header/AccountsHeader/AccountsHeader";
import Messages from "../components/DetailsBox/MessagesBox/Messages";
import AccountTransferForm from "../components/Form/AccountTransferForm";
import TransactionForm from "../components/Form/TransactionForm";
import Header from "../components/Header/Header";
import Modal from "../components/Modal/Modal";

const Container = styled.div`
  position: relative;
`;

const HeaderContainer = styled.div`
  background-color: #fff;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  max-width: 120rem;
  margin: 0 auto;
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.utilGap};
  margin-bottom: ${({ theme }) => theme.spacing.utilGap};
`;

function AccountPage({ isLoggedIn }) {
  const [firstName, setFirstName] = useState("");
  const [accountTotal, setAccountTotal] = useState(0);
  const [earningsTotal, setEarningsTotal] = useState(0);
  const [messages, setMessages] = useState([]);
  const [isDefault, setIsDefault] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  //   Standard account values
  const [standardBalance, setStandardBalance] = useState(0);
  const [standardEarnings, setStandardEarnings] = useState(0);
  const [standardTransactions, setStandardTransactions] = useState([]);
  const [standardAPY, setStandardAPY] = useState(0);
  //   Premium account values
  const [premiumBalance, setPremiumBalance] = useState(0);
  const [premiumEarnings, setPremiumEarnings] = useState(0);
  const [premiumTransactions, setPremiumTransactions] = useState([]);
  const [premiumAPY, setPremiumAPY] = useState(0);

  // Modal State
  const [modalData, setModalData] = useState({
    type: "deposit",
    amount: "20.00",
    account: "Savings",
  });
  const [showModal, setShowModal] = useState(false);
  const [confirm, setConfirm] = useState(false);

  async function fetchAccountData() {
    //  setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:5002/account/");
      const { data } = response;

      console.log(data);
      setFirstName(data.firstName);
      setAccountTotal(data.accountTotal);
      setEarningsTotal(data.earningsTotal);
      setStandardBalance(data.standard.balance);
      setStandardEarnings(data.standard.earnings);
      setStandardTransactions(data.stdTransactions);
      setStandardAPY(data.standard.apy);
      setPremiumBalance(data.premium.balance);
      setPremiumEarnings(data.premium.earnings);
      setPremiumTransactions(data.prmTransactions);
      setPremiumAPY(data.premium.apy);
      setMessages(data.messages);
      setIsDefault(data.isDefault);
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
        setStandardTransactions(data.stdTransactions);
        setStandardAPY(data.standard.apy);
        setPremiumBalance(data.premium.balance);
        setPremiumEarnings(data.premium.earnings);
        setPremiumTransactions(data.prmTransactions);
        setPremiumAPY(data.premium.apy);
        setMessages(data.messages);
        setIsDefault(data.isDefault);
      });
  };

  useEffect(() => {
    //  fetchAccountData();
    fetchAccountInfo();
  }, []);

  return (
    <>
      <Modal
        modalData={modalData}
        showModal={showModal}
        setShowModal={setShowModal}
        setConfirm={setConfirm}
      />
      <Header isLoggedIn={isLoggedIn} />
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <Container>
          <HeaderContainer>
            <AccountsHeader
              firstName={firstName}
              accountTotal={accountTotal}
              earningsTotal={earningsTotal}
            />
          </HeaderContainer>

          <Grid>
            <LeftContainer>
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
            </LeftContainer>

            <RightContainer>
              <AccountTransferForm fetchAccountData={fetchAccountData} />
              <TransactionForm
                fetchAccountData={fetchAccountData}
                confirm={confirm}
                setModalData={setModalData}
                setShowModal={setShowModal}
              />
              <Messages messages={messages} />
            </RightContainer>
          </Grid>
        </Container>
      )}
    </>
  );
}

export default AccountPage;
