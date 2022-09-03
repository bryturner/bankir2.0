import styled from "styled-components";
import AccountFormButton from "../Button/AccountFormButton";
import AccountInputs from "../Account/AccountInputs/AccountInputs";
import AccountOption from "../Account/AccountOption";
import DescriptionInput from "../Account/AccountInputs/DescriptionInput";
import DetailsBox from "./DetailsBox";

const SelectWrapper = styled.div``;

const Label = styled.label`
  font-size: 1.4rem;
`;

const Select = styled.select`
  padding: 0.6rem 0;
  border-radius: 3px;
  width: 100%;
`;

function TransactionBox({ formName }) {
  return (
    <DetailsBox header="Record a Transaction">
      <SelectWrapper>
        <Label htmlFor="transactionType">Transaction type:</Label>
        <Select formName={formName} id="transactionType">
          <AccountOption value="deposit" title="Deposit" />
          <AccountOption value="withdrawal" title="Withdrawal" />
        </Select>
      </SelectWrapper>
      <SelectWrapper>
        <Label htmlFor="transactionAccount">Choose an account:</Label>
        <Select formName={formName} id="transactionAccount">
          <AccountOption value="standard" title="Standard Account" />
          <AccountOption value="premium" title="Premium Account" />
        </Select>
      </SelectWrapper>

      <DescriptionInput formName={formName} id="transactionDesc" />

      <AccountInputs
        formName={formName}
        dateId="transactionDate"
        amountId="transactionAmount"
      />

      <AccountFormButton text="Submit Transaction" />
    </DetailsBox>
  );
}

export default TransactionBox;
