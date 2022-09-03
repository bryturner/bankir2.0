import styled from "styled-components";
import TransactionBox from "../DetailsBox/TransactionBox";
import TransferBox from "../DetailsBox/TransferBox";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.utilGap};
  margin-bottom: ${({ theme }) => theme.spacing.utilGap};
`;

function AccountForm() {
  return (
    <Form name="accountForm">
      <TransferBox />
      <TransactionBox />
    </Form>
  );
}

export default AccountForm;
