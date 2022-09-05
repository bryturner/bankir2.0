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
  > input,
  input:valid {
    padding: 0.6rem;
    border: 1px solid #777;
    border-radius: 3px;
    width: 100%;
  }

  > input:focus {
    outline: none;
    border-color: ${({ theme }) => theme.color.secondary};
    box-shadow: 0 0 0 1px ${({ theme }) => theme.color.secondary};
  }

  > input:invalid {
    border-color: red;
    box-shadow: 0 0 0 1px red;
    color: red;
  }
`;

function DescriptionInput({ formName, id, value, onChange }) {
  return (
    <Container>
      <Title>Description:</Title>
      <Label htmlFor={id}>
        <Input
          type="text"
          name={formName}
          id={id}
          maxLength={30}
          value={value}
          onChange={onChange}
          pattern="\w*"
        />
      </Label>
    </Container>
  );
}

export default DescriptionInput;
