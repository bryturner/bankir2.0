import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { render, screen, fireEvent, waitFor } from "../../../testUtils";
import TransferForm from "../TransferForm";

describe("Transfer form inputs render", () => {
  test("form elements should render", () => {
    render(<TransferForm />);
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/amount/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/transfer to/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/transfer from/i)).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  test("transfer to select should have two options", () => {
    render(<TransferForm />);
    expect(screen.getByLabelText(/transfer to/i).length).toBe(2);
  });

  test("transfer from select should have two options", () => {
    render(<TransferForm />);
    expect(screen.getByLabelText(/transfer from/i).length).toBe(2);
  });

  test("another user input should not be rendered", () => {
    render(<TransferForm />);
    expect(screen.queryByTestId("otherInput")).toBe(null);
  });

  test("error message should not be visible", () => {
    render(<TransferForm />);
    expect(screen.getByTestId("errorMsg")).not.toBeVisible();
  });

  test("button text should show 'submit transfer'", () => {
    render(<TransferForm />);
    expect(screen.getByRole("button")).toHaveTextContent(/submit transfer/i);
  });
});

describe("Transfer form input values", () => {
  test("amount input should change", () => {
    render(<TransferForm />);
    const amountInput = screen.getByLabelText(/amount/i);
    const amountValue = "200";
    fireEvent.change(amountInput, { target: { value: amountValue } });
    expect(amountInput.value).toBe("200");
  });

  test("description input should change", () => {
    render(<TransferForm />);
    const descInput = screen.getByLabelText(/description/i);
    const descValue = "Payment to Spock";
    fireEvent.change(descInput, { target: { value: descValue } });
    expect(descInput.value).toBe("Payment to Spock");
  });

  test("transfer from option default should be standard account", () => {
    render(<TransferForm />);
    expect(
      screen.getByRole("option", { name: "Standard Account" }).selected
    ).toBe(true);
  });

  test("transfer to option default should be premium account", () => {
    render(<TransferForm />);
    expect(screen.getByLabelText(/transfer to/i)).toHaveTextContent(
      /premium account/i
    );
  });

  test("transfer to option should change to 'standard' when transfer from 'premium' is selected", () => {
    render(<TransferForm />);
    userEvent.selectOptions(
      screen.getByLabelText(/transfer from/i),
      screen.getByTestId("transfer-from-premium")
    );
    expect(screen.getByLabelText(/transfer to/i)).toHaveTextContent(
      /standard account/i
    );
  });

  test("transfer to option should change to 'premium' when transfer from 'standard' is selected", () => {
    render(<TransferForm />);
    userEvent.selectOptions(
      screen.getByLabelText(/transfer from/i),
      screen.getByTestId("transfer-from-standard")
    );
    expect(screen.getByLabelText(/transfer to/i)).toHaveTextContent(
      /premium account/i
    );
  });

  test("another user input should be visible with transfer to 'Another User' option is selected", () => {
    render(<TransferForm />);
    userEvent.selectOptions(
      screen.getByLabelText(/transfer to/i),
      screen.getByRole("option", { name: "Another User" })
    );
    expect(screen.getByPlaceholderText(/enter username/i)).toBeInTheDocument();
  });

  test("another user input value should change", () => {
    render(<TransferForm />);
    userEvent.selectOptions(
      screen.getByLabelText(/transfer to/i),
      screen.getByRole("option", { name: "Another User" })
    );
    const otherUserText = "user1";
    const otherUserInput = screen.getByPlaceholderText(/enter username/i);
    fireEvent.change(otherUserInput, { target: { value: otherUserText } });
    expect(otherUserInput.value).toBe("user1");
  });
});

