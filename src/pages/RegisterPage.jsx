import styled from "styled-components";
import RegisterForm from "../components/Register/RegisterForm";

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  margin-top: 2.4rem;
`;

function RegisterPage() {
  return (
    <Container>
      <RegisterForm />;
    </Container>
  );
}

export default RegisterPage;
