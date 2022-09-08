import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box; }

html {
  font-size: 62.5%; 
  min-height: 100%;
  display: flex;
  flex-direction: column;
}

body {
	font-family: "Rubik", sans-serif;
	font-size: 1.6rem;
	line-height: 1.6;
	color: #0e1b3a; 
	background-color: ${({ theme }) => theme.color.primaryLight};
	flex-grow: 1;
   display: flex;
   flex-direction: column;
  
  > div {
	flex-grow: 1;
  }
}  

input:focus, select:focus {
	outline: none;
   border-color: ${({ theme }) => theme.color.secondary};
   box-shadow: 0 0 0 1px ${({ theme }) => theme.color.secondary};
}

input {
	padding: 0.6rem;
   border: 1px solid #777;
   border-radius: 3px;
}

input:invalid {
    border-color: ${({ theme }) => theme.color.error};
    box-shadow: 0 0 0 1px ${({ theme }) => theme.color.error};
  }
`;

export default GlobalStyles;