describe("Transfer modal", () => {
  test("transfer modal should be visible", async () => {
    render(<TransferForm />);
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: "rent payment" },
    });
    fireEvent.change(screen.getByLabelText(/amount/i), {
      target: { value: "100" },
    });
    fireEvent.click(screen.getByRole("button"));
    await waitFor(() => {
      expect(screen.getByTestId("modal")).toBeInTheDocument();
    });
  });

  test("transfer modal should be visible with 'otherUser' option chosen", async () => {
    render(<TransferForm />);
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: "rent payment" },
    });
    fireEvent.change(screen.getByLabelText(/amount/i), {
      target: { value: "100" },
    });
    userEvent.selectOptions(
      screen.getByLabelText(/transfer to/i),
      screen.getByRole("option", { name: "Another User" })
    );
    fireEvent.change(screen.getByPlaceholderText(/enter username/i), {
      target: { value: "user1" },
    });
    fireEvent.click(screen.getByRole("button"));
    await waitFor(() => {
      expect(screen.getByTestId("modal")).toBeInTheDocument();
    });
  });

  test("transfer modal should not be visible - missing description", async () => {
    render(<TransferForm />);
    fireEvent.change(screen.getByLabelText(/amount/i), {
      target: { value: "100" },
    });
    fireEvent.click(screen.getByRole("button"));
    await waitFor(() => {
      expect(screen.queryByTestId("modal")).not.toBeInTheDocument();
    });
  });

  test("transfer modal should not be visible - missing amount", async () => {
    render(<TransferForm />);
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: "received paycheck" },
    });
    fireEvent.click(screen.getByRole("button"));
    await waitFor(() => {
      expect(screen.queryByTestId("modal")).not.toBeInTheDocument();
    });
  });

  test("transfer modal should not be visible - 'otherUser' field empty", async () => {
    render(<TransferForm />);
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: "rent payment" },
    });
    fireEvent.change(screen.getByLabelText(/amount/i), {
      target: { value: "100" },
    });
    userEvent.selectOptions(
      screen.getByLabelText(/transfer to/i),
      screen.getByRole("option", { name: "Another User" })
    );
    fireEvent.change(screen.getByPlaceholderText(/enter username/i), {
      target: { value: "" },
    });
    fireEvent.click(screen.getByRole("button"));
    await waitFor(() => {
      expect(screen.queryByTestId("modal")).not.toBeInTheDocument();
    });
  });

  test("transfer modal should display 'user1' 'standard' '100'", async () => {
    render(<TransferForm />);
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: "rent payment" },
    });
    fireEvent.change(screen.getByLabelText(/amount/i), {
      target: { value: "100" },
    });
    userEvent.selectOptions(
      screen.getByLabelText(/transfer from/i),
      screen.getByTestId("transfer-from-standard")
    );
    userEvent.selectOptions(
      screen.getByLabelText(/transfer to/i),
      screen.getByRole("option", { name: "Another User" })
    );
    fireEvent.change(screen.getByPlaceholderText(/enter username/i), {
      target: { value: "user1" },
    });
    fireEvent.click(screen.getByRole("button"));
    await waitFor(() => {
      expect(screen.getByTestId("modal-text")).toHaveTextContent(
        "Transfer $100.00 from Standard Savings to user1"
      );
    });
  });

  test("transfer modal should display 'premium' 'standard' '1000'", async () => {
    render(<TransferForm />);
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: "rent payment" },
    });
    fireEvent.change(screen.getByLabelText(/amount/i), {
      target: { value: "1000" },
    });
    userEvent.selectOptions(
      screen.getByLabelText(/transfer from/i),
      screen.getByTestId("transfer-from-standard")
    );
    userEvent.selectOptions(
      screen.getByLabelText(/transfer to/i),
      screen.getByTestId("transfer-to-premium")
    );
    fireEvent.click(screen.getByRole("button"));
    await waitFor(() => {
      expect(screen.getByTestId("modal-text")).toHaveTextContent(
        "Transfer $1,000.00 from Standard Savings to Premium Savings"
      );
    });
  });
});

describe("Transfer form error messages", () => {
  test("error for empty amount field should be visible", () => {
    render(<TransferForm />);
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: "rent paid" },
    });
    fireEvent.click(screen.getByRole("button"));
    expect(screen.queryByTestId("errorMsg")).toHaveTextContent(
      "Please enter an amount"
    );
  });

  test("error for empty description field should be visible", () => {
    render(<TransferForm />);
    fireEvent.change(screen.getByLabelText(/amount/i), {
      target: { value: "100" },
    });
    fireEvent.click(screen.getByRole("button"));
    expect(screen.queryByTestId("errorMsg")).toHaveTextContent(
      "Please enter a description"
    );
  });

  test("error for invalid other user field should be visible", () => {
    render(<TransferForm />);
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: "rent payment" },
    });
    fireEvent.change(screen.getByLabelText(/amount/i), {
      target: { value: "100" },
    });
    userEvent.selectOptions(
      screen.getByLabelText(/transfer from/i),
      screen.getByTestId("transfer-from-standard")
    );
    userEvent.selectOptions(
      screen.getByLabelText(/transfer to/i),
      screen.getByRole("option", { name: "Another User" })
    );
    fireEvent.change(screen.getByPlaceholderText(/enter username/i), {
      target: { value: "FF" },
    });
    expect(screen.queryByTestId("errorMsg")).toHaveTextContent(
      "Use lower case letters and numbers only"
    );
  });

  //   FIX THIS TEST
  test("error for empty other user field should be visible", () => {
    render(<TransferForm />);
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: "rent payment" },
    });
    fireEvent.change(screen.getByLabelText(/amount/i), {
      target: { value: "100" },
    });
    userEvent.selectOptions(
      screen.getByLabelText(/transfer from/i),
      screen.getByTestId("transfer-from-standard")
    );
    userEvent.selectOptions(
      screen.getByLabelText(/transfer to/i),
      screen.getByRole("option", { name: "Another User" })
    );
    fireEvent.change(screen.getByPlaceholderText(/enter username/i), {
      target: { value: "" },
    });
    expect(screen.queryByTestId("errorMsg")).toHaveTextContent("*");
  });

  test("error for maximum amount should be visible", () => {
    render(<TransferForm />);
    fireEvent.change(screen.getByLabelText(/amount/i), {
      target: { value: "10000" },
    });
    expect(screen.queryByTestId("errorMsg")).toHaveTextContent(
      "Maximum amount is $2,000"
    );
  });

  test("error for minimum amount should be visible", () => {
    render(<TransferForm />);
    fireEvent.change(screen.getByLabelText(/amount/i), {
      target: { value: ".3" },
    });
    expect(screen.queryByTestId("errorMsg")).toHaveTextContent(
      "Minimum amount is $1"
    );
  });
});
