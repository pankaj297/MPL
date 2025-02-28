import React, { useState } from "react";
import "./AdminDesign/Sidebar.css";
import { Link } from "react-router-dom";

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <nav className="sidebar-nav">
          <ul>
            <li>
              <Link to="/admin">Admin Home</Link>
            </li>
            <li>
              <Link to="/admin/allplayers">All Register Players Table</Link>
            </li>
            <li>
              <Link to="/admin/liveauction">Live Auction Page</Link>
            </li>
            {/* <li>
              <Link to="/admin/finalteamplayers">Final Team Players</Link>
            </li> */}
            <li>
              <Link to="/admin/addmatches">Add Upcoming Matches</Link>
            </li>
            {/* <li>
              <Link to="/admin/addupdate">Admin Update Info</Link>
            </li> */}
            <li>
              <Link to="/admin/soldPlayer">Total Selected Players</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="toggle-button" onClick={toggleSidebar}>
        {isOpen ? "Close" : "Open"} Menu
      </div>
    </>
  );
};
