import React, { useState } from "react";
import "./design/Header.css";

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
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Gallery</a>
            </li>
            <li>
              <a href="#">Register</a>
            </li>
            <li>
              <a href="#">Matches</a>
            </li>
            <li>
              <a href="#">Live</a>
            </li>
            <li>
              <a href="#">Teams</a>
            </li>
            <li>
              <a href="#">Update</a>
            </li>
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
