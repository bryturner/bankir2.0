import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";

import AmountInput from "../Input/AmountInput";
import DateInput from "../Input/DateInput";
import DescriptionInput from "../Input/DescriptionInput";
import SelectOption from "../SelectOption/SelectOption";
import DetailsBox from "../DetailsBox/DetailsBox";
import Option from "../SelectOption/Option";
import TransferOtherInput from "./TransferOtherInput";
import TransferFormModal from "./TransferFormModal";
import TransferFormButton from "./TransferFormButton";

const Flex = styled.div`
  display: flex;
  gap: 2rem;
`;

function TransferForm({ fetchAccountData }) {
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [transferFrom, setTransferFrom] = useState("standard");
  const [transferTo, setTransferTo] = useState("premium");
  const [transferDesc, setTransferDesc] = useState("");
  const [transferToOther, setTransferToOther] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({
    type: "deposit",
    amount: "20.00",
    account: "Savings",
  });

  const reset = () => {
    setAmount("");
    setDate("");
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

    const modData = {
      amount: parseFloat(amount).toFixed(2),
      transferFrom: transferFrom,
      transferTo: transferToValue,
    };

    setModalData(modData);
    setShowModal(true);
  };

  const submitTransfer = async (e) => {
    e.preventDefault();

    const transferToValue =
      transferTo === "otherUser" ? transferToOther : transferTo;

    const data = {
      amount: parseFloat(amount).toFixed(2),
      date: date,
      description: transferDesc,
      type: "transfer",
      transferFrom: transferFrom,
      transferTo: transferToValue,
    };

    console.log(data);
    //  if (transferTo === "otherUser") {
    //    await axios.put("http://localhost:5002/account/transferToOther", {
    //      data,
    //    });
    //  } else {
    //    await axios.put("http://localhost:5002/account/transferToSame", { data });
    //  }

    reset();
    setShowModal(false);
    //  fetchAccountData();
  };

  //   useEffect(() => {
  //     fetchAccountData();
  //   }, [submitTransfer]);

  return (
    <form onSubmit={submitTransfer} id="transferForm">
      <TransferFormModal
        modalData={modalData}
        showModal={showModal}
        setShowModal={setShowModal}
        handleConfirmClick={submitTransfer}
      />
      <DetailsBox header="Transfer Money">
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
              <Option
                value="otherUser"
                title="Another user (Standard Account)"
              />
            </>
          ) : (
            <>
              <Option value="standard" title="Standard Account" />
              <Option
                value="otherUser"
                title="Another user (Standard Account)"
              />
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

        <TransferFormButton onClick={handleInitialSubmit} />
      </DetailsBox>
    </form>
  );
}

export default TransferForm;
