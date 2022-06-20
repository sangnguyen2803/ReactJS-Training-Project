import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./Navbar.scss";

function Navbar(props) {
  return (
    <div className="navbar-container">
      <Link to="employees" className="navbar-logo">
        Employee Management
      </Link>
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
