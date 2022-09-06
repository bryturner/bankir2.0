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
        {messages.map((message) => (
          <Message message={message} key={message.id} />
        ))}
      </Container>
    </DetailsBox>
  );
}

export default Messages;
