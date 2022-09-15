import styled from "styled-components";
import { firstToUpperCase, formatTransfer } from "../../../constants/helpers";

const ListItem = styled.li`
  border-bottom: 0.75px solid ${({ theme }) => theme.color.primaryMid};
  padding: 1rem 0;
`;

const Text = styled.p`
  font-weight: 500;
`;

const MsgDate = styled.p`
  color: ${({ theme }) => theme.color.primaryMid};
  font-size: 1.2rem;
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
          <>
            Congratulations {firstName}, you have opened a new account with
            BankIR!
          </>
        ) : type === "withdrawal" ? (
          <>
            Withdrew ${amount} from {firstToUpperCase(account)} Savings
          </>
        ) : type === "deposit" ? (
          <>
            Deposited ${amount} to {firstToUpperCase(account)} Savings
          </>
        ) : type === "transfer" ? (
          <>
            Transferred ${amount} from {formatTransfer(transferFrom)} to{" "}
            {formatTransfer(transferTo)}
          </>
        ) : type === "interest" ? (
          <>
            Interest paid: ${standard} to Standard Savings and ${premium} to
            Premium Savings
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
