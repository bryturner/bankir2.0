import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { render, screen, fireEvent, waitFor } from "../../../testUtils";
import InterestForm from "../InterestForm";

describe("Interest form inputs render", () => {
  test("year input should render", () => {
    render(<InterestForm />);
    expect(screen.getByLabelText(/year period/i)).toBeInTheDocument();
  });

  test("compounded input should render", () => {
    render(<InterestForm />);
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  test("compounded input should have 3 options", () => {
    render(<InterestForm />);
    expect(screen.getByRole("combobox").length).toBe(3);
  });

  test("button should render", () => {
    render(<InterestForm />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  test("button should have text 'submit interest'", () => {
    render(<InterestForm />);
    expect(screen.getByRole("button")).toHaveTextContent(/submit interest/i);
  });
});

describe("Interest form input values", () => {
  test("year input default value should 1", () => {
    render(<InterestForm />);
    expect(screen.getByLabelText(/year period/i).value).toBe("1");
  });

  test("year input value should change", () => {
    render(<InterestForm />);
    const yearInput = screen.getByLabelText(/year period/i);
    const yearValue = "3";
    fireEvent.change(yearInput, { target: { value: yearValue } });
    expect(yearInput.value).toBe(yearValue);
  });

  test("compounded input default value should be 12", () => {
    render(<InterestForm />);
    expect(screen.getByRole("combobox").value).toBe("12");
  });

  test("compounded input value should be 4", () => {
    render(<InterestForm />);
    userEvent.selectOptions(
      screen.getByRole("combobox"),
      screen.getByRole("option", { name: "Quarterly" })
    );
    expect(screen.getByRole("combobox").value).toBe("4");
  });
});

describe("Interest modal", () => {
  test("interest modal should be showing", async () => {
    render(<InterestForm />);
    fireEvent.click(screen.getByRole("button"));
    await waitFor(() => {
      expect(screen.getByTestId("modal")).toBeInTheDocument();
    });
  });
});
