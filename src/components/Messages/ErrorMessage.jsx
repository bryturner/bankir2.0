import styled from "styled-components";

const Text = styled.p`
  padding-left: 6px;
  margin-bottom: 4px;
  font-size: 1.4rem;
  color: ${({ theme }) => theme.color.error};
  visibility: ${(props) => (props.isError !== "" ? "visible" : "hidden")};
`;

function ErrorMessage({ error }) {
  return (
    <Text data-testid="errorMsg" isError={error}>
      *{error}
    </Text>
  );
}

export default ErrorMessage;
