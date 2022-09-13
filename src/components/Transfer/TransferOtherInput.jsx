import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label``;

const OtherInput = styled.input`
  width: 100%;
  border-color: ${(props) =>
    props.otherIsValid ? props.theme.color.lightGray : props.theme.color.error};

  box-shadow: ${(props) =>
    props.otherIsValid ? "none" : props.theme.boxShadow.error};
`;

function TransferOtherInput({
  formName,
  id,
  value,
  placeholder,
  onChange,
  otherIsValid,
}) {
  return (
    <Container>
      <Label htmlFor={id}>
        <OtherInput
          otherIsValid={otherIsValid}
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
