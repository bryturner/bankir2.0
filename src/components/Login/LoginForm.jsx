import styled from "styled-components";
import LoginButton from "./LoginButton";

const Form = styled.form`
  width: 100%;
  justify-self: center;
  padding: 4.8rem 4.8rem 4rem 4.8rem;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 0.6rem 3.6rem rgba(0, 0, 0, 0.15);

  > button {
    width: 100%;
    display: block;
  }
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  margin-bottom: 2.4rem;

  &:last-of-type {
    margin-bottom: 4.8rem;
  }
`;

const Input = styled.input`
  font-size: 1.6rem;
  padding: 0.6rem 0;
  border-radius: 3px;
`;

function LoginForm() {
  return (
    <Form>
      <Label htmlFor="userId">
        User ID
        <Input type="text" id="userId" />
      </Label>
      <Label htmlFor="password">
        Password
        <Input type="password" id="password" />
      </Label>
      <LoginButton />
    </Form>
  );
}

export default LoginForm;
