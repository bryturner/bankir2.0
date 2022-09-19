import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { BASE_URL } from "../constants/paths";

const AuthContext = createContext();

function AuthContextProvider(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(undefined);

  // Checks token to see if user is logged in and authorized
  async function getIsLoggedIn() {
    const response = await axios.get(`${BASE_URL}auth/isLoggedIn`);

    setIsLoggedIn(response.data);
  }

  useEffect(() => {
    getIsLoggedIn();
  }, []);
  return (
    <AuthContext.Provider value={{ isLoggedIn, getIsLoggedIn }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
export { AuthContextProvider };
