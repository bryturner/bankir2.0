import { firstToUpperCase } from "../../constants/helpers";

function TransactionText({ modalData }) {
  const { type, amount, account } = modalData;
  return (
    <p>
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
    </p>
  );
}

export default TransactionText;
