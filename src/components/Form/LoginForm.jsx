import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { PATH } from "../../constants/paths";
import AuthContext from "../../contexts/AuthContext";
import LoginButton from "../Button/LoginButton";
import ErrorMessage from "../Messages/ErrorMessage";
import Form from "./Form";

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.6rem;
`;

const Input = styled.input`
  width: 100%;
  margin-bottom: 6px;
  font-size: 1.6rem;
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
      <InputContainer>
        <div>
          <Input
            type="text"
            id="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <DefaultInfo>Trial users: user1 or user2</DefaultInfo>
        </div>

        <div>
          <Input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <DefaultInfo>Password: password</DefaultInfo>
        </div>
      </InputContainer>

      <ButtonContainer>
        <ErrorMessage error={error} />
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
