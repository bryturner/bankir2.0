import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { render, fireEvent, waitFor } from "../../../testUtils";
import InterestForm from "../InterestForm";

describe("Interest form inputs render", () => {
  test("inputs should render", () => {
    const { getByLabelText, getByRole } = render(<InterestForm />);
    expect(getByLabelText(/year period/i)).toBeInTheDocument();
    expect(getByRole("combobox")).toBeInTheDocument();
    expect(getByRole("button")).toBeInTheDocument();
  });

  test("compounded input should have 3 options", () => {
    const { getByRole } = render(<InterestForm />);
    expect(getByRole("combobox").length).toBe(3);
  });

  test("button should have text 'submit interest'", () => {
    const { getByRole } = render(<InterestForm />);
    expect(getByRole("button")).toHaveTextContent(/submit interest/i);
  });
});

describe("Interest form input values", () => {
  test("year input default value should 1", () => {
    const { getByLabelText } = render(<InterestForm />);
    expect(getByLabelText(/year period/i).value).toBe("1");
  });

  test("year input value should change", () => {
    const { getByLabelText } = render(<InterestForm />);
    const yearInput = getByLabelText(/year period/i);
    const yearValue = "3";
    fireEvent.change(yearInput, { target: { value: yearValue } });
    expect(yearInput.value).toBe(yearValue);
  });

  test("compounded input default value should be 12", () => {
    const { getByRole } = render(<InterestForm />);
    expect(getByRole("combobox").value).toBe("12");
  });

  test("compounded input value should be 4", () => {
    const { getByRole } = render(<InterestForm />);
    userEvent.selectOptions(
      getByRole("combobox"),
      getByRole("option", { name: "Quarterly" })
    );
    expect(getByRole("combobox").value).toBe("4");
  });
});

describe("Interest totals", () => {
  const props = {
    standardBalance: 2000,
    standardAPY: 4.5,
    premiumBalance: 5000,
    premiumAPY: 8.5,
  };

  test("interest totals should show initial values", () => {
    const { getByText } = render(<InterestForm {...props} />);
    expect(getByText("$91.88")).toBeInTheDocument();
    expect(getByText("$441.95")).toBeInTheDocument();
  });

  test("interest totals should change values when quarterly is selected", () => {
    const { getByText, getByRole } = render(<InterestForm {...props} />);
    userEvent.selectOptions(
      getByRole("combobox"),
      getByRole("option", { name: "Quarterly" })
    );
    expect(getByText("$91.53")).toBeInTheDocument();
    expect(getByText("$438.74")).toBeInTheDocument();
  });

  test("interest totals should change values when quarterly is selected", () => {
    const { getByText, getByLabelText } = render(<InterestForm {...props} />);

    fireEvent.change(getByLabelText(/year period/i), { target: { value: 5 } });
    expect(getByText("$503.59")).toBeInTheDocument();
    expect(getByText("$2,636.50")).toBeInTheDocument();
  });
});

// describe("Interest modal", () => {
//   const props = {
//     standardBalance: 2000,
//     standardAPY: 4.5,
//     premiumBalance: 5000,
//     premiumAPY: 8.5,
//   };
//   test("interest modal should be showing", async () => {
//     const { getByRole, getByTestId } = render(<InterestForm />);
//     fireEvent.click(getByRole("button"));
//     await waitFor(() => {
//       expect(getByTestId("modal")).toBeInTheDocument();
//     });
//   });

//   test("interest modal years and compounded message should show '1' and 'monthly' ", async () => {
//     const { getByRole, getByText } = render(<InterestForm {...props} />);
//     fireEvent.click(getByRole("button"));
//     await waitFor(() => {
//       expect(
//         getByText("In a 1 year period compounded monthly you will earn:")
//       ).toBeInTheDocument();
//     });
//   });

//   test("interest modal earned interest should show initial values", async () => {
//     const { getByRole, getByText } = render(<InterestForm {...props} />);
//     fireEvent.click(getByRole("button"));
//     await waitFor(() => {
//       expect(getByText("Standard: $91.88")).toBeInTheDocument();
//       expect(getByText("Premium: $441.95")).toBeInTheDocument();
//     });
//   });

//   test("interest modal earned interest should show text message and values for quarterly", async () => {
//     const { getByRole, getByText } = render(<InterestForm {...props} />);
//     userEvent.selectOptions(
//       getByRole("combobox"),
//       getByRole("option", { name: "Quarterly" })
//     );
//     fireEvent.click(getByRole("button"));
//     await waitFor(() => {
//       expect(
//         getByText("In a 1 year period compounded quarterly you will earn:")
//       ).toBeInTheDocument();
//       expect(getByText("Standard: $91.53")).toBeInTheDocument();
//       expect(getByText("Premium: $438.74")).toBeInTheDocument();
//     });
//   });

//   test("interest modal earned interest should show text message and values when period is changed to 5 years", async () => {
//     const { getByText, getByLabelText, getByRole } = render(
//       <InterestForm {...props} />
//     );
//     fireEvent.change(getByLabelText(/year period/i), { target: { value: 5 } });

//     fireEvent.click(getByRole("button"));
//     await waitFor(() => {
//       expect(
//         getByText("In a 5 year period compounded monthly you will earn:")
//       ).toBeInTheDocument();
//       expect(getByText("$503.59")).toBeInTheDocument();
//       expect(getByText("$2,636.50")).toBeInTheDocument();
//     });
//   });
// });
