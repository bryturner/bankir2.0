import axios from "axios";
import { useState } from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BASE_URL, PATH } from "../../constants/paths";
import AuthContext from "../../contexts/AuthContext";
import RegisterButton from "./RegisterButton";
import ErrorMessage from "../Messages/ErrorMessage";
import Form from "../Form/Form";
import { ERROR } from "../../constants/clientMessages";

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  margin-bottom: 8px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Label = styled.label`
  font-size: 1.6rem;
  margin-left: 4px;
`;

const Input = styled.input`
  font-size: 1.6rem;
  width: 100%;
`;

const ButtonContainer = styled.div`
  > button {
    display: block;
    margin-bottom: 1rem;
    width: 100%;
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

// const initialState = {
//   firstName: "",
//   username: "",
//   password: "",
//   passwordVerify: "",
// };

// const reducer = (state, action) => {
//   switch (action.type) {
//     case "update":
//       return {
//         ...state,
//         [action.payload.key]: action.payload.value,
//       };
//     default:
//       throw new Error(`Unknown action type: ${action.type}`);
//   }
// };

function RegisterForm() {
  //   const [state, dispatch] = useReducer(reducer, initialState);
  const [firstName, setFirstName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerify, setPasswordVerify] = useState("");
  const [error, setError] = useState("");
  const { getIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  //   const inputAction = (e) => {
  //     dispatch({
  //       type: "update",
  //       payload: { key: e.target.id, value: e.target.value },
  //     });
  //   };

  const handleFirstNameChange = (e) => {
    if (e.target.validity.patternMismatch) {
      setError(ERROR.REG_FIRSTNAME);
    } else {
      setError("");
    }
    setFirstName(e.target.value);
  };

  const handleUsernameChange = (e) => {
    if (e.target.validity.patternMismatch) {
      setError(ERROR.REG_USERNAME);
    } else {
      setError("");
    }
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    if (e.target.validity.patternMismatch) {
      setError(ERROR.REG_PASSWORD);
    } else {
      setError("");
    }
    setPassword(e.target.value);
  };

  const handlePasswordVerifyChange = (e) => {
    if (e.target.validity.patternMismatch) {
      setError(ERROR.REG_USERNAME);
    } else if (e.target.value !== password) {
      setError("Passwords must match");
    } else {
      setError("");
    }
    setPasswordVerify(e.target.value);
  };

  async function register(e) {
    e.preventDefault();

    const regData = {
      username: username,
      password: password,
      passwordVerify: passwordVerify,
    };

    const acctData = {
      firstName: firstName,
    };

    try {
      await axios.post(`${BASE_URL}auth/register`, regData);

      await getIsLoggedIn();

      await axios.post(`${BASE_URL}account/newAccount`, acctData);

      navigate(PATH.ACCOUNT);
    } catch (err) {
      console.error();
      setError(err.response.data.errorMessage);
    }
  }
  return (
    <Form onSubmit={register} header="Register">
      <InputContainer>
        <InputWrapper>
          <Label htmlFor="firstName">First name*</Label>
          <Input
            type="text"
            id="firstName"
            pattern="[a-zA-Z]*"
            title="Use lower or upper case letters only"
            maxLength={20}
            value={firstName}
            onChange={handleFirstNameChange}
          />
        </InputWrapper>

        <InputWrapper>
          <Label htmlFor="username">Username*</Label>
          <Input
            type="text"
            id="username"
            pattern="[a-z0-9]*"
            title="Use lower case letters and numbers only"
            maxLength={10}
            value={username}
            onChange={handleUsernameChange}
          />
        </InputWrapper>

        <InputWrapper>
          <Label htmlFor="password">Password*</Label>
          <Input
            type="password"
            id="password"
            pattern="\S*"
            title="White space is not allowed in the password"
            value={password}
            onChange={handlePasswordChange}
          />
        </InputWrapper>

        <InputWrapper>
          <Label htmlFor="passwordVerify">Verify password*</Label>
          <Input
            type="password"
            id="passwordVerify"
            pattern="\S*"
            title="White space is not allowed in the password"
            value={passwordVerify}
            onChange={handlePasswordVerifyChange}
          />
        </InputWrapper>
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
