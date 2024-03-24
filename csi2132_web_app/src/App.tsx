import { HashRouter, Route, Routes } from "react-router-dom";
import CustomerPage from "./pages/CustomerPage";
import Layout from "./pages/Layout";
import EmployeePage from "./pages/EmployeePage";
import "./App.css";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<CustomerPage />} />
          <Route path="/employee" element={<EmployeePage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
