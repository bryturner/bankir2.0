import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BASE_URL, PATH } from "../../constants/paths";
import AuthContext from "../../contexts/AuthContext";
import LoginButton from "./LoginButton";
import ErrorMessage from "../Messages/ErrorMessage";
import Form from "../Form/Form";

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Label = styled.label`
  margin-left: 4px;
  font-size: 1.6rem;
`;

const Input = styled.input`
  width: 100%;
  margin-bottom: 6px;
  font-size: 1.6rem;
`;

const DefaultInfo = styled.p`
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

      await axios.post(`${BASE_URL}auth/login`, data);

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
        <InputWrapper>
          <Label htmlFor="username">Username</Label>
          <div>
            <Input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <DefaultInfo>Default users: user1 or user2</DefaultInfo>
          </div>
        </InputWrapper>

        <InputWrapper>
          <Label htmlFor="password">Password</Label>
          <div>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <DefaultInfo>Default password: password</DefaultInfo>
          </div>
        </InputWrapper>
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
