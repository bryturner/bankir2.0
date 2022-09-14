import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { render, fireEvent, waitFor } from "../../../testUtils";
import TransactionForm from "../TransactionForm";

describe("Transaction form inputs render", () => {
  test("form elements should render", () => {
    const { getByPlaceholderText, getByLabelText, getByRole } = render(
      <TransactionForm />
    );
    expect(getByPlaceholderText(/paycheck/i)).toBeInTheDocument();
    expect(getByLabelText(/amount/i)).toBeInTheDocument();
    expect(getByLabelText(/date/i)).toBeInTheDocument();
    expect(getByLabelText(/transaction type/i)).toBeInTheDocument();
    expect(getByLabelText(/choose an account/i)).toBeInTheDocument();
    expect(getByRole("button")).toBeInTheDocument();
  });

  test("transaction type select should have two options", () => {
    const { getByLabelText } = render(<TransactionForm />);
    expect(getByLabelText(/transaction type/i).length).toBe(2);
  });

  test("transaction account select should have two options", () => {
    const { getByLabelText } = render(<TransactionForm />);
    expect(getByLabelText(/choose an account/i).length).toBe(2);
  });

  test("error message should not be visible", () => {
    const { getByTestId } = render(<TransactionForm />);
    expect(getByTestId("errorMsg")).not.toBeVisible();
  });

  test("button text should show 'submit transaction'", () => {
    const { getByRole } = render(<TransactionForm />);
    expect(getByRole("button")).toHaveTextContent(/submit transaction/i);
  });
});

describe("Transaction input values", () => {
  test("transaction type selected should be 'deposit'", () => {
    const { getByLabelText } = render(<TransactionForm />);
    expect(getByLabelText(/transaction type/i)).toHaveTextContent(/deposit/i);
  });

  test("transaction type selected value should change to 'withdrawal'", () => {
    const { getByLabelText, getByText } = render(<TransactionForm />);
    userEvent.selectOptions(
      getByLabelText(/transaction type/i),
      getByText(/withdrawal/i)
    );
    expect(getByLabelText(/transaction type/i).value).toBe("withdrawal");
  });

  test("transaction account selected should be 'standard account'", () => {
    const { getByLabelText } = render(<TransactionForm />);
    expect(getByLabelText(/choose an account/i)).toHaveTextContent(
      /standard account/i
    );
  });

  test("transaction account selected value should change to 'premium account'", () => {
    const { getByLabelText, getByText } = render(<TransactionForm />);
    userEvent.selectOptions(
      getByLabelText(/choose an account/i),
      getByText(/premium account/i)
    );
    expect(getByLabelText(/choose an account/i).value).toBe("premium");
  });

  test("description input should change", () => {
    const { getByPlaceholderText } = render(<TransactionForm />);
    const descInput = getByPlaceholderText(/paycheck/i);
    const descValue = "Received paycheck from Kirk";
    fireEvent.change(descInput, { target: { value: descValue } });
    expect(descInput.value).toBe(descValue);
  });

  test("amount input should change", () => {
    const { getByLabelText } = render(<TransactionForm />);
    const amountInput = getByLabelText(/amount/i);
    const amountValue = "100";
    fireEvent.change(amountInput, { target: { value: amountValue } });
    expect(amountInput.value).toBe(amountValue);
  });
});

