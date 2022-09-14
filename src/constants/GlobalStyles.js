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
	font-size: 1.4rem;
	line-height: 1.6;
	color: #0e1b3a; 
	background-color: ${({ theme }) => theme.color.primaryLight};
	flex-grow: 1;
   display: flex;
   flex-direction: column;
  
  > div {
	flex-grow: 1;
	display: flex;
	flex-direction: column;
  }
}  

input, select {
	height: 3rem;
	padding: 0.6rem;
   border: 1px solid #777;
   border-radius: 3px;
   background-color: #f7f8fa;;
}

input:focus, select:focus {
	background-color: white;
	outline: none;
	border-color: ${({ theme }) => theme.color.secondary};
   box-shadow: ${({ theme }) => theme.boxShadow.focus};
}

input:invalid {
    border-color: ${({ theme }) => theme.color.error};
    box-shadow: ${({ theme }) => theme.boxShadow.error};
  }

button {
	cursor: pointer;
}
`;

export default GlobalStyles;
