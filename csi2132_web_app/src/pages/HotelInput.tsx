import AnimationFadeIn from "../components/AnimationFadeIn";
import Dropdown from "../components/Dropdown";
import "../css/InputForm.css";

const HotelInput = () => {
  return (
    <AnimationFadeIn>
      <div>
        <form className="inputForm" action="action_page.php" method="post">
          <div className="container">
            <label htmlFor="id">
              <b>Hotel ID</b>
            </label>
            <input
              className="inputBlank"
              type="number"
              placeholder="Enter Hotel ID"
              name="id"
              min={0}
              required
            />

            <label htmlFor="address">
              <b>Address</b>
            </label>
            <input
              className="inputBlank"
              type="text"
              placeholder="Enter Address"
              name="address"
              required
            />

            <label htmlFor="category">
              <b>Category</b>
            </label>
            <select className="inputBlank" name="category">
              <option value="1">{"\u2B50"}</option>
              <option value="2">{"\u2B50 \u2B50"}</option>
              <option value="3">{"\u2B50 \u2B50 \u2B50"}</option>
              <option value="4">{"\u2B50 \u2B50 \u2B50 \u2B50"}</option>
              <option value="5">{"\u2B50 \u2B50 \u2B50 \u2B50 \u2B50"}</option>
            </select>

            <label htmlFor="email">
              <b>Email Address</b>
            </label>
            <input
              className="inputBlank"
              type="text"
              placeholder="Enter Email Address"
              name="email"
              required
            />

            <label htmlFor="phone-number">
              <b>Phone Number</b>
            </label>
            <input
              className="inputBlank"
              type="number"
              placeholder="Enter Phone Number"
              name="phone-number"
              min={0}
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

export default HotelInput;
