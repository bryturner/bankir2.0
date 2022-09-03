import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Label = styled.label`
  font-size: 1.4rem;
`;

const Input = styled.input`
  padding: 6px 12px;
  border: 1px solid ${({ theme }) => theme.color.lightGray};
  border-radius: 3px;
  color: ${({ theme }) => theme.color.lightGray};
`;

const formatDate = (year) => {
  const dtToday = new Date();
  const dateRange = dtToday.setFullYear(dtToday.getFullYear() + year);
  return new Date(dateRange).toISOString().split("T")[0];
};

function DateInput({ name, id }) {
  const maxDate = formatDate(1);
  const minDate = formatDate(-1);

  return (
    <Container>
      <Label htmlFor={id}>Date:</Label>
      <Input type="date" name={name} id={id} max={maxDate} min={minDate} />
    </Container>
  );
}

export default DateInput;
