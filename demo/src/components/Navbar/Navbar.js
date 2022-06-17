import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./Navbar.scss";

function Navbar(props) {
  return (
    <div className="navbar-container">
      <span className="navbar-logo">Employee Management</span>
      <div className="link-wrapper">
        <Link to="employees" className="navbar-item">
          Employees
        </Link>
        <Link to="team" className="navbar-item">
          Team
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
