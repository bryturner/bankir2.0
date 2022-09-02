import styled from "styled-components";

const Container = styled.div``;

const Header = styled.h2`
  font-size: ${({ theme }) => theme.heading.secondary};
  line-height: normal;
`;

const Date = styled.p`
  color: ${({ theme }) => theme.color.primaryMidLight};
  font-size: 1.5rem;
  padding-left: 4px;
`;

// const today = Date.now();

function Greeting({ firstName }) {
  return (
    <Container>
      <Header>Welcome {firstName},</Header>
      <Date>Logged in at </Date>
    </Container>
  );
}

export default Greeting;
