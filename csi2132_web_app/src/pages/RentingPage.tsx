import AnimationFadeIn from "../components/AnimationFadeIn";
import { useLocation } from "react-router-dom";

const RentingPage = () => {
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

            <label htmlFor="rent">
              <b>Rent ID</b>
            </label>
            <input
              className="inputBlank"
              type="number"
              placeholder="Enter Rent ID"
              name="rent"
              min={0}
              required
            />

            <label htmlFor="check-in">
              <b>Check-in Date</b>
            </label>
            <input
              className="inputBlank"
              type="date"
              name="check-in"
              required
            />

            <label htmlFor="check-out">
              <b>Check-out Date</b>
            </label>
            <input
              className="inputBlank"
              type="date"
              name="check-out"
              required
            />

            <button type="submit">Confirm Rent</button>
          </div>
        </form>
        <p>
          Booking ID: {location.state.booking_id}, Room ID:{" "}
          {location.state.room_id}, Booking Date: {location.state.booking_date},
          Hotel Address: {location.state.hotel_address}, Capacity:{" "}
          {location.state.capacity}, Price: {location.state.price}
        </p>
      </div>
    </AnimationFadeIn>
  );
};

export default RentingPage;
