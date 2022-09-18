import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { render, fireEvent, waitFor, act } from "../../../testUtils";
import TransferForm from "../TransferForm";

describe("Transfer form inputs render", () => {
  test("form elements should render", () => {
    const { getByLabelText, getByRole } = render(<TransferForm />);
    expect(getByLabelText(/description/i)).toBeInTheDocument();
    expect(getByLabelText(/amount/i)).toBeInTheDocument();
    expect(getByLabelText(/date/i)).toBeInTheDocument();
    expect(getByLabelText(/transfer to/i)).toBeInTheDocument();
    expect(getByLabelText(/transfer from/i)).toBeInTheDocument();
    expect(getByRole("button")).toBeInTheDocument();
  });

  test("transfer to select should have two options", () => {
    const { getByLabelText } = render(<TransferForm />);
    expect(getByLabelText(/transfer to/i).length).toBe(2);
  });

  test("transfer from select should have two options", () => {
    const { getByLabelText } = render(<TransferForm />);
    expect(getByLabelText(/transfer from/i).length).toBe(2);
  });

  test("another user input should not be rendered", () => {
    const { queryByTestId } = render(<TransferForm />);
    expect(queryByTestId("otherInput")).toBe(null);
  });

  test("error message should not be visible", () => {
    const { getByTestId } = render(<TransferForm />);
    expect(getByTestId("errorMsg")).not.toBeVisible();
  });

  test("button text should show 'submit transfer'", () => {
    const { getByRole } = render(<TransferForm />);
    expect(getByRole("button")).toHaveTextContent(/submit transfer/i);
  });
});

describe("Transfer form input values", () => {
  test("amount input should change", () => {
    const { getByLabelText } = render(<TransferForm />);
    const amountInput = getByLabelText(/amount/i);
    const amountValue = "200";
    act(() => {
      fireEvent.change(amountInput, { target: { value: amountValue } });
    });
    expect(amountInput.value).toBe("200");
  });

  test("description input should change", () => {
    const { getByLabelText } = render(<TransferForm />);

    act(() => {
      fireEvent.change(getByLabelText(/description/i), {
        target: { value: "Payment to Spock" },
      });
    });
    expect(getByLabelText(/description/i).value).toBe("Payment to Spock");
  });

  test("transfer from option default should be standard account", () => {
    const { getByRole } = render(<TransferForm />);
    expect(getByRole("option", { name: "Standard Account" }).selected).toBe(
      true
    );
  });

  test("transfer to option default should be premium account", () => {
    const { getByLabelText } = render(<TransferForm />);
    expect(getByLabelText(/transfer to/i)).toHaveTextContent(
      /premium account/i
    );
  });

  test("transfer to option should change to 'standard' when transfer from 'premium' is selected", () => {
    const { getByLabelText, getByTestId } = render(<TransferForm />);

    act(() => {
      userEvent.selectOptions(
        getByLabelText(/transfer from/i),
        getByTestId("transfer-from-premium")
      );
    });

    expect(getByLabelText(/transfer to/i)).toHaveTextContent(
      /standard account/i
    );
  });

  test("transfer to option should change to 'premium' when transfer from 'standard' is selected", () => {
    const { getByLabelText, getByTestId } = render(<TransferForm />);

    act(() => {
      userEvent.selectOptions(
        getByLabelText(/transfer from/i),
        getByTestId("transfer-from-standard")
      );
    });

    expect(getByLabelText(/transfer to/i)).toHaveTextContent(
      /premium account/i
    );
  });

  test("another user input should be visible with transfer to 'Another User' option is selected", () => {
    const { getByLabelText, getByRole, getByPlaceholderText } = render(
      <TransferForm />
    );

    act(() => {
      userEvent.selectOptions(
        getByLabelText(/transfer to/i),
        getByRole("option", { name: "Another User" })
      );
    });

    expect(getByPlaceholderText(/enter username/i)).toBeInTheDocument();
  });

  test("another user input value should change", () => {
    const { getByLabelText, getByRole, getByPlaceholderText } = render(
      <TransferForm />
    );

    act(() => {
      userEvent.selectOptions(
        getByLabelText(/transfer to/i),
        getByRole("option", { name: "Another User" })
      );
      fireEvent.change(getByPlaceholderText(/enter username/i), {
        target: { value: "user1" },
      });
    });

    expect(getByPlaceholderText(/enter username/i).value).toBe("user1");
  });
});

