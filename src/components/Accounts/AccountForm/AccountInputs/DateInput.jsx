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

function DateInput({ name, id }) {
  return (
    <Container>
      <Label htmlFor={id}>Date:</Label>
      <Input type="date" name={name} id={id} />
    </Container>
  );
}

export default DateInput;
