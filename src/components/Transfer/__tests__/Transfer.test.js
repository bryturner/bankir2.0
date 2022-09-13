import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { render, screen, fireEvent, waitFor } from "../../../testUtils";
import TransferForm from "../TransferForm";

describe("Transfer form inputs render", () => {
  test("description input should render", () => {
    render(<TransferForm />);
    expect(screen.getByPlaceholderText(/monthly/)).toBeInTheDocument();
  });

  test("amount input should render", () => {
    render(<TransferForm />);
    expect(screen.getByLabelText(/amount/i)).toBeInTheDocument();
  });

  test("date input should render", () => {
    render(<TransferForm />);
    expect(screen.getByLabelText(/date/i)).toBeInTheDocument();
  });

  test("transfer to select should render", () => {
    render(<TransferForm />);
    expect(screen.getByLabelText(/transfer to/i)).toBeInTheDocument();
  });

  test("transfer to select should have two options", () => {
    render(<TransferForm />);
    expect(screen.getByLabelText(/transfer to/i).length).toBe(2);
  });

  test("transfer from select should render", () => {
    render(<TransferForm />);
    expect(screen.getByLabelText(/transfer from/i)).toBeInTheDocument();
  });

  test("transfer from select should have two options", () => {
    render(<TransferForm />);
    expect(screen.getByLabelText(/transfer from/i).length).toBe(2);
  });

  test("another user input should not be rendered", () => {
    render(<TransferForm />);
    expect(screen.queryByTestId("otherInput")).toBe(null);
  });

  test("date input should render", () => {
    render(<TransferForm />);
    expect(screen.getByLabelText(/date/i)).toBeInTheDocument();
  });

  test("error message should not be visible", () => {
    render(<TransferForm />);
    expect(screen.getByTestId("errorMsg")).not.toBeVisible();
  });

  test("button should render", () => {
    render(<TransferForm />);
    expect(screen.getByRole("button")).toBeInTheDocument();
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
    const descInput = screen.getByPlaceholderText(/monthly/i);
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
  test("transfer modal should be showing", async () => {
    render(<TransferForm />);
    fireEvent.click(screen.getByRole("button"));
    await waitFor(() => {
      expect(screen.getByTestId("modal")).toBeInTheDocument();
    });
  });
});
