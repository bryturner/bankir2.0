import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

function AuthContextProvider(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(undefined);

  // Checks token to see if user is logged in and authorized
  async function getIsLoggedIn() {
    const loggedInResponse = await axios.get(
      "http://localhost:5002/auth/isLoggedIn"
    );

    setIsLoggedIn(loggedInResponse.data);
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
