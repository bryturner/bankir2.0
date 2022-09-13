import { useState } from "react";
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

const AmtInput = styled.input`
  width: 100%;
  height: 100%;
  padding-left: 1.8rem;
  font-size: inherit;

  &:focus {
    border-color: ${(props) =>
      props.isValid ? props.theme.color.secondary : props.theme.color.error};

    box-shadow: ${(props) =>
      props.isValid
        ? props.theme.boxShadow.focus
        : props.theme.boxShadow.error};
  }
`;

// \d -> number
// \.(?=\d{2}) -> decimal before 2 numbers
function AmountInput({ formName, id, value, setAmount, setError }) {
  const [isValid, setIsValid] = useState(true);

  const handleChange = (e) => {
    const amount = e.target.value;

    const formattedAmount = amount
      .replace(/^0+/, "") // removes starting 0
      .replace(/(?!\.)\D/g, "") // removes letters
      .replace(/(?<=\..*)\./g, "") // replaces '.' if more than one
      .replace(/(?<=\.\d{2}).*/g, ""); // limits to 2 places after decimal

    if (parseFloat(formattedAmount) > 2000) {
      setError("Maximum amount is $2,000");
      setIsValid(false);
    } else if (parseFloat(formattedAmount) < 1) {
      setError("Minimum amount is $1.00");
      setIsValid(false);
    } else {
      setError("");
      setIsValid(true);
    }

    setAmount(formattedAmount);
  };

  return (
    <Container>
      <Label htmlFor={id}>Amount:</Label>
      <InputWrapper>
        <AmtInput
          isValid={isValid}
          type="text"
          inputMode="decimal"
          name={formName}
          id={id}
          placeholder="0.00"
          maxLength={8}
          value={value}
          onChange={handleChange}
        />
      </InputWrapper>
    </Container>
  );
}

export default AmountInput;
