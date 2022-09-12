import styled from "styled-components";
import Input from "../Input/Input";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  > input {
    width: 100%;
  }
`;

function TransferOtherInput({ formName, id, value, onChange, placeholder }) {
  return (
    <Container>
      <Label htmlFor={id}>
        <Input
          dataTestId="otherInput"
          type="text"
          name={formName}
          id={id}
          pattern="[a-z]*\d*"
          title="Use lower case letters or numbers only"
          maxLength={10}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </Label>
    </Container>
  );
}

export default TransferOtherInput;
