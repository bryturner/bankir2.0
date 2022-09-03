import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.p`
  font-size: 1.4rem;
`;

const Label = styled.label``;

const Input = styled.input`
  padding: 0.6rem;
  border: 1px solid #777;
  border-radius: 3px;
  width: 100%;
`;

function DescriptionInput({ formName, id }) {
  return (
    <Container>
      <Title>Description:</Title>
      <Label htmlFor={id}>
        <Input type="text" name={formName} id={id} maxLength={30} />
      </Label>
    </Container>
  );
}

export default DescriptionInput;
