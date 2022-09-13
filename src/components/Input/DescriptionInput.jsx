import styled from "styled-components";
import Input from "./Input";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.p`
  font-size: 1.4rem;
`;

const Label = styled.label`
  > input {
    width: 100%;
  }
`;

function DescriptionInput({ formName, id, value, onChange, placeholder }) {
  return (
    <Container>
      <Title>Description:</Title>
      <Label htmlFor={id}>
        <Input
          type="text"
          name={formName}
          id={id}
          maxLength={35}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </Label>
    </Container>
  );
}

export default DescriptionInput;
