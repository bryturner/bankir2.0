import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Theme from "../constants/Theme";
import AccountPage from "../pages/AccountsPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import AuthContext from "../contexts/AuthContext";
import { PATH } from "../constants/paths";
import GlobalStyles from "../constants/GlobalStyles";

function Router() {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <Theme>
      <GlobalStyles />
      <Routes>
        <Route
          path={PATH.REGISTER}
          element={
            isLoggedIn ? (
              <Navigate replace to={PATH.ACCOUNT} />
            ) : (
              <RegisterPage isLoggedIn={isLoggedIn} />
            )
          }
        />
        <Route
          path={PATH.LOGIN}
          element={
            isLoggedIn ? (
              <Navigate replace to={PATH.ACCOUNT} />
            ) : (
              <LoginPage isLoggedIn={isLoggedIn} />
            )
          }
        />
        <Route
          path={PATH.ACCOUNT}
          element={<AccountPage isLoggedIn={isLoggedIn} />}
        />
        {/* <Route
          path={PATH.ACCOUNT}
          element={
            isLoggedIn ? (
              <AccountPage isLoggedIn={isLoggedIn} />
            ) : (
              <Navigate replace to={PATH.LOGIN} />
            )
          }
        /> */}
      </Routes>
    </Theme>
  );
}

export default Router;
