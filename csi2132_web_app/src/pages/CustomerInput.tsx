import AnimationFadeIn from "../components/AnimationFadeIn";
import "../css/InputForm.css";

const CustomerInput = () => {
  return (
    <AnimationFadeIn>
      <div>
        <form className="inputForm" action="action_page.php" method="post">
          <div className="container">
            <label htmlFor="id">
              <b>Customer ID</b>
            </label>
            <input
              className="inputBlank"
              type="number"
              placeholder="Enter Customer ID"
              name="id"
              min={0}
              required
            />
            <label htmlFor="name">
              <b>Customer Name</b>
            </label>
            <input
              className="inputBlank"
              type="text"
              placeholder="Enter Full Name"
              name="name"
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

            <label htmlFor="date">
              <b>Date of Registration</b>
            </label>
            <input className="inputBlank" type="date" name="date" required />

            <button type="submit">Insert</button>
            <button type="submit">Delete</button>
            <button type="submit">Update</button>
          </div>
        </form>
      </div>
    </AnimationFadeIn>
  );
};

export default CustomerInput;
