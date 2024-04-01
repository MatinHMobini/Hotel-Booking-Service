import { useLocation } from "react-router-dom";
import AnimationFadeIn from "../components/AnimationFadeIn";

const BookingPage = () => {
  const location = useLocation();
  return (
    <AnimationFadeIn>
      <div>
        <form className="inputForm" action="action_page.php" method="post">
          <div className="container">
            <label htmlFor="name">
              <b>Customer ID</b>
            </label>
            <input
              className="inputBlank"
              type="number"
              placeholder="Enter Customer ID"
              name="name"
              min={0}
              required
            />

            <label htmlFor="book-date">
              <b>Booking Date</b>
            </label>
            <input
              className="inputBlank"
              type="date"
              name="book-date"
              required
            />

            <label htmlFor="book-id">
              <b>Booking ID</b>
            </label>
            <input
              className="inputBlank"
              type="number"
              placeholder="Enter Booking ID"
              name="book-id"
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
      </div>
    </AnimationFadeIn>
  );
};

export default BookingPage;
