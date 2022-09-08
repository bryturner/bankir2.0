import { useState } from "react";
import styled from "styled-components";
import { AccountMessage } from "../../../constants/helpers";

const Container = styled.div`
  padding: 1rem 0;
  border-bottom: 0.75px solid ${({ theme }) => theme.color.primaryMid};
`;

const Text = styled.p`
  font-size: 1.4rem;
  font-weight: 500;
`;

const MsgDate = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.color.primaryMid}; ;
`;

const upperCase = (str) => {
  return str && str.charAt(0).toUpperCase() + str.slice(1);
};

function Message({ message }) {
  const curDate = new Date(message.date).toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

  const acctMessage = new AccountMessage(message);
  const { type, transfer, withdrawal, deposit, welcome } = acctMessage;

  return (
    <Container>
      <Text>
        {type === "welcome"
          ? welcome
          : type === "withdrawal"
          ? withdrawal
          : type === "deposit"
          ? deposit
          : type === "transfer"
          ? transfer
          : ""}
      </Text>
      <MsgDate>{curDate}</MsgDate>
    </Container>
  );
}

export default Message;
