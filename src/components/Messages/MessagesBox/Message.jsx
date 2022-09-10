import { useState } from "react";
import styled from "styled-components";
import { firstToUpperCase } from "../../../constants/helpers";

const ListItem = styled.li`
  padding: 1rem 0;
  border-bottom: 0.75px solid ${({ theme }) => theme.color.primaryMid};
`;

const Text = styled.p`
  font-weight: 500;
`;

const MsgDate = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.color.primaryMid}; ;
`;

function Message({ message }) {
  const curDate = new Date(message.date).toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

  const {
    firstName,
    type,
    amount,
    account,
    transferTo,
    transferFrom,
    premium,
    standard,
  } = message;

  return (
    <ListItem>
      <Text>
        {type === "welcome" ? (
          <>Congrats {firstName}, you have opened a new account!</>
        ) : type === "withdrawal" ? (
          <>
            Withdrew ${amount} from {firstToUpperCase(account)} Savings
          </>
        ) : type === "deposit" ? (
          <>
            Deposit ${amount} to {firstToUpperCase(account)} Savings
          </>
        ) : type === "transfer" ? (
          <>
            Transfer ${amount} from {firstToUpperCase(transferFrom)} to{" "}
            {firstToUpperCase(transferTo)}
          </>
        ) : type === "interest" ? (
          <>
            Interest paid: ${standard} to Standard and ${premium} to Premium
          </>
        ) : (
          <>An error has occurred</>
        )}
      </Text>
      <MsgDate>{curDate}</MsgDate>
    </ListItem>
  );
}

export default Message;
