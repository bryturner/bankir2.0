import styled from "styled-components";
import DetailsBox from "../../DetailsBox/DetailsBox";
import Message from "./Message";

const Container = styled.div`
  margin-top: -1rem;
  border-top: 2px solid black;
`;

function Messages() {
  return (
    <DetailsBox header="Messages">
      <Container>
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
