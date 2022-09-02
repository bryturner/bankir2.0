import axios from "axios";
import { useContext, useReducer, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { PATH } from "../../constants/paths";
import AuthContext from "../../contexts/AuthContext";
import RegisterButton from "../Button/RegisterButton";

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

const Input = styled.input`
  width: 100%;
  margin-bottom: 6px;
  font-size: 1.6rem;
  padding: 0.6rem;
  border-radius: 3px;
  border: 1px solid black;
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

const initialValue = {
  firstName: "",
  username: "",
  password: "",
  passwordVerify: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "update":
      return {
        ...state,
        [action.payload.key]: action.payload.value,
      };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};

function RegisterForm() {
  //   const [password, setPassword] = useState("");
  //   const [username, setUsername] = useState("");

  const [state, dispatch] = useReducer(reducer, initialValue);
  const { getIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const inputAction = (e) => {
    dispatch({
      type: "update",
      payload: { key: e.target.id, value: e.target.value },
    });
  };

  async function register(e) {
    e.preventDefault();

    //  const firstName = state.firstName;
    const username = state.username;
    const password = state.password;
    const passwordVerify = state.passwordVerify;

    try {
      const data = {
        firstName: state.firstName,
        username,
        password,
        passwordVerify,
      };

      await axios.post("http://localhost:5002/auth/register", data);

      await getIsLoggedIn();

      navigate(PATH.ACCOUNT);
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <Form onSubmit={register}>
      <Header>Register</Header>

      <Input
        type="text"
        id="firstName"
        placeholder="First Name"
        value={state.firstName}
        onChange={inputAction}
      />

      <Input
        type="text"
        id="username"
        placeholder="Username"
        value={state.username}
        onChange={inputAction}
      />

      <Input
        type="password"
        id="password"
        placeholder="Password"
        value={state.password}
        onChange={inputAction}
      />

      <Input
        type="password"
        id="passwordVerify"
        placeholder="Re-enter Password"
        value={state.passwordVerify}
        onChange={inputAction}
      />
      <RegisterButton />
      <TextWrapper>
        <Text>Already have an account?</Text>
        <Link to={PATH.LOGIN}>Go to login</Link>
      </TextWrapper>
    </Form>
  );
}

export default RegisterForm;
