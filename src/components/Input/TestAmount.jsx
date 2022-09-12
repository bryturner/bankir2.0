import { useState } from "react";
import styled from "styled-components";
import Input from "./Input";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Label = styled.label`
  font-size: 1.4rem;
`;

const InputWrapper = styled.div`
  position: relative;
  flex: 1;

  &::before {
    content: "$";
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 5px;
    font-size: 1.4rem;
    font-weight: 300;
  }

  > input {
    width: 100%;
    height: 100%;
    padding-left: 1.8rem;
    font-size: 1.4rem;
  }
`;

// \d -> number
// \.(?=\d{2}) -> decimal before 2 numbers
function TestAmount({ formName, id }) {
  const [val, setVal] = useState("0.00");

  function formatAmount(e) {
    const amount = e.target.value;

    let formattedAmount = amount
      // .replace(/^0+/, "") // removes starting 0
      .replace(/(?!\.)\D/g, "") // removes letters
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",") // adds comma
      .replace(/(?<=\..*)\./g, "") // replaces '.' if more than one
      .replace(/(?<=\.\d{2}).*/g, "");

    console.log(formattedAmount.split("."));

    if (formattedAmount.split(".")[1][0] === "0") {
    }

    setVal(formattedAmount);
    //  console.log(formattedAmount);
  }

  return (
    <Container>
      <Label htmlFor={id}>Amount:</Label>
      <InputWrapper>
        <Input
          type="text"
          inputMode="numeric"
          name={formName}
          id={id}
          placeholder="0.00"
          maxLength={8}
          value={val}
          onChange={formatAmount}
        />
      </InputWrapper>
    </Container>
  );
}

export default TestAmount;
