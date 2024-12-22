
import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css"; 

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">ElySium</div>
      <ul className="nav-links">
        <li>
          <Link to="/" className="nav-item">
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/about" className="nav-item">
            About
          </Link>
        </li>
        <li>
          <Link to="/contact" className="nav-item">
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
