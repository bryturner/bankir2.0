import { forwardRef } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Label = styled.label``;

const InputWrapper = styled.div`
  position: relative;
  flex: 1;

  &::before {
    content: "$";
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 5px;
    font-size: inherit;
    font-weight: 300;
  }
`;

const Input = styled.input`
  width: 100%;
  height: 100%;
  padding-left: 1.8rem;
  font-size: inherit;

  &:focus {
    border-color: ${(props) =>
      props.amountIsValid
        ? props.theme.color.secondary
        : props.theme.color.error};

    box-shadow: ${(props) =>
      props.amountIsValid
        ? props.theme.boxShadow.focus
        : props.theme.boxShadow.error};
  }
`;

// \d -> number
// \.(?=\d{2}) -> decimal before 2 numbers
const AmountInput = forwardRef(
  ({ formName, id, value, amountIsValid, onChange }, ref) => {
    return (
      <Container>
        <Label htmlFor={id}>Amount:</Label>
        <InputWrapper>
          <Input
            amountIsValid={amountIsValid}
            type="text"
            inputMode="decimal"
            name={formName}
            id={id}
            placeholder="0.00"
            maxLength={8}
            value={value}
            onChange={onChange}
            ref={ref}
          />
        </InputWrapper>
      </Container>
    );
  }
);

export default AmountInput;
