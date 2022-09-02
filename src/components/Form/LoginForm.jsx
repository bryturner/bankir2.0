import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { PATH } from "../../constants/paths";
import AuthContext from "../../contexts/AuthContext";
import LoginButton from "../Button/LoginButton";
import Form from "./Form";

const InputWrapper = styled.div`
  /* &:first-child {
    margin-bottom: 2rem;
  } */
`;

const Input = styled.input`
  width: 100%;
  margin-bottom: 6px;
  font-size: 1.6rem;
  padding: 0.6rem;
  border-radius: 3px;
  border: 1px solid black;
`;

const DefaultInfo = styled.p`
  font-size: 1.4rem;
  padding-left: 6px;
  color: ${({ theme }) => theme.color.primaryMid};
`;

const ButtonContainer = styled.div`
  > button {
    width: 100%;
    display: block;
    margin-bottom: 1rem;
  }
`;

const ErrorMessage = styled.p`
  padding-left: 6px;
  margin-bottom: 4px;
  font-size: 1.4rem;
  color: ${({ theme }) => theme.color.error};
  visibility: ${(props) => (props.isError !== "" ? "visible" : "hidden")};
  /* visibility: hidden; */
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  > a {
    font-size: 1.4rem;
    text-align: center;
    text-decoration: none;
  }

  > a:visited {
    color: inherit;
  }

  > a:hover {
    color: ${({ theme }) => theme.color.primaryMid};
    text-decoration: underline;
  }
`;

const Text = styled.p`
  font-size: 1.4rem;
  text-align: center;
`;

function LoginForm() {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const { getIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  async function login(e) {
    e.preventDefault();

    try {
      const data = {
        username,
        password,
      };

      await axios.post("http://localhost:5002/auth/login", data);

      await getIsLoggedIn();

      navigate(PATH.ACCOUNT);
    } catch (err) {
      console.error(err);
      setError(err.response.data.errorMessage);
    }
  }
  return (
    <Form onSubmit={login} header="Log in">
      <InputWrapper>
        <Input
          type="text"
          id="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <DefaultInfo>Trial users: user1 or user2</DefaultInfo>
      </InputWrapper>

      <InputWrapper>
        <Input
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <DefaultInfo>Password: password</DefaultInfo>
      </InputWrapper>

      <ButtonContainer>
        <ErrorMessage isError={error}>*{error}</ErrorMessage>
        <LoginButton />
        <TextWrapper>
          <Text>Don't have an account yet?</Text>
          <Link to={PATH.REGISTER}>Register here</Link>
        </TextWrapper>
      </ButtonContainer>
    </Form>
  );
}

export default LoginForm;
