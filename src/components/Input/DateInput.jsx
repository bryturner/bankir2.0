import styled from "styled-components";
import Input from "./Input";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  > input {
    padding: 6px 12px;
    border: 1px solid ${({ theme }) => theme.color.lightGray};
    border-radius: 3px;
    color: ${({ theme }) => theme.color.lightGray};
  }
`;

const Label = styled.label`
  font-size: 1.4rem;
`;

const formatDate = (year) => {
  const dtToday = new Date();
  const dateRange = dtToday.setFullYear(dtToday.getFullYear() + year);
  return new Date(dateRange).toISOString().split("T")[0];
};

function DateInput({ formName, id, defaultValue, onChange }) {
  const maxDate = formatDate(1);
  const minDate = formatDate(-1);

  return (
    <Container>
      <Label htmlFor={id}>Date:</Label>
      <Input
        type="date"
        name={formName}
        id={id}
        max={maxDate}
        min={minDate}
        defaultValue={defaultValue}
        onChange={onChange}
      />
    </Container>
  );
}

export default DateInput;
