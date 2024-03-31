import AnimationFadeIn from "../components/AnimationFadeIn";
import "../css/InputForm.css";

const EmployeeInput = () => {
  return (
    <AnimationFadeIn>
      <div>
        <form className="inputForm" action="action_page.php" method="post">
          <div className="container">
            <label htmlFor="name">
              <b>Employee Name</b>
            </label>
            <input
              className="inputBlank"
              type="text"
              placeholder="Enter Full Name"
              name="name"
              required
            />

            <label htmlFor="sin">
              <b>SIN Number</b>
            </label>
            <input
              className="inputBlank"
              type="number"
              placeholder="Enter SIN Number"
              name="sin"
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

            <label htmlFor="role">
              <b>Role</b>
            </label>
            <input
              className="inputBlank"
              type="text"
              placeholder="Enter Role"
              name="role"
              min={0}
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

            <button type="submit">Insert</button>
            <button type="submit">Delete</button>
            <button type="submit">Update</button>
          </div>
        </form>
      </div>
    </AnimationFadeIn>
  );
};

export default EmployeeInput;
