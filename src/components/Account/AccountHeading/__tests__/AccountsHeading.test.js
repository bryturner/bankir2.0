import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ThemeProvider } from "styled-components";
import { theme } from "../../../../constants/Theme";
import AccountsHeader from "../AccountsHeader";
import AuthContext from "../../../../contexts/AuthContext";
import Greeting from "../Greeting";

const MockAccountsHeader = ({ firstName, accountTotal, earningsTotal }) => {
  return (
    <ThemeProvider theme={theme}>
      <AuthContext.Provider>
        <AccountsHeader
          firstName={firstName}
          accountTotal={accountTotal}
          earningsTotal={earningsTotal}
        />
      </AuthContext.Provider>
    </ThemeProvider>
  );
};

const MockGreeting = ({ firstName }) => {
  return (
    <ThemeProvider theme={theme}>
      <AuthContext.Provider>
        <Greeting firstName={firstName} />
      </AuthContext.Provider>
    </ThemeProvider>
  );
};

describe("Accounts header", () => {
  test("should render on page", () => {
    render(
      <MockAccountsHeader
        firstName="Bryan"
        accountTotal={20000}
        earningsTotal={500}
      />
    );
    expect(screen.getByTestId("accounts-header")).toBeInTheDocument();
  });
});

describe("Accounts header greeting", () => {
  test("should render header", () => {
    render(<MockGreeting firstName="Bryan" />);
    expect(screen.getByTestId("greeting")).toBeInTheDocument();
  });

  //   test("should render header", () => {
  //     render(<MockGreeting firstName="Bryan" />);
  //     expect(screen.getByTestId("first-name")).toBe("Welcome Bryan,");
  //   });

  //   test("should render header", () => {
  //     render(<MockGreeting firstName="Bryan" />);
  //     expect(screen.getByTestId("greeting")).toBeInTheDocument();
  //   });
});
