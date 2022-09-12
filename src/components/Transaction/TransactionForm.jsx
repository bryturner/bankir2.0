import styled from "styled-components";
import axios from "axios";
import { useReducer, useState } from "react";

import { appendAmount } from "../../constants/helpers";

import StyledFormInputs from "../StyledComponents/StyledFormInputs";
import DescriptionInput from "../Input/DescriptionInput";
import DateInput from "../Input/DateInput";
import AmountInput from "../Input/AmountInput";
import SelectOption from "../SelectOption/SelectOption";
import Option from "../SelectOption/Option";
import DetailsBox from "../DetailsBox/DetailsBox";
import ErrorMessage from "../Messages/ErrorMessage";
import TransactionFormButton from "./TransactionFormButton";
import TransactionFormModal from "./TransactionFormModal";
import TestAmount from "../Input/TestAmount";

const Form = styled.form``;

const Flex = styled.div`
  display: flex;
  gap: 2rem;
`;

const ButtonContainer = styled.div`
  margin-top: 6px;

  > button {
    width: 100%;
  }
`;

const initialState = {
  transactionType: "deposit",
  transactionAccount: "standard",
  transactionDesc: "",
  transactionDate: new Date().toISOString().slice(0, 10),
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
  const [modalData, setModalData] = useState({});
  const [error, setError] = useState("");

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

  const handleInitialSubmit = () => {
    const { transactionType, transactionAccount } = state;

    const updatedAmount = appendAmount(amount);
    const modData = {
      type: transactionType,
      amount: updatedAmount,
      account: transactionAccount,
    };

    setModalData(modData);
    setShowModal(true);
  };

  const submitTransaction = async (e) => {
    e.preventDefault();

    try {
      const {
        transactionType,
        transactionAccount,
        transactionDesc,
        transactionDate,
      } = state;

      const data = {
        amount: amount,
        date: transactionDate,
        type: transactionType,
        account: transactionAccount,
        description: transactionDesc,
      };

      // await axios.put("http://localhost:5002/account/transaction", data);

      reset();
      setError("");
      fetchAccountData();
    } catch (err) {
      console.error(err);
      setError(err.response.data.errorMessage);
    } finally {
      setShowModal(false);
    }
  };

  return (
    <Form onSubmit={submitTransaction} id="transactionForm">
      <TransactionFormModal
        modalData={modalData}
        showModal={showModal}
        setShowModal={setShowModal}
      />

      <DetailsBox header="Enter a Transaction">
        <StyledFormInputs>
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
          {/* <TestAmount /> */}
        </StyledFormInputs>

        <ButtonContainer>
          <ErrorMessage error={error} />
          <TransactionFormButton onClick={handleInitialSubmit} />
        </ButtonContainer>
      </DetailsBox>
    </Form>
  );
}

export default TransactionForm;