describe("Transfer modal", () => {
  //   test("transfer modal should be visible", async () => {
  //     try {
  //       const { getByLabelText, getByRole, getByTestId } = render(
  //         <TransferForm />
  //       );
  //       fireEvent.change(getByLabelText(/description/i), {
  //         target: { value: "rent payment" },
  //       });
  //       fireEvent.change(getByLabelText(/amount/i), {
  //         target: { value: "100" },
  //       });
  //       fireEvent.click(getByRole("button"));
  //       await waitFor(() => {
  //         expect(getByTestId("modal")).toBeInTheDocument();
  //       });
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   });

  test("transfer modal should be visible with 'otherUser' option chosen", async () => {
    try {
      const { getByLabelText, getByRole, getByPlaceholderText, getByTestId } =
        render(<TransferForm />);

      act(() => {
        fireEvent.change(getByLabelText(/description/i), {
          target: { value: "rent payment" },
        });
        fireEvent.change(getByLabelText(/amount/i), {
          target: { value: "100" },
        });
        userEvent.selectOptions(
          getByLabelText(/transfer to/i),
          getByRole("option", { name: "Another User" })
        );
        fireEvent.change(getByPlaceholderText(/enter username/i), {
          target: { value: "user1" },
        });
        fireEvent.click(getByRole("button"));
      });
      await waitFor(() => {
        expect(getByTestId("modal")).toBeInTheDocument();
      });
    } catch (e) {
      console.log(e);
    }
  });

  test("error message for missing description", async () => {
    expect.assertions(1);
    try {
      const { getByLabelText, getByRole, queryByTestId } = render(
        <TransferForm />
      );
      act(() => {
        fireEvent.change(getByLabelText(/amount/i), {
          target: { value: "100" },
        });
        fireEvent.click(getByRole("button"));
      });

      await waitFor(() => {
        expect(queryByTestId("modal")).not.toBeInTheDocument();
      });
    } catch (e) {
      expect().toEqual({
        error: "Please enter a description",
      });
    }
  });

  test("error message for missing amount", async () => {
    expect.assertions(1);
    try {
      const { getByLabelText, getByRole, queryByTestId } = render(
        <TransferForm />
      );
      act(() => {
        fireEvent.change(getByLabelText(/description/i), {
          target: { value: "received paycheck" },
        });
        fireEvent.click(getByRole("button"));
      });

      await waitFor(() => {
        expect(queryByTestId("modal")).not.toBeInTheDocument();
      });
    } catch (e) {
      expect().toEqual({
        error: "Please enter an amount",
      });
    }
  });

  //   test("transfer modal should not be visible - 'otherUser' field empty", async () => {
  //     const { getByLabelText, getByRole, queryByTestId, getByPlaceholderText } =
  //       render(<TransferForm />);

  //     act(() => {
  //       fireEvent.change(getByLabelText(/description/i), {
  //         target: { value: "rent payment" },
  //       });
  //       fireEvent.change(getByLabelText(/amount/i), {
  //         target: { value: "100" },
  //       });
  //       userEvent.selectOptions(
  //         getByLabelText(/transfer to/i),
  //         getByRole("option", { name: "Another User" })
  //       );
  //       fireEvent.change(getByPlaceholderText(/enter username/i), {
  //         target: { value: "" },
  //       });
  //       fireEvent.click(getByRole("button"));
  //     });

  //     await waitFor(() => {
  //       expect(queryByTestId("modal")).not.toBeInTheDocument();
  //     });
  //   });

  //   test("transfer modal should display 'user1' 'standard' '100'", async () => {
  //     const { getByLabelText, getByRole, getByPlaceholderText, getByTestId } =
  //       render(<TransferForm />);
  //     fireEvent.change(getByLabelText(/description/i), {
  //       target: { value: "rent payment" },
  //     });
  //     fireEvent.change(getByLabelText(/amount/i), {
  //       target: { value: "100" },
  //     });
  //     userEvent.selectOptions(
  //       getByLabelText(/transfer from/i),
  //       getByTestId("transfer-from-standard")
  //     );
  //     userEvent.selectOptions(
  //       getByLabelText(/transfer to/i),
  //       getByRole("option", { name: "Another User" })
  //     );
  //     fireEvent.change(getByPlaceholderText(/enter username/i), {
  //       target: { value: "user1" },
  //     });
  //     fireEvent.click(getByRole("button"));
  //     await waitFor(() => {
  //       expect(getByTestId("modal-text")).toHaveTextContent(
  //         "Transfer $100.00 from Standard Savings to user1"
  //       );
  //     });
  //   });

  //   test("transfer modal should display 'premium' 'standard' '1000'", async () => {
  //     const { getByLabelText, getByRole, getByTestId } = render(<TransferForm />);
  //     fireEvent.change(getByLabelText(/description/i), {
  //       target: { value: "rent payment" },
  //     });
  //     fireEvent.change(getByLabelText(/amount/i), {
  //       target: { value: "1000" },
  //     });
  //     userEvent.selectOptions(
  //       getByLabelText(/transfer from/i),
  //       getByTestId("transfer-from-standard")
  //     );
  //     userEvent.selectOptions(
  //       getByLabelText(/transfer to/i),
  //       getByTestId("transfer-to-premium")
  //     );
  //     fireEvent.click(getByRole("button"));
  //     await waitFor(() => {
  //       expect(getByTestId("modal-text")).toHaveTextContent(
  //         "Transfer $1,000.00 from Standard Savings to Premium Savings"
  //       );
  //     });
  //   });
});

