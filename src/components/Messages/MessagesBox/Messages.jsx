import styled from "styled-components";
import DetailsBox from "../../DetailsBox/DetailsBox";

import Message from "./Message";

const List = styled.ul`
  list-style: none;
  margin-top: -1rem;
  border-top: 2px solid black;
  max-height: 38rem;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
`;

function Messages({ messages }) {
  return (
    <DetailsBox header="Messages">
      <List>
        {messages.map((message) => (
          <Message message={message} key={message.id} />
        ))}
      </List>
    </DetailsBox>
  );
}

export default Messages;
