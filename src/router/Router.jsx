import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import styled from "styled-components";

import Theme from "../constants/Theme";
import AccountPage from "../pages/AccountsPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import AuthContext from "../contexts/AuthContext";
import { PATH } from "../constants/paths";
import GlobalStyles from "../constants/GlobalStyles";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

const PageContainer = styled.div`
  flex-grow: 1;
  height: 100%;
  position: relative;
  padding-bottom: 52px;
`;

function Router() {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <Theme>
      <GlobalStyles />
      <Header isLoggedIn={isLoggedIn} />
      <PageContainer>
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
              isLoggedIn ? (
                <Navigate replace to={PATH.ACCOUNT} />
              ) : (
                <LoginPage />
              )
            }
          />
          {/* <Route path={PATH.ACCOUNT} element={<AccountPage />} /> */}
          <Route
            path={PATH.ACCOUNT}
            element={
              isLoggedIn ? (
                <AccountPage />
              ) : (
                <Navigate replace to={PATH.LOGIN} />
              )
            }
          />
        </Routes>
        <Footer />
      </PageContainer>
    </Theme>
  );
}

export default Router;
