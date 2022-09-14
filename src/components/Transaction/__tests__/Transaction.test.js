import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { render, screen, fireEvent, waitFor } from "../../../testUtils";
import TransactionForm from "../TransactionForm";

describe("Transaction form inputs render", () => {
  test("form elements should render", () => {
    render(<TransactionForm />);
    expect(screen.getByPlaceholderText(/paycheck/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/amount/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/transaction type/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/choose an account/i)).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  test("transaction type select should have two options", () => {
    render(<TransactionForm />);
    expect(screen.getByLabelText(/transaction type/i).length).toBe(2);
  });

  test("transaction account select should have two options", () => {
    render(<TransactionForm />);
    expect(screen.getByLabelText(/choose an account/i).length).toBe(2);
  });

  test("error message should not be visible", () => {
    render(<TransactionForm />);
    expect(screen.getByTestId("errorMsg")).not.toBeVisible();
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

describe("Transaction modal", () => {
  test("transaction modal should be visible", async () => {
    render(<TransactionForm />);
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: "received paycheck" },
    });
    fireEvent.change(screen.getByLabelText(/amount/i), {
      target: { value: "100" },
    });
    fireEvent.click(screen.getByRole("button"));
    await waitFor(() => {
      expect(screen.getByTestId("modal")).toBeInTheDocument();
    });
  });

  test("transaction modal should not be visible - missing description", async () => {
    render(<TransactionForm />);
    fireEvent.change(screen.getByLabelText(/amount/i), {
      target: { value: "100" },
    });
    fireEvent.click(screen.getByRole("button"));
    await waitFor(() => {
      expect(screen.queryByTestId("modal")).not.toBeInTheDocument();
    });
  });

  test("transaction modal should not be visible - missing amount", async () => {
    render(<TransactionForm />);
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: "received paycheck" },
    });
    fireEvent.click(screen.getByRole("button"));
    await waitFor(() => {
      expect(screen.queryByTestId("modal")).not.toBeInTheDocument();
    });
  });

  test("transaction modal text should be 'deposit' '100' 'premium'", async () => {
    render(<TransactionForm />);
    userEvent.selectOptions(
      screen.getByLabelText(/choose an account/i),
      screen.getByText(/premium account/i)
    );
    userEvent.selectOptions(
      screen.getByLabelText(/transaction type/i),
      screen.getByText(/deposit/i)
    );
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: "received paycheck" },
    });
    fireEvent.change(screen.getByLabelText(/amount/i), {
      target: { value: "100" },
    });
    fireEvent.click(screen.getByRole("button"));
    await waitFor(() => {
      expect(screen.getByTestId("modal-text")).toHaveTextContent(
        "Deposit $100.00 to Premium Savings"
      );
    });
  });

  test("transaction modal text should be 'withdrawal' '1000' 'standard'", async () => {
    render(<TransactionForm />);
    userEvent.selectOptions(
      screen.getByLabelText(/choose an account/i),
      screen.getByText(/standard account/i)
    );
    userEvent.selectOptions(
      screen.getByLabelText(/transaction type/i),
      screen.getByText(/withdrawal/i)
    );
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: "received paycheck" },
    });
    fireEvent.change(screen.getByLabelText(/amount/i), {
      target: { value: "1000" },
    });
    fireEvent.click(screen.getByRole("button"));
    await waitFor(() => {
      expect(screen.getByTestId("modal-text")).toHaveTextContent(
        "Withdraw $1,000.00 from Standard Savings"
      );
    });
  });
});

describe("Transaction form error messages", () => {
  test("error for empty amount field should be visible", () => {
    render(<TransactionForm />);
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: "received paycheck" },
    });
    fireEvent.click(screen.getByRole("button"));
    expect(screen.queryByTestId("errorMsg")).toHaveTextContent(
      "Please enter an amount"
    );
  });

  test("error for empty description field should be visible", () => {
    render(<TransactionForm />);
    fireEvent.change(screen.getByLabelText(/amount/i), {
      target: { value: "100" },
    });
    fireEvent.click(screen.getByRole("button"));
    expect(screen.queryByTestId("errorMsg")).toHaveTextContent(
      "Please enter a description"
    );
  });

  test("error for maximum amount should be visible", () => {
    render(<TransactionForm />);
    fireEvent.change(screen.getByLabelText(/amount/i), {
      target: { value: "10000" },
    });
    expect(screen.queryByTestId("errorMsg")).toHaveTextContent(
      "Maximum amount is $2,000"
    );
  });

  test("error for minimum amount should be visible", () => {
    render(<TransactionForm />);
    fireEvent.change(screen.getByLabelText(/amount/i), {
      target: { value: ".3" },
    });
    expect(screen.queryByTestId("errorMsg")).toHaveTextContent(
      "Minimum amount is $1"
    );
  });
});
