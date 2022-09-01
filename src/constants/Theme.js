import { ThemeProvider } from "styled-components";

const theme = {
  color: {
    primary: "#172d61",
    primaryMid: "#455781",
    primaryLight: "#e8eaef",
    secondary: "#248e38",
    secondaryMid: "",
    lightGray: "#777",
  },
  heading: {
    primary: "5.4rem",
    secondary: "3rem",
    tertiary: "2.4rem",
    sub: "2rem",
  },
  spacing: {
    utilGap: "10px",
  },
};

const Theme = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default Theme;
