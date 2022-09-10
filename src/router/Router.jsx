import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Theme from "../constants/Theme";
import AccountPage from "../pages/AccountsPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import AuthContext from "../contexts/AuthContext";
import { PATH } from "../constants/paths";
import GlobalStyles from "../constants/GlobalStyles";
import Header from "../components/Header/Header";

function Router() {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <Theme>
      <GlobalStyles />
      <Header isLoggedIn={isLoggedIn} />
      <Routes>
        <Route
          path={PATH.REGISTER}
          element={
            isLoggedIn ? (
              <Navigate replace to={PATH.ACCOUNT} />
            ) : (
              <RegisterPage />
            )
          }
        />
        <Route
          path={PATH.LOGIN}
          element={
            isLoggedIn ? <Navigate replace to={PATH.ACCOUNT} /> : <LoginPage />
          }
        />
        <Route path={PATH.ACCOUNT} element={<AccountPage />} />
        {/* <Route
          path={PATH.ACCOUNT}
          element={
            isLoggedIn ? <AccountPage /> : <Navigate replace to={PATH.LOGIN} />
          }
        /> */}
      </Routes>
    </Theme>
  );
}

export default Router;
