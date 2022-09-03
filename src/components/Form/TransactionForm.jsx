import TransactionBox from "../DetailsBox/TransactionBox";
import TempForm from "./TempForm";

function TransactionForm() {
  return (
    <TempForm id="transactionForm">
      <TransactionBox formName="transactionForm" />
    </TempForm>
  );
}

export default TransactionForm;
