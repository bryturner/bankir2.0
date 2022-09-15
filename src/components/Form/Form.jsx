import styled from "styled-components";
const FormStyled = styled.form`
  background-color: #fff;
  box-shadow: 0 0.6rem 3rem rgba(0, 0, 0, 0.1);
  height: fit-content;
  justify-self: center;
  padding: 2.4rem 3.6rem;
  width: 100%;

  > button {
    display: block;
    width: 100%;
  }
`;

const Header = styled.h2`
  font-size: 3rem;
  font-weight: 500;
  margin-bottom: 1.4rem;
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
