import styled from "styled-components";

const Container = styled.div``;

const Header = styled.h2`
  font-size: ${({ theme }) => theme.heading.secondary};
  line-height: normal;
`;

const LoginDate = styled.p`
  color: ${({ theme }) => theme.color.primaryMidLight};
  font-size: 1.5rem;
  padding-left: 4px;
`;

function Greeting({ firstName }) {
  const dt = new Date().toString().replace(/g.+/i, "");

  return (
    <Container>
      <Header>Welcome {firstName},</Header>
      <LoginDate>Logged in {dt}</LoginDate>
    </Container>
  );
}

export default Greeting;
