import GlobalStyles from "./constants/GlobalStyles";
import { BrowserRouter } from "react-router-dom";
import Router from "./router/Router";

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
