import styled from "styled-components";
import TransactionBox from "./TransactionBox";
import TransferBox from "./TransferBox";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.utilGap};
`;

function AccountForm() {
  return (
    <Form>
      <TransferBox />
      <TransactionBox />
    </Form>
  );
}

export default AccountForm;
