import axios from "axios";
import { BrowserRouter } from "react-router-dom";
import GlobalStyles from "./constants/GlobalStyles";
import Router from "./router/Router";

axios.defaults.withCredentials = true;

function App() {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </>
  );
}

export default App;
