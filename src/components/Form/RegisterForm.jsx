import axios from "axios";
import { useState } from "react";
import { useContext, useReducer } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { PATH } from "../../constants/paths";
import AuthContext from "../../contexts/AuthContext";
import RegisterButton from "../Button/RegisterButton";
import ErrorMessage from "../Messages/ErrorMessage";
import Form from "./Form";

const RequiredText = styled.p`
  font-size: 1.4rem;
  color: ${({ theme }) => theme.color.lightGray};
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Input = styled.input`
  width: 100%;
  font-size: 1.6rem;
`;

const ButtonContainer = styled.div`
  > button {
    width: 100%;
    display: block;
    margin-bottom: 1rem;
  }
`;

// const ErrorMessage = styled.p`
//   padding-left: 6px;
//   margin-bottom: 4px;
//   font-size: 1.4rem;
//   color: ${({ theme }) => theme.color.error};
//   visibility: ${(props) => (props.isError !== "" ? "visible" : "hidden")};
// `;

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

const initialState = {
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
  const [state, dispatch] = useReducer(reducer, initialState);
  const [error, setError] = useState("");
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

    const regData = {
      username: state.username,
      password: state.password,
      passwordVerify: state.passwordVerify,
    };

    const acctData = {
      firstName: state.firstName,
    };

    try {
      await axios.post("http://localhost:5002/auth/register", regData);

      await getIsLoggedIn();

      await axios.post("http://localhost:5002/account/newAccount", acctData);

      navigate(PATH.ACCOUNT);
    } catch (err) {
      console.error();
      setError(err.response.data.errorMessage);
    }
  }
  return (
    <Form onSubmit={register} header="Register">
      <RequiredText>* Required</RequiredText>
      <InputContainer>
        <Input
          type="text"
          id="firstName"
          placeholder="First name*"
          pattern="[a-zA-Z]*"
          title="Use lower or upper case letters only"
          maxLength={20}
          value={state.firstName}
          onChange={inputAction}
        />

        <Input
          type="text"
          id="username"
          placeholder="Username*"
          pattern="[a-z]*\d*"
          title="Use lower case letters or numbers only"
          maxLength={10}
          value={state.username}
          onChange={inputAction}
        />

        <Input
          type="password"
          id="password"
          placeholder="Password*"
          pattern="\S*"
          title="White space is not allowed in the password"
          value={state.password}
          onChange={inputAction}
        />

        <Input
          type="password"
          id="passwordVerify"
          placeholder="Re-enter password*"
          pattern="\S*"
          title="White space is not allowed in the password"
          value={state.passwordVerify}
          onChange={inputAction}
        />
      </InputContainer>

      <ButtonContainer>
        <ErrorMessage error={error} />
        <RegisterButton />
        <TextWrapper>
          <Text>Already have an account?</Text>
          <Link to={PATH.LOGIN}>Log in here</Link>
        </TextWrapper>
      </ButtonContainer>
    </Form>
  );
}

export default RegisterForm;
