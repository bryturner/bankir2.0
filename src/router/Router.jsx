import { Routes, Route } from "react-router-dom";
import Header from "../components/Header/Header";
import Theme from "../constants/Theme";
import AccountPage from "../pages/AccountsPage";
import LoginPage from "../pages/LoginPage";

function Router() {
  return (
    <Theme>
      <Header />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/account" element={<AccountPage />} />
      </Routes>
    </Theme>
  );
}

export default Router;
