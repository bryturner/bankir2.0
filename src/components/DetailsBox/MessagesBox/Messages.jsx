import styled from "styled-components";
import DetailsBox from "../DetailsBox";
import Message from "./Message";

const Container = styled.div`
  margin-top: -1rem;
  border-top: 2px solid black;
`;

// transfer -> type, amount, date, from acct, to acct
// transaction -> type (deposit, withdrawal), amount, date, to acct

function Messages({ messages }) {
  return (
    <DetailsBox header="Messages">
      <Container>
        {messages.map((message) => {
          message.type === "welcome" ? (
            <Message text="Welcome to BankIR" date="Sept 1, 2022" />
          ) : message.type === "transfer" ? (
            <Message
              text="Transfer $500 from Standard Account to Premium Account"
              date="Sept 1, 2022"
            />
          ) : message.type === "transaction" ? (
            <Message
              text="Deposit $300 to Standard Account"
              date="Sept 1, 2022"
            />
          ) : (
            <></>
          );
        })}
        <Message
          text="Transfer $500 from Standard Account to Premium Account"
          date="Sept 1, 2022"
        />
        <Message text="Deposit $300 to Standard Account" date="Sept 1, 2022" />
        <Message text="Welcome to BankIR" date="Sept 1, 2022" />
      </Container>
    </DetailsBox>
  );
}

export default Messages;
