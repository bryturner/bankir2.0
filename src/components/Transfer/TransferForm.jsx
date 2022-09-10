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
import { appendAmount } from "../../constants/helpers";

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
  const [transferDesc, setTransferDesc] = useState("");
  const [transferToOther, setTransferToOther] = useState("");
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});

  const formRef = useRef();

  const reset = () => {
    formRef.current.reset();
    setAmount("");
    setDate(new Date().toISOString().slice(0, 10));
    setTransferFrom("standard");
    setTransferTo("premium");
    setTransferDesc("");
    setTransferToOther("");
  };

  const updateTransferValues = (value) => {
    setTransferFrom(value);

    if (transferTo === "otherUser") return;

    if (value === "premium") {
      setTransferTo("standard");
    } else {
      setTransferTo("premium");
    }
  };

  const handleInitialSubmit = () => {
    const transferToValue =
      transferTo === "otherUser" ? transferToOther : transferTo;

    const updatedAmount = appendAmount(amount);

    const modData = {
      amount: updatedAmount,
      transferFrom: transferFrom,
      transferTo: transferToValue,
    };

    console.log(modData);
    setModalData(modData);
    setShowModal(true);
  };

  const submitTransfer = async (e) => {
    e.preventDefault();

    try {
      const transferToValue =
        transferTo === "otherUser" ? transferToOther : transferTo;

      const data = {
        amount: amount,
        date: date,
        description: transferDesc,
        type: "transfer",
        transferFrom: transferFrom,
        transferTo: transferToValue,
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
            onChange={(e) => updateTransferValues(e.target.value)}
          >
            <Option value="standard" title="Standard Account" />
            <Option value="premium" title="Premium Account" />
          </SelectOption>

          <SelectOption
            formName="transferForm"
            id="transferTo"
            labelText="Transfer to:"
            defaultValue={transferTo}
            onChange={(e) => setTransferTo(e.target.value)}
          >
            {transferFrom === "standard" ? (
              <>
                <Option value="premium" title="Premium Account" />
                <Option value="otherUser" title="Another User" />
              </>
            ) : (
              <>
                <Option value="standard" title="Standard Account" />
                <Option value="otherUser" title="Another User" />
              </>
            )}
          </SelectOption>

          {transferTo === "otherUser" ? (
            <TransferOtherInput
              formName="transferForm"
              id="otherUser"
              placeholder="Enter username"
              value={transferToOther}
              onChange={(e) => setTransferToOther(e.target.value)}
            />
          ) : (
            <></>
          )}

          <DescriptionInput
            formName="transferForm"
            id="transferDesc"
            placeholder="ex. monthly savings"
            value={transferDesc}
            onChange={(e) => setTransferDesc(e.target.value)}
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
              setAmount={setAmount}
            />
          </Flex>
        </StyledFormInputs>

        <ButtonContainer>
          <ErrorMessage error={error} />
          <TransferFormButton onClick={handleInitialSubmit} />
        </ButtonContainer>
      </DetailsBox>
    </form>
  );
}

export default TransferForm;
