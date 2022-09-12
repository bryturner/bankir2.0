import { render, screen } from "../../../testUtils";
import LoginForm from "../../Login/LoginForm";

describe("Login Form", () => {
  test('Link text should be "register"', () => {
    render(<LoginForm />);

    expect(screen.getByText(/register here/i)).toBeInTheDocument();
  });
});
