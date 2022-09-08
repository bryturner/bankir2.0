import styled from "styled-components";
import axios from "axios";
import { useReducer, useState } from "react";
import DescriptionInput from "../Input/DescriptionInput";
import SelectOption from "../SelectOption/SelectOption";
import Option from "../SelectOption/Option";
import DetailsBoxForm from "./DetailsBoxForm";
import DetailsBox from "../DetailsBox/DetailsBox";
import DateInput from "../Input/DateInput";
import AmountInput from "../Input/AmountInput";
import TransactionFormButton from "../Button/TransactionFormButton";
import TransactionFormModal from "../Modal/TransactionFormModal";

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

function TransactionForm({ fetchAccountData }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [amount, setAmount] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({
    type: "deposit",
    amount: "20.00",
    account: "Savings",
  });

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
  const handleInitialSubmit = () => {
    const { transactionType, transactionAccount } = state;

    const modData = {
      type: transactionType,
      amount: parseFloat(amount).toFixed(2),
      account: transactionAccount,
    };

    setModalData(modData);
    setShowModal(true);
  };

  const submitTransaction = (e) => {
    e.preventDefault();

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
      amount: parseFloat(amount).toFixed(2),
    };

    setShowModal(false);
    console.log(data);
  };

  return (
    <DetailsBoxForm onSubmit={submitTransaction} id="transactionForm">
      <TransactionFormModal
        modalData={modalData}
        showModal={showModal}
        setShowModal={setShowModal}
        handleConfirmClick={submitTransaction}
      />

      <DetailsBox header="Enter a Transaction">
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
          <Option value="standard" title="Standard Account" />
          <Option value="premium" title="Premium Account" />
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

        <TransactionFormButton onClick={handleInitialSubmit} />
      </DetailsBox>
    </DetailsBoxForm>
  );
}

export default TransactionForm;
