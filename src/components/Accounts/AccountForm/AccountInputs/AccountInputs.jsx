import styled from "styled-components";
import AmountInput from "./AmountInput";
import DateInput from "./DateInput";

const Flex = styled.div`
  display: flex;
  gap: 2rem;
`;

function AccountInputs({ dateId, amountId }) {
  return (
    <Flex>
      <DateInput name="accountForm" id={dateId} />
      <AmountInput name="accountForm" id={amountId} />
    </Flex>
  );
}

export default AccountInputs;
