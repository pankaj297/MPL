import React, {useState} from "react";
import "./AdminDesign/HeaderAdmin.css";

export const HeaderAdmin = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };


  return (
    <>
      <div className="nav-section">
        <div className="header-left">
          <img src="./images/logo1.png" alt="Logo" className="Admin-logo" />

          <span className="mpl-text">MPL</span>
        </div>
        <div className="header-right">
          <div className="admin-info" onClick={toggleDropdown}>
            <img
              src="./images/pankaj.jpeg"
              alt="Admin"
              className="admin-image"
            />
            <span className="admin-name">pankaj1807</span>
            {dropdownOpen && (
              <div className="dropdown-menu">
                <a href="#profile">Profile</a>
                <a href="#settings">Settings</a>
                <a href="#logout">Logout</a>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
