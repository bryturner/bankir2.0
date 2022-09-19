import styled from "styled-components";
import axios from "axios";
import { useReducer, useRef, useState } from "react";

import { createModalAmount, formatAmount } from "../../constants/helpers";
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
import { ERROR } from "../../constants/clientMessages";
import { BASE_URL } from "../../constants/paths";

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
  const [description, setDescription] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});

  const [error, setError] = useState("");
  const [amountIsValid, setAmountIsValid] = useState(true);
  const [descIsValid, setDescIsValid] = useState(true);

  const amountRef = useRef();
  const descRef = useRef();

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
    setDescription("");
  };

  const handleAmountChange = (e) => {
    const formattedAmount = formatAmount(e.target.value);
    if (parseFloat(formattedAmount) > 2000) {
      setError(ERROR.MAX_AMOUNT);
      setAmountIsValid(false);
    } else if (parseFloat(formattedAmount) < 1) {
      setError(ERROR.MIN_AMOUNT);
      setAmountIsValid(false);
    } else {
      setError("");
      setAmountIsValid(true);
    }
    setAmount(formattedAmount);
  };

  const handleDescChange = (e) => {
    const value = e.target.value;
    if (value.length > 0) {
      setError("");
      setDescIsValid(true);
    }
    setDescription(value);
  };

  const checkIfValid = () => {
    return new Promise((resolve, reject) => {
      if (amount.length === 0) {
        setError(ERROR.AMOUNT);
        setAmountIsValid(false);
        amountRef.current.focus();
        return;
      } else if (description.length === 0) {
        setError(ERROR.DESC);
        setDescIsValid(false);
        descRef.current.focus();
        return;
      } else {
        setError("");
      }
      resolve();
    });
  };

  const modal = () => {
    if (error.length > 0) return;

    const modalAmount = createModalAmount(amount);
    const { transactionType, transactionAccount } = state;

    const modData = {
      amount: modalAmount,
      type: transactionType,
      account: transactionAccount,
    };
    setModalData(modData);
    setShowModal(true);
  };

  const handleInitSubmit = () => {
    checkIfValid().then(() => modal());
  };

  const submitTransaction = async (e) => {
    e.preventDefault();

    try {
      const { transactionType, transactionAccount, transactionDate } = state;

      const data = {
        amount: amount,
        date: transactionDate,
        type: transactionType,
        account: transactionAccount,
        description: description,
      };

      await axios.put(`${BASE_URL}account/transaction`, data);

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
            value={description}
            onChange={handleDescChange}
            descIsValid={descIsValid}
            placeholder="ex. received paycheck"
            ref={descRef}
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
              onChange={handleAmountChange}
              amountIsValid={amountIsValid}
              ref={amountRef}
            />
          </Flex>
        </StyledFormInputs>

        <ButtonContainer>
          <ErrorMessage error={error} />
          <TransactionFormButton onClick={handleInitSubmit} />
        </ButtonContainer>
      </DetailsBox>
    </Form>
  );
}

export default TransactionForm;
