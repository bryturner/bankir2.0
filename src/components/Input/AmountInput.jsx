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

function AmountInput({ formName, id, value, setAmount }) {
  function formatAmount(e) {
    const amount = e.target.value;
    if (amount.startsWith("0")) {
      setAmount("");
      return;
    }

    const updatedAmount = amount
      .replace(/(?!\.)\D/g, "")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      .replace(/(?<=\..*)\./g, "")
      .replace(/(?<=\.\d\d).*/g, "");
    setAmount(updatedAmount);
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
          value={value}
          onChange={formatAmount}
        />
      </InputWrapper>
    </Container>
  );
}

export default AmountInput;
