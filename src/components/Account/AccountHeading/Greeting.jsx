import React from "react";
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

const dt = new Date().toString().slice(0, 21);

function Greeting({ firstName }) {
  return (
    <Container data-testid="greeting">
      <Header data-testid="first-name">Welcome {firstName},</Header>
      <LoginDate data-testid="update">Last update {dt}</LoginDate>
    </Container>
  );
}

export default React.memo(Greeting);
