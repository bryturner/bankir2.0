import styled from "styled-components";
import AmountInput from "./AmountInput";
import DateInput from "./DateInput";

const Flex = styled.div`
  display: flex;
  gap: 2rem;
`;

function AccountInputs({ formName, dateId, amountId }) {
  return (
    <Flex>
      <DateInput formName={formName} id={dateId} />
      <AmountInput formName={formName} id={amountId} />
    </Flex>
  );
}

export default AccountInputs;
