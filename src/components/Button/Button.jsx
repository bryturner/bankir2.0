import styled from "styled-components";

const ButtonStyled = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s linear;
  border-radius: 3px;
  color: #fff;
  font-size: 1.6rem;
  padding: 1.2rem 3.6rem;
  background-image: linear-gradient(to top, #208032, #208032);

  &:active {
    background-image: linear-gradient(to top, #208032, #208032);
  }

  &:hover {
    background-image: linear-gradient(to bottom, #3a994c, #208032);
  }
`;

function Button({ text, type, onClick, value }) {
  return (
    <ButtonStyled type={type} onClick={onClick} value={value}>
      {text}
    </ButtonStyled>
  );
}

export default Button;
