import styled from "styled-components";
import { useReducer, useState } from "react";
import TransferFormButton from "../Button/TransferFormButton";
import DetailsBox from "../DetailsBox/DetailsBox";
import AmountInput from "../Input/AmountInput";
import DateInput from "../Input/DateInput";
import AccountOptions from "../SelectOption/AccountOptions";
import SelectOption from "../SelectOption/SelectOption";
import TempForm from "./TempForm";
import Option from "../SelectOption/Option";

const Flex = styled.div`
  display: flex;
  gap: 2rem;
`;

function TransferForm() {
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [transferFrom, setTransferFrom] = useState("standard");
  const [transferTo, setTransferTo] = useState("premium");

  const test = (e) => {
    e.preventDefault();

    const data = {
      transferFrom: transferFrom,
      transferTo: transferTo,
      date: date,
      amount: amount,
    };

    console.log(data);
  };

  return (
    <TempForm onSubmit={test} id="transferForm">
      <DetailsBox header="Transfer Money">
        <SelectOption
          formName="transferForm"
          id="transferFrom"
          labelText="Transfer from:"
          defaultValue={transferFrom}
          onChange={(e) => setTransferFrom(e.target.value)}
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
              <Option value="otherUser" title="Other User" />
            </>
          ) : (
            <>
              <Option value="standard" title="Standard Account" />
              <Option value="otherUser" title="Other User" />
            </>
          )}
        </SelectOption>

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
    </TempForm>
  );
}

export default TransferForm;
