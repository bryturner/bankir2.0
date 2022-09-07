import axios from "axios";
import React, { createContext, useEffect, useReducer, useState } from "react";

const AccountContext = createContext();

// const initialState = {
//   firstName: "",
//   standard: {},
//   premium: {},
//   messages: [],
//   accountTotal: 0,
//   earningsTotal: 0,
//   amount: 0,
//   updatedAt: "",
// };

// const reducer = (state, action) => {
//   switch (action.type) {
//     case "update":
//       return {
//         ...state,
//         [action.payload.key]: action.payload.value,
//       };
//     default:
//       throw new Error(`Unknown action type: ${action.type}`);
//   }
// };

// for (let [key, value] of Object.entries(response.data)) {
//   console.log(key, value);
//   dispatch({ type: "update", payload: { key: key, value: value } });
// }

function AccountContextProvider({ children }) {
  const [accountInfo, setAccountInfo] = useState(undefined);
  //   const [state, dispatch] = useReducer(reducer, initialState);

  async function getAccountInfo() {
    try {
      const response = await axios.get("http://localhost:5002/account/");

      setAccountInfo(response.data);
    } catch (err) {
      console.error(err);
    }
  }

  //   useEffect(() => {
  //     createNewAccount();
  //   }, []);
  return (
    <AccountContext.Provider
      value={{ accountInfo, setAccountInfo, getAccountInfo }}
    >
      {children}
    </AccountContext.Provider>
  );
}

export default AccountContext;
export { AccountContextProvider };
