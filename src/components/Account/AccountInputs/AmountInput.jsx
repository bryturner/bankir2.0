import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Label = styled.label`
  font-size: 1.4rem;
  /* border: 1px solid #777;
  border-radius: 3px; */
`;

const InputWrapper = styled.div`
  border: 1px solid ${({ theme }) => theme.color.lightGray};
  border-radius: 3px;
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

  > input::-webkit-inner-spin-button,
  input::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  > input[type="number"] {
    -moz-appearance: textfield;
  }
`;

const Input = styled.input`
  border: none;
  width: 100%;
  height: 100%;
  padding-left: 1.8rem;
  font-size: 1.4rem;
`;

function AmountInput({ formName, id }) {
  return (
    <Container>
      <Label htmlFor={id}>Amount:</Label>
      <InputWrapper>
        {/* <Input type="number" name={name} id={id} placeholder="0.00" /> */}
        <Input
          type="text"
          inputMode="numeric"
          pattern="\d*"
          name={formName}
          id={id}
          placeholder="0.00"
        />
      </InputWrapper>
    </Container>
  );
}

export default AmountInput;
