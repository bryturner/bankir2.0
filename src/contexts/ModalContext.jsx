import axios from "axios";
import React, { createContext, useEffect, useReducer, useState } from "react";

const ModalContext = createContext();

function ModalContextProvider({ children }) {
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
  return <ModalContext.Provider value={{}}>{children}</ModalContext.Provider>;
}

export default ModalContext;
export { ModalContextProvider };
