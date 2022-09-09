import { ThemeProvider } from "styled-components";

export const theme = {
  color: {
    primary: "#172d61",
    primaryMid: "#455781",
    primaryMidLight: "#7d89a7",
    primaryLight: "#e8eaef",
    primaryLightest: "#eff0f4",
    secondary: "#248e38",
    secondaryMid: "",
    lightGray: "#777",
    error: "#ff2a2a",
  },
  heading: {
    primary: "5.4rem",
    secondary: "3.6rem",
    tertiary: "2.6rem",
    sub: "2rem",
  },
  spacing: {
    utilGap: "12px",
  },
};

const Theme = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default Theme;
