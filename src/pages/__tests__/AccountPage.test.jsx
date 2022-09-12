import "@testing-library/jest-dom";
import { render, screen } from "../../testUtils";
import AccountPage from "../AccountsPage";

describe("Account page", () => {
  test("reset button should render", () => {
    render(<AccountPage />);
    expect(screen.getByText(/reset account/i)).toBeInTheDocument();
  });
});
