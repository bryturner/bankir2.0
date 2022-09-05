import styled from "styled-components";
import axios from "axios";
import { useReducer } from "react";
import DescriptionInput from "../Input/DescriptionInput";
import SelectOption from "../SelectOption/SelectOption";
import AccountOptions from "../SelectOption/AccountOptions";
import Option from "../SelectOption/Option";
import TempForm from "./TempForm";
import DetailsBox from "../DetailsBox/DetailsBox";
import DateInput from "../Input/DateInput";
import AmountInput from "../Input/AmountInput";
import TransactionFormButton from "../Button/TransactionFormButton";

const Flex = styled.div`
  display: flex;
  gap: 2rem;
`;

const initialState = {
  transactionType: "deposit",
  transactionAccount: "standard",
  transactionDesc: "",
  transactionAmount: "",
  transactionDate: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "update":
      return {
        ...state,
        [action.payload.key]: action.payload.value,
      };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};

function TransactionForm() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const inputAction = (e) => {
    dispatch({
      type: "update",
      payload: { key: e.target.id, value: e.target.value },
    });
  };

  const submitTransaction = async (e) => {
    await axios.post("http://localhost:5002/account/transaction", {});
  };

  const test = (e) => {
    e.preventDefault();

    const {
      transactionType,
      transactionAccount,
      transactionDesc,
      transactionAmount,
      transactionDate,
    } = state;

    const data = {
      type: transactionType,
      account: transactionAccount,
      description: transactionDesc,
      amount: transactionAmount,
      date: transactionDate,
    };

    console.log(data);
  };

  return (
    <TempForm onSubmit={test} id="transactionForm">
      <DetailsBox header="Record a Transaction">
        <SelectOption
          formName="transactionForm"
          id="transactionType"
          labelText="Transaction type:"
          defaultValue={state.transactionType}
          onChange={inputAction}
        >
          <Option value="deposit" title="Deposit" />
          <Option value="withdrawal" title="Withdrawal" />
        </SelectOption>

        <SelectOption
          formName="transactionForm"
          id="transactionAccount"
          labelText="Choose an account:"
          defaultValue={state.transactionAccount}
          onChange={inputAction}
        >
          <AccountOptions />
        </SelectOption>

        <DescriptionInput
          formName="transactionForm"
          id="transactionDesc"
          value={state.transactionDesc}
          onChange={inputAction}
        />

        <Flex>
          <DateInput
            formName="transactionForm"
            id="transactionDate"
            defaultValue={state.transactionDate}
            onChange={inputAction}
          />
          <AmountInput
            formName="transactionForm"
            id="transactionAmount"
            value={state.transactionAmount}
            onChange={inputAction}
          />
        </Flex>

        <TransactionFormButton />
      </DetailsBox>
    </TempForm>
  );
}

export default TransactionForm;