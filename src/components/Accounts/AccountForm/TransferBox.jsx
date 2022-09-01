import styled from "styled-components";
import AccountFormButton from "./AccountFormButton";
import AccountInputs from "./AccountInputs/AccountInputs";
import AccountOption from "./AccountOption";
import FormBox from "./FormBox";

const SelectWrapper = styled.div``;

const Label = styled.label`
  font-size: 1.4rem;
`;

const Select = styled.select`
  padding: 0.6rem 0;
  border-radius: 3px;
  width: 100%;
`;

function TransferBox() {
  return (
    <FormBox header="Transfer Money">
      <SelectWrapper>
        <Label htmlFor="transferFrom">Transfer from:</Label>
        <Select name="accountForm" id="transferFrom">
          <AccountOption value="standard" title="Standard Account" />
          <AccountOption value="premium" title="Premium Account" />
        </Select>
      </SelectWrapper>
      <SelectWrapper>
        <Label htmlFor="transferTo">Transfer to:</Label>
        <Select name="accountForm" id="transferTo">
          <AccountOption value="standard" title="Standard Account" />
          <AccountOption value="premium" title="Premium Account" />
          <AccountOption value="otherUser" title="Other User" />
        </Select>
      </SelectWrapper>

      <AccountInputs dateId="transferDate" amountId="transferAmount" />

      <AccountFormButton text="Submit Transfer" />
    </FormBox>
  );
}

export default TransferBox;
