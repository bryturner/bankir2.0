import "@testing-library/jest-dom";
import { render } from "../../../../testUtils";
import AccountHeading from "../AccountHeading";
import Greeting from "../Greeting";

describe("Account heading", () => {
  const props = {
    firstName: "Bryan",
    accountTotal: 20000,
    earningsTotal: 500,
  };
  test("heading text should render", () => {
    const { getByText } = render(<AccountHeading {...props} />);
    expect(getByText(/bryan/i)).toBeInTheDocument();
    expect(getByText("$20,000.00")).toBeInTheDocument();
    expect(getByText("$500.00")).toBeInTheDocument();
  });
});
