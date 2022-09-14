import "@testing-library/jest-dom";
import { render } from "../../../testUtils";
import Account from "../Account";

describe("Account", () => {
  const props = {
    title: "Standard Savings",
    balance: 2000,
    earnings: 400,
    apy: 4.5,
    transactions: [
      {
        transDate: "2022-09-10",
        description: "sunday job",
        amount: 300,
        id: "t-to09-10T21:53:35.695",
      },
      {
        transDate: "2022-09-12",
        description: "steak dinner",
        amount: -50,
        id: "t-fm09-10T21:53:35.690",
      },
    ],
  };

  test("account elements should render", () => {
    const { getByRole, getAllByRole, getAllByTestId } = render(
      <Account {...props} />
    );
    expect(getByRole("list")).toBeInTheDocument();
    expect(getAllByRole("listitem")).toBeTruthy();
    expect(getAllByTestId("total")).toBeTruthy();
  });

  test("account title should be standard savings", () => {
    const { getByText } = render(<Account {...props} />);
    expect(getByText(/standard savings/i)).toBeInTheDocument();
  });

  test("account total should be formatted to string", () => {
    const { getByText } = render(<Account {...props} />);
    expect(getByText("$2,000.00")).toBeInTheDocument();
    expect(getByText("$400.00")).toBeInTheDocument();
  });

  test("account apy should be to fixed - 1 and have %", () => {
    const { getByText } = render(<Account {...props} />);
    expect(getByText("4.5%")).toBeInTheDocument();
  });

  test("account transaction text should display... ", () => {
    const { getByText } = render(<Account {...props} />);
    expect(getByText("steak dinner")).toBeInTheDocument();
    expect(getByText("sunday job")).toBeInTheDocument();
  });

  test("account transaction amounts should display... ", () => {
    const { getByText } = render(<Account {...props} />);
    expect(getByText("$300.00")).toBeInTheDocument();
    expect(getByText("-$50.00")).toBeInTheDocument();
  });
});

describe("No transactions", () => {
  const props = {
    title: "Standard Savings",
    balance: 2000,
    earnings: 400,
    apy: 4.5,
    transactions: [],
  };
  test("should show no transactions text", () => {
    const { getByText } = render(<Account {...props} />);
    expect(
      getByText(/no transactions or transfers recorded/i)
    ).toBeInTheDocument();
  });
});
