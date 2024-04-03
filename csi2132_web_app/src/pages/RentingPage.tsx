import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import AnimationFadeIn from "../components/AnimationFadeIn";

const RentingPage = () => {
  const location = useLocation();
  const [customerId, setCustomerId] = useState("");
  const [rentId, setRentId] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [hasPaid, setHasPaid] = useState(false);
  const [rentingEntries, setRentingEntries] = useState([]);

  useEffect(() => {
    fetchRentingEntries();
  }, []);

  const fetchRentingEntries = async () => {
    try {
      const response = await fetch("http://localhost:3000/getrentings");
      if (response.ok) {
        const data = await response.json();
        setRentingEntries(data);
      } else {
        console.error("Failed to fetch renting entries");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        customerId: parseInt(customerId),
        rentId: parseInt(rentId),
        checkInDate,
        checkOutDate,
        hasPaid,
        bookingId: location.state.booking_id,
        roomId: location.state.room_id,
      };

      const response = await fetch("http://localhost:3000/renting", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Renting confirmed successfully");
        fetchRentingEntries(); // Refresh renting entries after successful submission
      } else {
        console.error("Failed to confirm renting");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
      <AnimationFadeIn>
        <div>
          <form className="inputForm" onSubmit={handleSubmit}>
            <div className="container">
              <label htmlFor="customerId">
                <b>Customer ID</b>
              </label>
              <input
                  className="inputBlank"
                  type="number"
                  placeholder="Enter Customer ID"
                  name="customerId"
                  value={customerId}
                  onChange={(e) => setCustomerId(e.target.value)}
                  min={0}
                  required
              />

              <label htmlFor="rentId">
                <b>Rent ID</b>
              </label>
              <input
                  className="inputBlank"
                  type="number"
                  placeholder="Enter Rent ID"
                  name="rentId"
                  value={rentId}
                  onChange={(e) => setRentId(e.target.value)}
                  min={0}
                  required
              />

              <label htmlFor="checkInDate">
                <b>Check-in Date</b>
              </label>
              <input
                  className="inputBlank"
                  type="date"
                  name="checkInDate"
                  value={checkInDate}
                  onChange={(e) => setCheckInDate(e.target.value)}
                  required
              />

              <label htmlFor="checkOutDate">
                <b>Check-out Date</b>
              </label>
              <input
                  className="inputBlank"
                  type="date"
                  name="checkOutDate"
                  value={checkOutDate}
                  onChange={(e) => setCheckOutDate(e.target.value)}
                  required
              />

              <label htmlFor="hasPaid">
                <b>Has Paid</b>
              </label>
              <input
                  className="checkmark"
                  type="checkbox"
                  name="hasPaid"
                  checked={hasPaid}
                  onChange={(e) => setHasPaid(e.target.checked)}
              />
              <br />

              <button type="submit">Confirm Rent</button>
            </div>
          </form>
          <b>Your Booking Information:</b>
          <p>
            Booking ID: {location.state.booking_id}, Room ID:{" "}
            {location.state.room_id}, Booking Date: {location.state.booking_date},
            Hotel Address: {location.state.hotel_address}, Capacity:{" "}
            {location.state.capacity}, Price: {location.state.price}
          </p>

          <b>Renting Entries:</b>
          <ul>
            {rentingEntries.map((entry, index) => (
                <li key={index}>
                  Renting ID: {entry.renting_id}, Customer ID: {entry.customer_id}, Room ID: {entry.room_id}, Check-in Date: {entry.checkin_date}, Check-out Date: {entry.checkout_date}
                </li>
            ))}
          </ul>
        </div>
      </AnimationFadeIn>
  );
};

export default RentingPage;