describe("Transaction modal", () => {
  test("transaction modal should be visible", async () => {
    const { getByLabelText, getByRole, getByTestId } = render(
      <TransactionForm />
    );
    fireEvent.change(getByLabelText(/description/i), {
      target: { value: "received paycheck" },
    });
    fireEvent.change(getByLabelText(/amount/i), {
      target: { value: "100" },
    });
    fireEvent.click(getByRole("button"));
    await waitFor(() => {
      expect(getByTestId("modal")).toBeInTheDocument();
    });
  });

  test("transaction modal should not be visible - missing description", async () => {
    const { getByLabelText, getByRole, queryByTestId } = render(
      <TransactionForm />
    );
    fireEvent.change(getByLabelText(/amount/i), {
      target: { value: "100" },
    });
    fireEvent.click(getByRole("button"));
    await waitFor(() => {
      expect(queryByTestId("modal")).not.toBeInTheDocument();
    });
  });

  test("transaction modal should not be visible - missing amount", async () => {
    const { getByLabelText, getByRole, queryByTestId } = render(
      <TransactionForm />
    );
    fireEvent.change(getByLabelText(/description/i), {
      target: { value: "received paycheck" },
    });
    fireEvent.click(getByRole("button"));
    await waitFor(() => {
      expect(queryByTestId("modal")).not.toBeInTheDocument();
    });
  });

  test("transaction modal text should be 'deposit' '100' 'premium'", async () => {
    const { getByLabelText, getByRole, getByTestId, getByText } = render(
      <TransactionForm />
    );
    userEvent.selectOptions(
      getByLabelText(/choose an account/i),
      getByText(/premium account/i)
    );
    userEvent.selectOptions(
      getByLabelText(/transaction type/i),
      getByText(/deposit/i)
    );
    fireEvent.change(getByLabelText(/description/i), {
      target: { value: "received paycheck" },
    });
    fireEvent.change(getByLabelText(/amount/i), {
      target: { value: "100" },
    });
    fireEvent.click(getByRole("button"));
    await waitFor(() => {
      expect(getByTestId("modal-text")).toHaveTextContent(
        "Deposit $100.00 to Premium Savings"
      );
    });
  });

  test("transaction modal text should be 'withdrawal' '1000' 'standard'", async () => {
    const { getByLabelText, getByRole, getByTestId, getByText } = render(
      <TransactionForm />
    );
    userEvent.selectOptions(
      getByLabelText(/choose an account/i),
      getByText(/standard account/i)
    );
    userEvent.selectOptions(
      getByLabelText(/transaction type/i),
      getByText(/withdrawal/i)
    );
    fireEvent.change(getByLabelText(/description/i), {
      target: { value: "received paycheck" },
    });
    fireEvent.change(getByLabelText(/amount/i), {
      target: { value: "1000" },
    });
    fireEvent.click(getByRole("button"));
    await waitFor(() => {
      expect(getByTestId("modal-text")).toHaveTextContent(
        "Withdraw $1,000.00 from Standard Savings"
      );
    });
  });
});

describe("Transaction form error messages", () => {
  test("error for empty amount field should be visible", () => {
    const { getByLabelText, getByRole, queryByTestId } = render(
      <TransactionForm />
    );
    fireEvent.change(getByLabelText(/description/i), {
      target: { value: "received paycheck" },
    });
    fireEvent.click(getByRole("button"));
    expect(queryByTestId("errorMsg")).toHaveTextContent(
      "Please enter an amount"
    );
  });

  test("error for empty description field should be visible", () => {
    const { getByLabelText, getByRole, queryByTestId } = render(
      <TransactionForm />
    );
    fireEvent.change(getByLabelText(/amount/i), {
      target: { value: "100" },
    });
    fireEvent.click(getByRole("button"));
    expect(queryByTestId("errorMsg")).toHaveTextContent(
      "Please enter a description"
    );
  });

  test("error for maximum amount should be visible", () => {
    const { getByLabelText, queryByTestId } = render(<TransactionForm />);
    fireEvent.change(getByLabelText(/amount/i), {
      target: { value: "10000" },
    });
    expect(queryByTestId("errorMsg")).toHaveTextContent(
      "Maximum amount is $2,000"
    );
  });

  test("error for minimum amount should be visible", () => {
    const { getByLabelText, queryByTestId } = render(<TransactionForm />);
    fireEvent.change(getByLabelText(/amount/i), {
      target: { value: ".3" },
    });
    expect(queryByTestId("errorMsg")).toHaveTextContent("Minimum amount is $1");
  });
});
