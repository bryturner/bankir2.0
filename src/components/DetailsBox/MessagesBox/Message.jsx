import { useState } from "react";
import styled from "styled-components";

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

function Message({ message }) {
  const { amount, type, account, transferFrom, transferTo, date } = message;

  const curDate = new Date(date).toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

  const transferMsg = `Transfer $${amount} from ${transferFrom} to ${transferTo}`;
  const withdrawal = `Withdawal of $${amount} from ${account} Savings`;
  const deposit = `Deposit of $${amount} from ${account} Savings`;

  return (
    <Container>
      {type === "transfer" ? (
        <Text>{transferMsg}</Text>
      ) : type === "withdrawal" ? (
        <Text>{withdrawal}</Text>
      ) : (
        <Text>{deposit}</Text>
      )}
      <MsgDate>{curDate}</MsgDate>
    </Container>
  );
}

export default Message;
