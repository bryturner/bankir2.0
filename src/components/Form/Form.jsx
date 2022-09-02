import styled from "styled-components";
const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2.6rem;
  width: 100%;
  justify-self: center;
  padding: 4rem 3.6rem;
  background-color: #fff;
  box-shadow: 0 0.6rem 3rem rgba(0, 0, 0, 0.1);

  > button {
    width: 100%;
    display: block;
  }
`;

const Header = styled.h2`
  font-size: 3rem;
  font-weight: 500;
  text-align: center;
`;

function Form({ onSubmit, header, children }) {
  return (
    <FormStyled onSubmit={onSubmit}>
      <Header>{header}</Header>
      {children}
    </FormStyled>
  );
}

export default Form;
