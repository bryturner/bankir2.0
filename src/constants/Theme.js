import { ThemeProvider } from "styled-components";
// "#7cbb88" "#bdddc3" "#e9f4eb"
export const theme = {
  color: {
    primary: "#172d61",
    primaryMid: "#455781",
    primaryMidLight: "#7d89a7",
    primaryLight: "#e8eaef",
    primaryLightest: "#eff0f4",
    secondary: "#248e38",
    secondaryMid: "#7cbb88",
    secondaryLight: "#bdddc3",
    secondaryDark: "#196327",
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
  boxShadow: {
    focus: "0 0 0 1px #248e38",
    error: "0 0 0 1px #ff2a2a",
  },
};

const Theme = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default Theme;
