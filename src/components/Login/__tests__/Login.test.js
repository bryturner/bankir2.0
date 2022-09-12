import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "../../../testUtils";
import LoginForm from "../LoginForm";

describe("Login form", () => {
  test("username input should render", () => {
    render(<LoginForm />);
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
  });

  test("password input should render", () => {
    render(<LoginForm />);
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  test("login button should render", () => {
    render(<LoginForm />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  test("login button should render", () => {
    render(<LoginForm />);
    expect(screen.getByRole("button")).toHaveTextContent(/log in/i);
  });

  test("error message should not be visible", () => {
    render(<LoginForm />);
    expect(screen.getByTestId("errorMsg")).not.toBeVisible();
  });

  test("username input should change", () => {
    render(<LoginForm />);
    const usernameInput = screen.getByLabelText(/username/i);
    const testValue = "user1";
    fireEvent.change(usernameInput, { target: { value: testValue } });
    expect(usernameInput.value).toBe("user1");
  });

  test("password input should change", () => {
    render(<LoginForm />);
    const passwordInput = screen.getByLabelText(/password/i);
    const testValue = "password";
    fireEvent.change(passwordInput, { target: { value: testValue } });
    expect(passwordInput.value).toBe("password");
  });

  test('Link text should be "register"', () => {
    render(<LoginForm />);
    expect(screen.getByText(/register here/i)).toBeInTheDocument();
  });
});
