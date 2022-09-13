import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { render, screen, fireEvent, waitFor } from "../../../testUtils";
import TransactionForm from "../TransactionForm";

describe("Transaction form inputs render", () => {
  test("description input should render", () => {
    render(<TransactionForm />);
    expect(screen.getByPlaceholderText(/paycheck/i)).toBeInTheDocument();
  });

  test("amount input should render", () => {
    render(<TransactionForm />);
    expect(screen.getByLabelText(/amount/i)).toBeInTheDocument();
  });

  test("date input should render", () => {
    render(<TransactionForm />);
    expect(screen.getByLabelText(/date/i)).toBeInTheDocument();
  });

  test("transaction type select should render", () => {
    render(<TransactionForm />);
    expect(screen.getByLabelText(/transaction type/i)).toBeInTheDocument();
  });

  test("transaction type select should have two options", () => {
    render(<TransactionForm />);
    expect(screen.getByLabelText(/transaction type/i).length).toBe(2);
  });

  test("transaction account select should render", () => {
    render(<TransactionForm />);
    expect(screen.getByLabelText(/choose an account/i)).toBeInTheDocument();
  });

  test("transaction account select should have two options", () => {
    render(<TransactionForm />);
    expect(screen.getByLabelText(/choose an account/i).length).toBe(2);
  });

  test("date input should render", () => {
    render(<TransactionForm />);
    expect(screen.getByLabelText(/date/i)).toBeInTheDocument();
  });

  test("error message should not be visible", () => {
    render(<TransactionForm />);
    expect(screen.getByTestId("errorMsg")).not.toBeVisible();
  });

  test("button should render", () => {
    render(<TransactionForm />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  test("button text should show 'submit transaction'", () => {
    render(<TransactionForm />);
    expect(screen.getByRole("button")).toHaveTextContent(/submit transaction/i);
  });
});

describe("Transaction input values", () => {
  test("transaction type selected should be 'deposit'", () => {
    render(<TransactionForm />);
    expect(screen.getByLabelText(/transaction type/i)).toHaveTextContent(
      /deposit/i
    );
  });

  test("transaction type selected value should change to 'withdrawal'", () => {
    render(<TransactionForm />);
    userEvent.selectOptions(
      screen.getByLabelText(/transaction type/i),
      screen.getByText(/withdrawal/i)
    );
    expect(screen.getByLabelText(/transaction type/i).value).toBe("withdrawal");
  });

  test("transaction account selected should be 'standard account'", () => {
    render(<TransactionForm />);
    expect(screen.getByLabelText(/choose an account/i)).toHaveTextContent(
      /standard account/i
    );
  });

  test("transaction account selected value should change to 'premium account'", () => {
    render(<TransactionForm />);
    userEvent.selectOptions(
      screen.getByLabelText(/choose an account/i),
      screen.getByText(/premium account/i)
    );
    expect(screen.getByLabelText(/choose an account/i).value).toBe("premium");
  });

  test("description input should change", () => {
    render(<TransactionForm />);
    const descInput = screen.getByPlaceholderText(/paycheck/i);
    const descValue = "Received paycheck from Kirk";
    fireEvent.change(descInput, { target: { value: descValue } });
    expect(descInput.value).toBe(descValue);
  });

  test("amount input should change", () => {
    render(<TransactionForm />);
    const amountInput = screen.getByLabelText(/amount/i);
    const amountValue = "100";
    fireEvent.change(amountInput, { target: { value: amountValue } });
    expect(amountInput.value).toBe(amountValue);
  });
});

// describe("Transaction modal", () => {
//   test("transaction modal should be showing", async () => {
//     render(<TransactionForm />);
//     fireEvent.click(screen.getByRole("button"));
//     await waitFor(() => {
//       expect(screen.getByTestId("modal")).toBeInTheDocument();
//     });
//   });

//   test("transaction modal should be showing", async () => {
//     render(<TransactionForm />);

//     fireEvent.click(screen.getByRole("button"));
//     await waitFor(() => {
//       expect(screen.getByTestId("modal")).toBeInTheDocument();
//     });
//   });
// });
