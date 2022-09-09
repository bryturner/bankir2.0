import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

function StyledFormInputs({ children }) {
  return <Container>{children}</Container>;
}

export default StyledFormInputs;
