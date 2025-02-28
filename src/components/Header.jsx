import React, { useState, useEffect, useRef } from "react";
import "./design/Header.css";
import { Link } from "react-router-dom";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null); // Reference for the menu
  const buttonRef = useRef(null); // Reference for the toggle button

  // Toggle menu function
  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  // Close the menu if the user clicks outside of it
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        setIsMenuOpen(false); // Close the menu
      }
    };

    // Add the event listener to detect outside clicks
    document.addEventListener("click", handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="header header-section">
        {/* Title and Logo */}
        <div className="title-logo">
          <img src="./images/logo1.png" alt="logo" className="logo" />
          <h2>MPL</h2>
        </div>

        {/* Icon for small devices */}
        <div className="toggle-btn" onClick={toggleMenu} ref={buttonRef}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Navigation List */}
        <div
          className={`list-nav ${isMenuOpen ? "active" : ""}`}
          id="navbar"
          ref={menuRef}
        >
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
            {/* <li>
              <Link to="/update">Update</Link>
            </li> */}
            <li>
              <Link to="/table">Points Table</Link>
            </li>
            <li>
              <Link to="/schedule">Schedule Matches</Link>
            </li>
            {/* <li>
              <Link to="/political">Investor Profile</Link>
            </li> */}
            <li>
              <Link to="/price">PriceMoney</Link>
            </li>
            <li>
              <Link to="/login" className="admin-btn">
                Admin
              </Link>
            </li>
          </ul>
        </div>
      </div>
      {/* header header-section end */}
    </>
  );
};

//! =================================
// import React, { useState } from "react";
// import "./design/Header.css";
// import { Link } from "react-router-dom";

// export const Header = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   // Toggle menu function
//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   return (
//     <>
//       <div className="header header-section">
//         {/* Title and Logo */}
//         <div className="title-logo">
//           <img src="./images/logo1.png" alt="logo" className="logo" />
//           <h2>MPL</h2>
//         </div>
//         {/*  icon for small devices */}
//         <div className="toggle-btn" onClick={toggleMenu}>
//           <span></span>
//           <span></span>
//           <span></span>
//         </div>

//         ;{/* Navigation List */}
//         <div className={`list-nav ${isMenuOpen ? "active" : ""}`} id="navbar">
//           <ul className="nav-links">
//             <li>
//               <Link to="/">Home</Link>
//             </li>
//             <li>
//               <Link to="/about">About</Link>
//             </li>
//             <li>
//               <Link to="/gallary">Gallery</Link>
//             </li>
//             <li>
//               <Link to="/register">Register</Link>
//             </li>
//             <li>
//               <Link to="/matches">Matches</Link>
//             </li>
//             <li>
//               <Link to="/live">Live</Link>
//             </li>
//             <li>
//               <Link to="/teams">Teams</Link>
//             </li>
//             <li>
//               <Link to="/update">Update</Link>
//             </li>
//             <li>
//               <Link to="/political">Investor Profile</Link>
//             </li>
//             <li>
//               <Link to="/price">PriceMoney</Link>
//             </li>
//             <li>
//               <Link to="/login" className="admin-btn">
//                 Admin
//               </Link>
//             </li>
//           </ul>
//         </div>
//       </div>
//       {/* header header-section end */}
//     </>
//   );
// };
