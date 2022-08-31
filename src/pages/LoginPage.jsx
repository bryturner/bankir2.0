import styled from "styled-components";
import LoginForm from "../components/Login/LoginForm";

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  padding: 2.4rem 3.2rem 0 3.2rem;
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 9.6rem;
`;

const Wrapper = styled.div``;

const Heading = styled.h1`
  font-size: ${({ theme }) => theme.heading.primary};
  letter-spacing: -1px;
  line-height: 1.05;
  margin-bottom: 3rem;

  > span {
    color: ${({ theme }) => theme.color.secondary};
  }
`;

const Subheading = styled.p`
  font-size: ${({ theme }) => theme.heading.sub};
  margin-bottom: 3.6rem;
`;

function LoginPage() {
  return (
    <Container>
      <Wrapper>
        <Heading>
          Make <span>investing</span> in your <span>future</span> count
        </Heading>
        <Subheading>
          Consistently high interest rates and excellent customer service will
          keep your mind at ease and make retiring early a breeze.
        </Subheading>
      </Wrapper>
      <LoginForm />
    </Container>
  );
}

export default LoginPage;
