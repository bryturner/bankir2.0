import axios from "axios";
import { BrowserRouter } from "react-router-dom";
import GlobalStyles from "./constants/GlobalStyles";
import { AuthContextProvider } from "./contexts/AuthContext";
import Router from "./router/Router";

axios.defaults.withCredentials = true;

function App() {
  return (
    <>
      <GlobalStyles />
      <AuthContextProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </AuthContextProvider>
    </>
  );
}

export default App;
