import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;

  border-top: 10px solid ${({ theme }) => theme.color.primary};
  background-color: #fff;
  padding: 10px 3.2rem 6px 3.2rem;
`;

const Text = styled.p`
  color: ${({ theme }) => theme.color.primaryMid};
  text-align: center;
  font-size: 1.6rem;
`;

function Footer() {
  return (
    <Container>
      <Text>Built by Bryan Turner</Text>
    </Container>
  );
}

export default Footer;
