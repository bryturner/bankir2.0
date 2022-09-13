import { useRef, useState } from "react";
import styled from "styled-components";
import Input from "../Input/Input";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label``;

const OtherInput = styled.input`
  width: 100%;
  border-color: ${(props) =>
    props.isValid ? props.theme.color.lightGray : props.theme.color.error};

  box-shadow: ${(props) =>
    props.isValid ? "none" : props.theme.boxShadow.error};
`;

function TransferOtherInput({
  formName,
  id,
  value,
  placeholder,
  setTransferToOther,
  setError,
}) {
  const [isValid, setIsValid] = useState(true);

  const handleToOtherChange = (e) => {
    setTransferToOther(e.target.value);
    if (e.target.validity.patternMismatch) {
      setError("Username contains lower case or numbers only");
    } else {
      setError("");
    }
  };

  //   const handleBlur = (e) => {
  //     if (e.target.value.length === 0) {
  //       setError("Please enter a username");
  //       setIsValid(false);
  //     } else {
  //       setError("");
  //       setIsValid(true);
  //     }
  //   };

  return (
    <Container>
      <Label htmlFor={id}>
        <OtherInput
          isValid={isValid}
          dataTestId="otherInput"
          type="text"
          name={formName}
          id={id}
          pattern="[a-z]*\d*"
          title="Use lower case letters or numbers only"
          maxLength={10}
          placeholder={placeholder}
          value={value}
          onChange={handleToOtherChange}
        />
      </Label>
    </Container>
  );
}

export default TransferOtherInput;
