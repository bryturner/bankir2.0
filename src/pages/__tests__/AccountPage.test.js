import "@testing-library/jest-dom";
import { render, fireEvent, waitFor } from "../../testUtils";
import AccountPage from "../AccountsPage";

describe("Account page", () => {
  test("reset button should render", () => {
    const { getByText } = render(<AccountPage />);
    expect(getByText(/reset account/i)).toBeInTheDocument();
  });

  test("reset modal should show with message", async () => {
    const { getByText } = render(<AccountPage />);
    fireEvent.click(getByText(/reset account/i));
    await waitFor(() => {
      expect(
        getByText(
          "Are you sure you would like to reset this account to the default values?"
        )
      ).toBeInTheDocument();
    });
  });
});
