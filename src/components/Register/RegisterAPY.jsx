import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  background-color: ${({ theme }) => theme.color.secondary};
  padding: 3rem 2rem;
  border-radius: 5px;
  box-shadow: 0 0.6rem 3rem rgba(0, 0, 0, 0.1);

  > p {
    color: white;
  }
`;

const Account = styled.p`
  font-size: 1.6rem;
`;

const APY = styled.p`
  font-size: 5rem;
  line-height: normal;
`;

const Percent = styled.span`
  font-size: 2.6rem;
  vertical-align: top;
`;

const Text = styled.p``;

function RegisterAPY({ account, apy }) {
  return (
    <Container>
      <Account>{account}</Account>
      <APY>
        {apy}
        <Percent>%</Percent>
      </APY>
      <Text>Annual percentage yield</Text>
    </Container>
  );
}

export default RegisterAPY;
