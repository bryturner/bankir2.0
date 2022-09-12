import styled from "styled-components";
import Input from "./Input";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  > input {
    padding: 6px 12px;
  }
`;

const Label = styled.label``;

const formatDate = (year) => {
  const dtToday = new Date();
  const dateRange = dtToday.setFullYear(dtToday.getFullYear() + year);
  return new Date(dateRange).toISOString().slice(0, 10);
};

function DateInput({ formName, id, defaultValue, onChange }) {
  const minDate = formatDate(-1);
  const maxDate = new Date().toISOString().slice(0, 10);

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
