import styled from "styled-components";
import LoginForm from "../components/Login/LoginForm";
import { LandingLayout } from "../constants/styles";
import { Link } from "react-router-dom";
import { PATH } from "../constants/paths";

const Container = styled.div`
  align-self: center;
  display: flex;
  flex-direction: column;
  gap: 3rem;

  > a {
    background-color: ${({ theme }) => theme.color.secondary};
    border: 2px solid ${({ theme }) => theme.color.secondary};
    border-radius: 3px;
    color: white;
    font-size: 1.8rem;
    margin-top: 2rem;
    margin-left: 1rem;
    padding: 1rem 6rem;
    text-decoration: none;
    transition: all 0.1s linear;
    width: fit-content;

    &:hover {
      background-color: ${({ theme }) => theme.color.primaryLight};
      color: ${({ theme }) => theme.color.secondary};
    }
  }
`;

const Heading = styled.h1`
  font-size: ${({ theme }) => theme.heading.primary};
  letter-spacing: -1px;
  line-height: 1.05;

  > span {
    color: ${({ theme }) => theme.color.secondary};
  }
`;

const Subheading = styled.p`
  font-size: ${({ theme }) => theme.heading.sub};
`;

function LoginPage() {
  return (
    <LandingLayout>
      <Container>
        <Heading>
          Make <span>investing</span> in your <span>future</span> count
        </Heading>
        <Subheading>
          High interest rates, a user-friendly online platform and excellent
          customer service make choosing BankIR an easy decision.
        </Subheading>
        <Link to={PATH.REGISTER}>Sign Up Today</Link>
      </Container>
      <LoginForm />
    </LandingLayout>
  );
}

export default LoginPage;
