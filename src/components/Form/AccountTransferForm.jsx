import styled from "styled-components";
import { useState } from "react";
import TransferFormButton from "../Button/TransferFormButton";
import DetailsBox from "../DetailsBox/DetailsBox";
import AmountInput from "../Input/AmountInput";
import DateInput from "../Input/DateInput";
import SelectOption from "../SelectOption/SelectOption";
import TransferForm from "./TransferForm";
import Option from "../SelectOption/Option";
import DescriptionInput from "../Input/DescriptionInput";
import OtherUserInput from "../Input/OtherUserInput";
import { appendAmount } from "../../constants/helpers";

const Flex = styled.div`
  display: flex;
  gap: 2rem;
`;

function AccountTransferForm({ fetchAccountData }) {
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [transferFrom, setTransferFrom] = useState("standard");
  const [transferTo, setTransferTo] = useState("premium");
  const [transferDesc, setTransferDesc] = useState("");
  const [transferToOther, setTransferToOther] = useState("");

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

  const test = (e) => {
    e.preventDefault();

    const transferToValue =
      transferTo === "otherUser" ? transferToOther : transferTo;

    const updatedAmount = appendAmount(amount);

    const data = {
      amount: updatedAmount,
      date: date,
      description: transferDesc,
      type: "transfer",
      transferFrom: transferFrom,
      transferTo: transferToValue,
    };

    if (transferTo === "otherUser") {
      //  transferOther endpoint
    } else {
      // transferSame endpoint
    }

    console.log(data);
    reset();
    //  fetchAccountData()
  };

  return (
    <TransferForm onSubmit={test} id="transferForm">
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
          <OtherUserInput
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

        <TransferFormButton text="Submit Transfer" />
      </DetailsBox>
    </TransferForm>
  );
}

export default AccountTransferForm;
