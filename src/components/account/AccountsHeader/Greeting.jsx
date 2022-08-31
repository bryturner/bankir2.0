import styled from "styled-components";

const Container = styled.div``;

const Header = styled.h2`
  font-size: ${({ theme }) => theme.heading.secondary};
`;

const Date = styled.p``;

function Greeting({ firstName }) {
  return (
    <Container>
      <Header>Welcome {firstName}</Header>
      <Date>Aug 28</Date>
    </Container>
  );
}

export default Greeting;
