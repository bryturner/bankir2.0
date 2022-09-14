import { forwardRef } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label``;

const OtherInput = styled.input`
  width: 100%;
  &:focus {
    border-color: ${(props) =>
      props.otherIsValid
        ? props.theme.color.secondary
        : props.theme.color.error};

    box-shadow: ${(props) =>
      props.otherIsValid
        ? props.theme.boxShadow.focus
        : props.theme.boxShadow.error};
  }
`;

const TransferOtherInput = forwardRef(
  ({ formName, id, value, placeholder, onChange, otherIsValid }, ref) => {
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
            ref={ref}
          />
        </Label>
      </Container>
    );
  }
);

export default TransferOtherInput;
