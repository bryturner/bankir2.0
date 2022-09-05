import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ThemeProvider } from "styled-components";
import { theme } from "../../../constants/Theme";
import AmountInput from "../AmountInput";
import AuthContext from "../../../contexts/AuthContext";

const mockeSetAmount = jest.fn();

const MockAmount = ({ formName, id, value, setAmount }) => {
  return (
    <ThemeProvider theme={theme}>
      <AuthContext.Provider>
        <AmountInput
          formName={formName}
          id={id}
          value={value}
          setAmount={setAmount}
        />
      </AuthContext.Provider>
    </ThemeProvider>
  );
};

describe("Amount input", () => {
  //   test("should render amount input in form", () => {
  //     render(
  //       <MockAmount
  //         formName="transactionForm"
  //         id="transactionAmount"
  //         value="20"
  //         onChange={mockeSetAmount}
  //       />
  //     );
  //     expect(screen.getByPlaceholderText("0.00").toBeInTheDocument());
  //   });

  test("should render amount input in form", () => {
    render(
      <MockAmount
        formName="transactionForm"
        id="transactionAmount"
        value="20"
        onChange={mockeSetAmount}
      />
    );
    expect(screen.getByPlaceholderText("0.00"));
  });
});
