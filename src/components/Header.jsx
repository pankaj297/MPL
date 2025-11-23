// src/components/Header.jsx (or wherever you keep it)
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styles from "./design/Header.module.css";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 100);
    };

    document.addEventListener("click", handleClickOutside);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`${styles.headerSection} ${isScrolled ? styles.scrolled : ""}`}
    >
      <div className={styles.headerContainer}>
        {/* Title and Logo */}
        <div className={styles.titleLogo}>
          <img
            src="./images/logo1.png"
            alt="MPL Logo"
            className={styles.logo}
          />
          <h2>MPL</h2>
        </div>

        {/* Mobile Hamburger Icon */}
        <button
          type="button"
          className={styles.toggleBtn}
          onClick={toggleMenu}
          ref={buttonRef}
          aria-label="Toggle navigation menu"
        >
          <span className={isMenuOpen ? styles.open : ""}></span>
          <span className={isMenuOpen ? styles.open : ""}></span>
          <span className={isMenuOpen ? styles.open : ""}></span>
        </button>

        {/* Navigation Menu */}
        <nav
          className={`${styles.navMenu} ${isMenuOpen ? styles.active : ""}`}
          ref={menuRef}
        >
          <ul className={styles.navLinks}>
            <li>
              <Link to="/" onClick={closeMenu}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" onClick={closeMenu}>
                About
              </Link>
            </li>
            {/* <li>
              <Link to="/gallery" onClick={closeMenu}>
                Gallery
              </Link>
            </li> */}
            <li>
              <Link to="/register" onClick={closeMenu}>
                Register
              </Link>
            </li>
            <li>
              <Link to="/top" onClick={closeMenu}>
                Top Player
              </Link>
            </li>
            <li>
              <Link to="/matches" onClick={closeMenu}>
                Matches
              </Link>
            </li>
            <li>
              <Link to="/live" onClick={closeMenu}>
                Live
              </Link>
            </li>
            <li>
              <Link to="/teams" onClick={closeMenu}>
                Teams
              </Link>
            </li>
            <li>
              <Link to="/table" onClick={closeMenu}>
                Points Table
              </Link>
            </li>
            <li>
              <Link to="/schedule" onClick={closeMenu}>
                Schedule
              </Link>
            </li>
            {/* <li>
              <Link to="/price" onClick={closeMenu}>
                Prize Money
              </Link>
            </li> */}
            <li>
              <Link to="/login" className={styles.adminBtn} onClick={closeMenu}>
                Admin
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
