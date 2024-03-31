import AnimationFadeIn from "../components/AnimationFadeIn";
import "../css/InputForm.css";

const RoomInput = () => {
  return (
    <AnimationFadeIn>
      <div>
        <form className="inputForm" action="action_page.php" method="post">
          <div className="container">
            <label htmlFor="id">
              <b>Room ID</b>
            </label>
            <input
              className="inputBlank"
              type="number"
              placeholder="Enter Room ID"
              name="id"
              min={0}
              required
            />

            <label htmlFor="room-number">
              <b>Room Number</b>
            </label>
            <input
              className="inputBlank"
              type="number"
              placeholder="Enter Room Number"
              name="room-number"
              min={0}
              required
            />

            <label htmlFor="price">
              <b>Price</b>
            </label>
            <input
              className="inputBlank"
              type="number"
              placeholder="Enter Price"
              name="price"
              min={0}
              required
            />

            <label htmlFor="hotel-address">
              <b>Hotel Address</b>
            </label>
            <input
              className="inputBlank"
              type="text"
              placeholder="Enter Hotel Address"
              name="hotel-address"
              required
            />

            <label htmlFor="hotel-id">
              <b>Hotel ID</b>
            </label>
            <input
              className="inputBlank"
              type="number"
              placeholder="Enter Hotel ID"
              name="hotel-id"
              min={0}
              required
            />

            <label htmlFor="amenities">
              <b>Amenities</b>
            </label>
            <input
              className="inputBlank"
              type="text"
              placeholder="Enter Amenities"
              name="amenities"
              required
            />

            <label htmlFor="capacity">
              <b>Capacity</b>
            </label>
            <input
              className="inputBlank"
              type="number"
              placeholder="Enter Capacity"
              name="capacity"
              min={0}
              required
            />

            <label htmlFor="view">
              <b>View Type</b>
            </label>
            <select className="inputBlank" name="view">
              <option value="1">Sea</option>
              <option value="2">Mountain</option>
            </select>

            <label htmlFor="extend">
              <b>Can Extend</b>
            </label>
            <select className="inputBlank" name="extend">
              <option value="1">Yes</option>
              <option value="2">No</option>
            </select>

            <label htmlFor="damages">
              <b>Damages</b>
            </label>
            <input
              className="inputBlank"
              type="text"
              placeholder="Enter Damages"
              name="damages"
              required
            />

            <button type="submit">Insert</button>
            <button type="submit">Delete</button>
            <button type="submit">Update</button>
          </div>
        </form>
      </div>
    </AnimationFadeIn>
  );
};

export default RoomInput;
