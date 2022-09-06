import styled from "styled-components";
import RegisterForm from "../components/Form/RegisterForm";
import { LandingLayout } from "../constants/styles";

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

function RegisterPage() {
  return (
    <LandingLayout>
      <div>
        <Heading>
          Make <span>investing</span> in your <span>future</span> count
        </Heading>
        <Subheading>
          Consistently high interest rates and excellent customer service will
          keep your mind at ease and make retiring early a breeze.
        </Subheading>
      </div>
      <RegisterForm />
    </LandingLayout>
  );
}

export default RegisterPage;
