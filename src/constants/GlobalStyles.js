import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box; }

html {
  font-size: 62.5%; }

body {
  font-family: "Rubik", sans-serif;
  font-size: 1.6rem;
  line-height: 1.6;
  color: #0e1b3a; 
  /* primaryLight background */
  background-color: #e8eaef; 
}  

*:focus {
	outline: none;
    border-color: ${({ theme }) => theme.color.secondary};
    box-shadow: 0 0 0 1px ${({ theme }) => theme.color.secondary};
}
`;

export default GlobalStyles;
