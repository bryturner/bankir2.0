import { firstToUpperCase } from "../../constants/helpers";

function TransactionText({ modalData }) {
  const { type, amount, account } = modalData;
  return (
    <>
      {type === "withdrawal" ? (
        <>
          Withdraw ${amount} from {firstToUpperCase(account)} Savings?
        </>
      ) : type === "deposit" ? (
        <>
          Deposit ${amount} to {firstToUpperCase(account)} Savings?
        </>
      ) : (
        <>An error has occurred, please try again.</>
      )}
    </>
  );
}

export default TransactionText;
