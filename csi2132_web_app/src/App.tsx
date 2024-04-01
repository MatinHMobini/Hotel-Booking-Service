import { HashRouter, Route, Routes } from "react-router-dom";
import CustomerPage from "./pages/CustomerPage";
import Layout from "./pages/Layout";
import EmployeePage from "./pages/EmployeePage";
import "./App.css";
import RoomInput from "./pages/RoomInput";
import HotelInput from "./pages/HotelInput";
import EmployeeInput from "./pages/EmployeeInput";
import CustomerInput from "./pages/CustomerInput";
import BookingPage from "./pages/BookingPage";
import RentingPage from "./pages/RentingPage";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<CustomerPage />} />
          <Route path="/employee" element={<EmployeePage />} />
          <Route path="/customer-input" element={<CustomerInput />} />
          <Route path="/employee-input" element={<EmployeeInput />} />
          <Route path="/hotel-input" element={<HotelInput />} />
          <Route path="/room-input" element={<RoomInput />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/renting" element={<RentingPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
