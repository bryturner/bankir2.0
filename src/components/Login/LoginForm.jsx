import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { PATH } from "../../constants/paths";
import AuthContext from "../../contexts/AuthContext";
import LoginButton from "../Button/LoginButton";

const Form = styled.form`
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

const InputWrapper = styled.div``;

const Input = styled.input`
  width: 100%;
  margin-bottom: 8px;
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
    }
  }
  return (
    <Form onSubmit={login}>
      <Header>Log In</Header>
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

      <LoginButton />
      <TextWrapper>
        <Text>Don't have an account yet?</Text>
        <Link to={PATH.REGISTER}>Register here</Link>
      </TextWrapper>
    </Form>
  );
}

export default LoginForm;
