import styled from "styled-components";
import axios from "axios";
import { useReducer, useState } from "react";
import DescriptionInput from "../Input/DescriptionInput";
import SelectOption from "../SelectOption/SelectOption";
import AccountOptions from "../SelectOption/AccountOptions";
import Option from "../SelectOption/Option";
import TransferForm from "./TransferForm";
import DetailsBox from "../DetailsBox/DetailsBox";
import DateInput from "../Input/DateInput";
import AmountInput from "../Input/AmountInput";
import TransactionFormButton from "../Button/TransactionFormButton";
import { appendAmount } from "../../constants/helpers";

const Flex = styled.div`
  display: flex;
  gap: 2rem;
`;

const initialState = {
  transactionType: "deposit",
  transactionAccount: "standard",
  transactionDesc: "",
  transactionDate: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "update":
      return {
        ...state,
        [action.payload.key]: action.payload.value,
      };
    case "reset":
      return initialState;
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};

function TransactionForm({
  fetchAccountData,
  confirm,
  setModalData,
  setShowModal,
}) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [amount, setAmount] = useState("");

  const inputAction = (e) => {
    dispatch({
      type: "update",
      payload: { key: e.target.id, value: e.target.value },
    });
  };

  const reset = () => {
    dispatch({
      type: "reset",
    });
    setAmount("");
  };

  //   const submitTransaction = async (e) => {
  //     e.preventDefault();

  //     const updatedAmount = appendAmount(amount);

  //     const {
  //       transactionType,
  //       transactionAccount,
  //       transactionDesc,
  //       transactionDate,
  //     } = state;

  //     const data = {
  //       amount: updatedAmount,
  //       date: transactionDate,
  //       type: transactionType,
  //       description: transactionDesc,
  //       account: transactionAccount,
  //     };

  //     await axios.put("http://localhost:5002/account/transaction", { data });

  //     reset();
  //     fetchAccountData();
  //   };

  const test = (e) => {
    e.preventDefault();

    const updatedAmount = appendAmount(amount);

    const {
      transactionType,
      transactionAccount,
      transactionDesc,
      transactionDate,
    } = state;

    const data = {
      type: transactionType,
      account: transactionAccount,
      description: transactionDesc,
      date: transactionDate,
      amount: updatedAmount,
    };

    const modData = {
      type: transactionType,
      amount: updatedAmount,
      account: transactionAccount,
    };

    setModalData(modData);
    setShowModal(true);

    //  if (confirm) {
    //    console.log(data);
    //    reset();
    //  } else {
    //    console.log("cancel");
    //  }
  };

  return (
    <TransferForm onSubmit={test} id="transactionForm">
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
          placeholder="ex. received paycheck"
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
            value={amount}
            setAmount={setAmount}
          />
        </Flex>

        <TransactionFormButton />
      </DetailsBox>
    </TransferForm>
  );
}

export default TransactionForm;
