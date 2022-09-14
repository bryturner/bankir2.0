import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

const Text = styled.p`
  color: ${({ theme }) => theme.color.primaryMid};
  font-size: 1.6rem;
`;

const TotalAmount = styled.span`
  font-size: 1.8rem;
`;

function Total({ text, children }) {
  return (
    <Container data-testid="total">
      <Text>{text}</Text>
      <TotalAmount>{children}</TotalAmount>
    </Container>
  );
}

export default Total;
