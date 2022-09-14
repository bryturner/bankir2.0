import styled from "styled-components";
import RegisterAPY from "../components/Register/RegisterAPY";
import RegisterForm from "../components/Register/RegisterForm";
import { LandingLayout } from "../constants/styles";

const Container = styled.div`
  align-self: center;
  display: flex;
  flex-direction: column;
  gap: 3rem;
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

const APYContainer = styled.div`
  align-self: center;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  margin-top: 2rem;
`;

const APYTextContainer = styled.div`
  display: flex;
  gap: 6.4rem;
  justify-content: center;
  width: fit-content;
`;

const Title = styled.p`
  font-size: 2.6rem;
  text-align: center;
`;

function RegisterPage() {
  return (
    <LandingLayout>
      <Container>
        <Heading>
          Make <span>investing</span> in your <span>future</span> count
        </Heading>
        <Subheading>
          With consistently high interest rates you can keep your mind at ease,
          making early retirement an absolute breeze.
        </Subheading>
        <APYContainer>
          <Title>Introductory Interest Rates:</Title>
          <APYTextContainer>
            <RegisterAPY account="Standard Savings" apy="4.5" />
            <RegisterAPY account="Premium Savings" apy="8.5" />
          </APYTextContainer>
        </APYContainer>
      </Container>
      <RegisterForm />
    </LandingLayout>
  );
}

export default RegisterPage;
