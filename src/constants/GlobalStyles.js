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
  background-color: #e8eaef;
}  
`;

export default GlobalStyles;
