import { useState } from "react";
import styled from "styled-components";
import { AccountMessage, firstToUpperCase } from "../../../constants/helpers";

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

const createTransferMsg = (amount, transferTo, transferFrom) => {
  if (transferFrom !== "standard" || transferFrom !== "premium") {
    return `Transfer`;
  }
};

function Message({ firstName, message }) {
  const curDate = new Date(message.date).toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

  const { type, amount, account, transferTo, transferFrom } = message;

  const welcome = `Congrats ${firstName}, you have opened a new account!`;

  //   const transferOther = createTransferMsg(amount, transferTo, transferFrom);

  //   outgoing/incoming transfer message for seperate users

  // -> Transfer $100 from user1 to Standard Savings
  // -> Transfer $100 from Standard Savings to user1

  const transfer = `Transfer $${amount} from ${transferFrom} to ${transferTo}`;

  const deposit = `Deposit $${amount} to ${firstToUpperCase(account)} Savings`;

  const withdrawal = `Withdrew $${amount} from ${firstToUpperCase(
    account
  )} Savings`;

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
