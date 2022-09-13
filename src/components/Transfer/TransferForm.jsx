import styled from "styled-components";
import axios from "axios";
import { useRef, useState } from "react";

import AmountInput from "../Input/AmountInput";
import DateInput from "../Input/DateInput";
import DescriptionInput from "../Input/DescriptionInput";
import SelectOption from "../SelectOption/SelectOption";
import DetailsBox from "../DetailsBox/DetailsBox";
import Option from "../SelectOption/Option";
import TransferOtherInput from "./TransferOtherInput";
import TransferFormModal from "./TransferFormModal";
import TransferFormButton from "./TransferFormButton";
import StyledFormInputs from "../StyledComponents/StyledFormInputs";
import ErrorMessage from "../Messages/ErrorMessage";
import { createModalAmount, formatAmount } from "../../constants/helpers";

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

function TransferForm({ fetchAccountData }) {
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [transferFrom, setTransferFrom] = useState("standard");
  const [transferTo, setTransferTo] = useState("premium");
  const [toValue, setToValue] = useState("premium");
  const [description, setDescription] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [showOther, setShowOther] = useState(false);

  const [error, setError] = useState("");
  const [amountIsValid, setAmountIsValid] = useState(true);
  const [otherIsValid, setOtherIsValid] = useState(true);
  const [descIsValid, setDescIsValid] = useState(true);

  const formRef = useRef();

  const reset = () => {
    formRef.current.reset();
    setAmount("");
    setDate(new Date().toISOString().slice(0, 10));
    setTransferFrom("standard");
    setTransferTo("premium");
    setToValue("premium");
    setDescription("");
  };

  const handleTransferFromChange = (e) => {
    const value = e.target.value;
    setTransferFrom(value);
    if (transferTo === "otherUser") return;
    if (value === "premium") {
      setTransferTo("standard");
    } else {
      setTransferTo("premium");
    }
  };

  const handleTransferToChange = (e) => {
    const value = e.target.value;
    if (value === "otherUser") {
      setShowOther(true);
      setToValue("");
    } else {
      setShowOther(false);
      setToValue(value);
    }
  };

  const handleOtherChange = (e) => {
    const value = e.target.value;
    if (e.target.validity.patternMismatch) {
      setError("Username contains lower case or numbers only");
      setOtherIsValid(false);
    } else {
      setError("");
      setOtherIsValid(true);
    }
    setToValue(value);
  };

  const handleDescChange = (e) => {
    const value = e.target.value;
    if (value.length > 0) {
      setError("");
      setDescIsValid(true);
    }
    setDescription(value);
  };

  const handleAmountChange = (e) => {
    const formattedAmount = formatAmount(e.target.value);
    if (parseFloat(formattedAmount) > 2000) {
      setError("Maximum transfer amount is $2,000");
      setAmountIsValid(false);
    } else if (parseFloat(formattedAmount) < 1) {
      setError("Minimum transfer amount is $1.00");
      setAmountIsValid(false);
    } else {
      setError("");
      setAmountIsValid(true);
    }
    setAmount(formattedAmount);
  };

  const checkIfValid = () => {
    return new Promise((resolve, reject) => {
      if (amount.length === 0) {
        setError("Please fill in an amount");
        setAmountIsValid(false);
        return;
      } else if (toValue.length === 0) {
        setError("Please enter a username");
        setOtherIsValid(false);
        return;
      } else if (description.length === 0) {
        setError("Please enter a description");
        setDescIsValid(false);
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

    const modData = {
      amount: modalAmount,
      transferFrom: transferFrom,
      transferTo: toValue,
    };

    setModalData(modData);
    setShowModal(true);
  };

  const handleInitSubmit = () => {
    checkIfValid().then(() => modal());
  };

  const submitTransfer = async (e) => {
    e.preventDefault();

    try {
      const data = {
        amount: amount,
        date: date,
        description: description,
        type: "transfer",
        transferFrom: transferFrom,
        transferTo: toValue,
      };

      // console.log(data);

      // let res;
      // if (transferTo === "otherUser") {
      //   res = await axios.put(
      //     "http://localhost:5002/account/transferToOther",
      //     data
      //   );
      // } else {
      //   res = await axios.put(
      //     "http://localhost:5002/account/transferToSame",
      //     data
      //   );
      // }
      // console.log(res.data);
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
    <form onSubmit={submitTransfer} id="transferForm" ref={formRef}>
      <TransferFormModal
        modalData={modalData}
        showModal={showModal}
        setShowModal={setShowModal}
      />
      <DetailsBox header="Transfer Money">
        <StyledFormInputs>
          <SelectOption
            formName="transferForm"
            id="transferFrom"
            labelText="Transfer from:"
            defaultValue={transferFrom}
            onChange={handleTransferFromChange}
          >
            <Option
              dataTestId="transfer-from-standard"
              value="standard"
              title="Standard Account"
            />
            <Option
              dataTestId="transfer-from-premium"
              value="premium"
              title="Premium Account"
            />
          </SelectOption>

          <SelectOption
            formName="transferForm"
            id="transferTo"
            labelText="Transfer to:"
            defaultValue={transferTo}
            onChange={handleTransferToChange}
          >
            {transferFrom === "standard" ? (
              <>
                <Option
                  dataTestId="transfer-to-premium"
                  value="premium"
                  title="Premium Account"
                />
                <Option value="otherUser" title="Another User" />
              </>
            ) : (
              <>
                <Option
                  dataTestId="transfer-to-standard"
                  value="standard"
                  title="Standard Account"
                />
                <Option value="otherUser" title="Another User" />
              </>
            )}
          </SelectOption>

          {showOther ? (
            <TransferOtherInput
              formName="transferForm"
              id="otherUser"
              placeholder="Enter username"
              value={toValue}
              onChange={handleOtherChange}
              setError={setError}
              otherIsValid={otherIsValid}
            />
          ) : (
            <></>
          )}

          <DescriptionInput
            formName="transferForm"
            id="transferDesc"
            placeholder="ex. monthly savings deposit"
            value={description}
            onChange={handleDescChange}
            descIsValid={descIsValid}
          />

          <Flex>
            <DateInput
              formName="transferForm"
              id="transferDate"
              defaultValue={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <AmountInput
              formName="transferForm"
              id="transferAmount"
              value={amount}
              onChange={handleAmountChange}
              amountIsValid={amountIsValid}
            />
          </Flex>
        </StyledFormInputs>

        <ButtonContainer>
          <ErrorMessage error={error} />
          <TransferFormButton onClick={handleInitSubmit} />
        </ButtonContainer>
      </DetailsBox>
    </form>
  );
}

export default TransferForm;
