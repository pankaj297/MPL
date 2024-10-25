import React, { useState } from "react";
import "./design/Header.css";
import { Link } from "react-router-dom";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle menu function
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className="header header-section">
        {/* Title and Logo */}
        <div className="title-logo">
          <img src="./images/logo1.png" alt="logo" className="logo" />
          <h2>MPL</h2>
        </div>
        {/*  icon for small devices */}
        <div className="toggle-btn" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Navigation List */}
        <div className={`list-nav ${isMenuOpen ? "active" : ""}`} id="navbar">
          <ul className="nav-links">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/gallary">Gallery</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/matches">Matches</Link>
            </li>
            <li>
              <Link to="/live">Live</Link>
            </li>
            <li>
              <Link to="/teams">Teams</Link>
            </li>
            <li>
              <Link to="/showUpdate">Update</Link>
            </li>
            {/* <li>
              <Link to="/insertUpdate">Insert Update</Link>
            </li> */}
            <li>
              <button>Admin</button>
            </li>
          </ul>
        </div>
      </div>
      {/* header header-section end */}
    </>
  );
};
