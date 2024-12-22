import React from "react";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p>
          &copy; {new Date().getFullYear()} ELYSIUM. All rights
          reserved.
        </p>
        <ul className="footer-links">
          <li>
            <a href="/">Privacy Policy</a>
          </li>
          <li>
            <a href="/">Terms of Service</a>
          </li>
          <li>
            <a href="/contact">Contact Us</a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
