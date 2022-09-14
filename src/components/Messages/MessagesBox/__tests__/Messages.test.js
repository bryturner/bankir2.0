import "@testing-library/jest-dom";
import { render } from "../../../../testUtils";
import Message from "../Message";
import Messages from "../Messages";

describe("Messages", () => {
  const props = {
    messages: [
      {
        firstName: "Spock",
        type: "welcome",
      },
      {
        amount: "20.00",
        type: "withdrawal",
        account: "standard",
      },
      {
        amount: "1,000.00",
        type: "deposit",
        account: "premium",
      },
      {
        amount: "500.00",
        type: "transfer",
        transferFrom: "premium",
        transferTo: "standard",
      },
      {
        amount: "500.00",
        type: "transfer",
        transferFrom: "standard",
        transferTo: "user1",
      },
      {
        type: "interest",
        standard: "200.00",
        premium: "150.00",
      },
    ],
  };

  test("should render welcome message", () => {
    const { getByText } = render(<Messages {...props} />);
    expect(
      getByText("Congrats Spock, you have opened a new account!")
    ).toBeInTheDocument();
  });

  test("should render withrawal message", () => {
    const { getByText } = render(<Messages {...props} />);
    expect(
      getByText("Withdrew $20.00 from Standard Savings")
    ).toBeInTheDocument();
  });

  test("should render deposit message", () => {
    const { getByText } = render(<Messages {...props} />);
    expect(
      getByText("Deposited $1,000.00 to Premium Savings")
    ).toBeInTheDocument();
  });

  test("should render transfer same message", () => {
    const { getByText } = render(<Messages {...props} />);
    expect(
      getByText("Transferred $500.00 from Premium Savings to Standard Savings")
    ).toBeInTheDocument();
  });

  test("should render transfer other message", () => {
    const { getByText } = render(<Messages {...props} />);
    expect(
      getByText("Transferred $500.00 from Standard Savings to user1")
    ).toBeInTheDocument();
  });

  test("should render interest message", () => {
    const { getByText } = render(<Messages {...props} />);
    expect(
      getByText(
        "Interest paid: $200.00 to Standard Savings and $150.00 to Premium Savings"
      )
    ).toBeInTheDocument();
  });
});
