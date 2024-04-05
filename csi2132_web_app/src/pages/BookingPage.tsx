import { useState } from "react";
import { useLocation } from "react-router-dom";
import AnimationFadeIn from "../components/AnimationFadeIn";

const BookingPage = () => {
  const location = useLocation();
  const [customerId, setCustomerId] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [bookingId, setBookingId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        customerId: parseInt(customerId),
        bookingDate,
        bookingId: parseInt(bookingId),
        roomId: location.state.room_id,
      };

      const response = await fetch("http://localhost:3000/bookinginsert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Booking successful");
        // Handle success scenario
      } else {
        console.error("Failed to book room");
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

            <label htmlFor="bookingDate">
              <b>Booking Date</b>
            </label>
            <input
              className="inputBlank"
              type="date"
              name="bookingDate"
              value={bookingDate}
              onChange={(e) => setBookingDate(e.target.value)}
              required
            />

            <label htmlFor="bookingId">
              <b>Booking ID</b>
            </label>
            <input
              className="inputBlank"
              type="number"
              placeholder="Enter Booking ID"
              name="bookingId"
              value={bookingId}
              onChange={(e) => setBookingId(e.target.value)}
              min={0}
              required
            />

            <button type="submit">Book Room</button>
          </div>
        </form>

        <p>
          Room ID: {location.state.room_id}, Capacity: {location.state.capacity}
          , Room Number: {location.state.room_number}, Hotel Address:{" "}
          {location.state.hotel_address}, Price: {location.state.price},
          Amenities: {location.state.amenities}, View Type:{" "}
          {location.state.view_type}, Can Extend:{" "}
          {location.state.can_extend ? "Yes" : "No"}
        </p>
        <div className="testing"></div>
      </div>
    </AnimationFadeIn>
  );
};

export default BookingPage;