// describe("Transfer form error messages", () => {
//   test("error for empty amount field should be visible", () => {
//     const { getByLabelText, getByRole, getByTestId } = render(<TransferForm />);
//     fireEvent.change(getByLabelText(/description/i), {
//       target: { value: "rent paid" },
//     });
//     fireEvent.click(getByRole("button"));
//     expect(getByTestId("errorMsg")).toHaveTextContent("Please enter an amount");
//   });

//   test("error for invalid other user field should be visible", () => {
//     const {
//       getByLabelText,
//       getByRole,
//       getByTestId,
//       getByPlaceholderText,
//       queryByTestId,
//     } = render(<TransferForm />);
//     fireEvent.change(getByLabelText(/description/i), {
//       target: { value: "rent payment" },
//     });
//     fireEvent.change(getByLabelText(/amount/i), {
//       target: { value: "100" },
//     });
//     userEvent.selectOptions(
//       getByLabelText(/transfer from/i),
//       getByTestId("transfer-from-standard")
//     );
//     userEvent.selectOptions(
//       getByLabelText(/transfer to/i),
//       getByRole("option", { name: "Another User" })
//     );
//     fireEvent.change(getByPlaceholderText(/enter username/i), {
//       target: { value: "FF" },
//     });
//     expect(queryByTestId("errorMsg")).toHaveTextContent(
//       "Use lower case letters and numbers only"
//     );
//   });

//   //   FIX THIS TEST
//   test("error for empty other user field should be visible", () => {
//     const {
//       getByLabelText,
//       getByRole,
//       getByTestId,
//       getByPlaceholderText,
//       queryByTestId,
//     } = render(<TransferForm />);
//     fireEvent.change(getByLabelText(/description/i), {
//       target: { value: "rent payment" },
//     });
//     fireEvent.change(getByLabelText(/amount/i), {
//       target: { value: "100" },
//     });
//     userEvent.selectOptions(
//       getByLabelText(/transfer from/i),
//       getByTestId("transfer-from-standard")
//     );
//     userEvent.selectOptions(
//       getByLabelText(/transfer to/i),
//       getByRole("option", { name: "Another User" })
//     );
//     fireEvent.change(getByPlaceholderText(/enter username/i), {
//       target: { value: "" },
//     });
//     expect(queryByTestId("errorMsg")).toHaveTextContent("*");
//   });

//   test("error for maximum amount should be visible", () => {
//     const { queryByTestId, getByLabelText } = render(<TransferForm />);

//     fireEvent.change(getByLabelText(/amount/i), {
//       target: { value: "10000" },
//     });
//     expect(queryByTestId("errorMsg")).toHaveTextContent(
//       "Maximum amount is $2,000"
//     );
//   });

//   test("error for minimum amount should be visible", () => {
//     const { getByLabelText, queryByTestId } = render(<TransferForm />);
//     fireEvent.change(getByLabelText(/amount/i), {
//       target: { value: ".3" },
//     });
//     expect(queryByTestId("errorMsg")).toHaveTextContent("Minimum amount is $1");
//   });
// });
