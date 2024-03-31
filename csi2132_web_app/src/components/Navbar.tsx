import { Link } from "react-router-dom";
import "../css/Navbar.css";

/**
 * This function returns a navbar component for the website.
 * @returns the navbar component
 */
const Navbar = () => {
  return (
    <nav
      className="navbar navbar-expand sticky-top bg-primary "
      data-bs-theme="dark"
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img className="logo" src="/react.svg" />
        </Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Customer
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="page"
                to="/employee"
              >
                Employee
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="page"
                to="/customer-input"
              >
                Change Customer
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="page"
                to="/employee-input"
              >
                Change Employee
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="page"
                to="/hotel-input"
              >
                Change Hotel
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="page"
                to="/room-input"
              >
                Change Room
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
