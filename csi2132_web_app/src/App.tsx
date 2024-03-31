import { HashRouter, Route, Routes } from "react-router-dom";
import CustomerPage from "./pages/CustomerPage";
import Layout from "./pages/Layout";
import EmployeePage from "./pages/EmployeePage";
import "./App.css";
import SignInPage from "./pages/SignInPage";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<CustomerPage />} />
          <Route path="/employee" element={<EmployeePage />} />
          <Route path="/sign-in" element={<SignInPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
