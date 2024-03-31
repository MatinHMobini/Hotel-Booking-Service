import AnimationFadeIn from "../components/AnimationFadeIn";
import "../css/InputForm.css";

const RoomInput = () => {
  return (
    <AnimationFadeIn>
      <div>
        <form className="inputForm" action="action_page.php" method="post">
          <div className="container">
            <label htmlFor="uname">
              <b>Room Capacity</b>
            </label>
            <input
              className="inputBlank"
              type="text"
              placeholder="Enter Username"
              name="uname"
              required
            />

            <label htmlFor="psw">
              <b>Password</b>
            </label>
            <input
              className="inputBlank"
              type="password"
              placeholder="Enter Password"
              name="psw"
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
