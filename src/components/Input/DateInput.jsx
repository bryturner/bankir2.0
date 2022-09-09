import styled from "styled-components";
import { formatDate } from "../../constants/helpers";
import Input from "./Input";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  > input {
    padding: 6px 12px;
    border: 1px solid ${({ theme }) => theme.color.lightGray};
    border-radius: 3px;
  }
`;

const Label = styled.label`
  font-size: 1.4rem;
`;

function DateInput({ formName, id, defaultValue, onChange, max }) {
  const minDate = formatDate(-1);

  return (
    <Container>
      <Label htmlFor={id}>Date:</Label>
      <Input
        type="date"
        name={formName}
        id={id}
        max={max}
        min={minDate}
        defaultValue={defaultValue}
        onChange={onChange}
      />
    </Container>
  );
}

export default DateInput;
