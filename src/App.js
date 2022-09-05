import axios from "axios";
import { BrowserRouter } from "react-router-dom";
import { AccountContextProvider } from "./contexts/AccountContext";
import { AuthContextProvider } from "./contexts/AuthContext";
import Router from "./router/Router";

axios.defaults.withCredentials = true;

function App() {
  return (
    <AuthContextProvider>
      <AccountContextProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </AccountContextProvider>
    </AuthContextProvider>
  );
}

export default App;
