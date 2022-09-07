import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ThemeProvider } from "styled-components";
import { theme } from "../../../constants/Theme";
import AmountInput from "../AmountInput";
import AuthContext from "../../../contexts/AuthContext";

const mockedSetAmount = jest.fn();

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
  //         onChange={mockedSetAmount}
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
        onChange={mockedSetAmount}
      />
    );
    expect(screen.getByPlaceholderText("0.00"));
  });
});

describe("Other user text input", () => {
  test("should not render ", () => {
    render();

    expect();
  });
});

const mockedSetTransferToOther = jest.fn();
const MockOtherUserInput = ({ formName, id, value, onChange }) => {
  return (
    <ThemeProvider theme={theme}>
      <AuthContext.Provider>
        <AmountInput
          formName={formName}
          id={id}
          value={value}
          placeholder="Enter username"
          onChange={mockedSetTransferToOther}
        />
      </AuthContext.Provider>
    </ThemeProvider>
  );
};

describe("Other user input", () => {
  test('should not render when option "another user" is not selected', () => {
    render(
      <MockOtherUserInput
        formName="transferForm"
        id="otherUser"
        value=""
        onChange={mockedSetTransferToOther}
      />
    );

    //  expect(
    //    screen.findByPlaceholderText("Enter username")
    //  ).not.toBeInTheDocument();
  });
});
