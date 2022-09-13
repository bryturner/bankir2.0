import { useState } from "react";
import styled from "styled-components";
import { formatAmount } from "../../constants/helpers";

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

const AmtInput = styled.input`
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
function AmountInput({
  formName,
  id,
  value,
  setAmount,
  amountIsValid,
  setAmountIsValid,
  setError,
}) {
  const checkValidAmount = (amount) => {
    if (amount.startsWith(".")) {
      setError("Minimum amount is $1");
      setAmountIsValid(false);
    } else if (parseFloat(amount) > 2000) {
      setError("Maximum amount is $2000");
      setAmountIsValid(false);
    } else {
      setError("");
      setAmountIsValid(true);
    }
  };

  const handleBlur = (e) => {
    if (e.target.value.length === 0) {
      setError("Please enter an amount");
      setAmountIsValid(false);
    }
    checkValidAmount(e.target.value);
  };

  const handleChange = (e) => {
    const amount = formatAmount(e.target.value);
    setAmount(amount);
    checkValidAmount(amount);
  };

  return (
    <Container>
      <Label htmlFor={id}>Amount:</Label>
      <InputWrapper>
        <AmtInput
          amountIsValid={amountIsValid}
          type="text"
          inputMode="decimal"
          name={formName}
          id={id}
          placeholder="0.00"
          maxLength={8}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </InputWrapper>
    </Container>
  );
}

export default AmountInput;
