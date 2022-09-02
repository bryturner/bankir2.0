import styled from "styled-components";

const Container = styled.div`
  padding: 1rem 0;
  border-bottom: 0.75px solid ${({ theme }) => theme.color.primaryMid};
`;

const Text = styled.p`
  font-size: 1.4rem;
  font-weight: 500;
`;

const Date = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.color.primaryMid}; ;
`;

function Message({ text, date }) {
  return (
    <Container>
      <Text>{text}</Text>
      <Date>{date}</Date>
    </Container>
  );
}

export default Message;
