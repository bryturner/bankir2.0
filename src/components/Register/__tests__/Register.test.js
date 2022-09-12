import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "../../../testUtils";
import RegisterForm from "../RegisterForm";

describe("Register form render", () => {
  test("first name input should render", () => {
    render(<RegisterForm />);
    expect(screen.getByPlaceholderText(/first name*/i)).toBeInTheDocument();
  });

  test("username input should render", () => {
    render(<RegisterForm />);
    expect(screen.getByPlaceholderText(/username*/i)).toBeInTheDocument();
  });

  test("password input should render", () => {
    render(<RegisterForm />);
    expect(screen.getByPlaceholderText(/Password*/)).toBeInTheDocument();
  });

  test("password verify input should render", () => {
    render(<RegisterForm />);
    expect(
      screen.getByPlaceholderText(/re-enter password*/i)
    ).toBeInTheDocument();
  });

  test("error message should not be visible", () => {
    render(<RegisterForm />);
    expect(screen.getByTestId("errorMsg")).not.toBeVisible();
  });

  test("switch to log in link should render", () => {
    render(<RegisterForm />);
    expect(screen.getByText(/log in here/i)).toBeInTheDocument();
  });

  test("button should render", () => {
    render(<RegisterForm />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  test("button should have text 'register'", () => {
    render(<RegisterForm />);
    expect(screen.getByRole("button")).toHaveTextContent(/register/i);
  });
});

describe("Register form input values", () => {
  test("username input should change", () => {
    render(<RegisterForm />);
    const usernameInput = screen.getByPlaceholderText(/username/i);
    const testValue = "user1";
    fireEvent.change(usernameInput, { target: { value: testValue } });
    expect(usernameInput.value).toBe("user1");
  });

  test("first name input should change", () => {
    render(<RegisterForm />);
    const firstNameInput = screen.getByPlaceholderText(/first name/i);
    const testValue = "Bryan";
    fireEvent.change(firstNameInput, { target: { value: testValue } });
    expect(firstNameInput.value).toBe("Bryan");
  });

  test("password input should change", () => {
    render(<RegisterForm />);
    const passwordInput = screen.getByPlaceholderText(/Password/);
    const testValue = "password";
    fireEvent.change(passwordInput, { target: { value: testValue } });
    expect(passwordInput.value).toBe("password");
  });

  test("verify password input should change", () => {
    render(<RegisterForm />);
    const verifyPasswordInput = screen.getByPlaceholderText(/re-enter/i);
    const testValue = "password";
    fireEvent.change(verifyPasswordInput, { target: { value: testValue } });
    expect(verifyPasswordInput.value).toBe("password");
  });

  test("password should be valid", () => {
    render(<RegisterForm />);
    const passwordInput = screen.getByPlaceholderText(/Password/);
    const testValue = /\S*/;
    fireEvent.change(passwordInput, { target: { value: testValue } });
    expect(passwordInput).toBeValid();
  });

  test("password should be invalid", () => {
    render(<RegisterForm />);
    const passwordInput = screen.getByPlaceholderText(/Password/);
    const testValue = " ";
    fireEvent.change(passwordInput, { target: { value: testValue } });
    expect(passwordInput).toBeInvalid();
  });

  test("username should be invalid", () => {
    render(<RegisterForm />);
    const usernameInput = screen.getByPlaceholderText(/username/i);
    const testValue = /\W*[A-Z]*/g;
    fireEvent.change(usernameInput, { target: { value: testValue } });
    expect(usernameInput).toBeInvalid();
  });

  test("first name input should be invalid", () => {
    render(<RegisterForm />);
    const firstNameInput = screen.getByPlaceholderText(/first name/i);
    const testValue = /\d/g;
    fireEvent.change(firstNameInput, { target: { value: testValue } });
    expect(firstNameInput).toBeInvalid();
  });
});
