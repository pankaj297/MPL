import React from "react";
import styles from "./design/Footer.module.css";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footerSection}>
      <div className={styles.footerBigCard}>
        {/* Left Section - Developers */}
        <div className={styles.infoSection}>
          <div className={styles.logo}>
            <span className={styles.authors}>Developers</span>
            <br />
            <div className={styles.nameGroup}>
              <span className={styles.firstName}>Pankaj</span>
              <span className={styles.lastName}>Naik</span>
            </div>
            <div className={styles.nameGroup}>
              <span className={styles.firstName}>Abbas</span>
              <span className={styles.lastName}>Gawali</span>
            </div>
            {/* <div className={styles.nameGroup}>
              <span className={styles.firstName}>Harshal</span>
              <span className={styles.lastName}>Bhangale</span>
            </div> */}
          </div>

          <p className={styles.copyright}>
            ACreations &copy; All Rights Reserved - {currentYear}
          </p>

          <div className={styles.contactLinks}>
            <a
              href="mailto:pankajnaik958@gmail.com"
              className={styles.contactIcon}
            >
              <i className="fa-solid fa-envelope"></i>
            </a>
            <a href="tel:+917276028036" className={styles.contactIcon}>
              <i className="fa-solid fa-phone-flip"></i>
            </a>
          </div>

          <div className={styles.socialLinks}>
            <h3>Follow Us</h3>
            <div className={styles.socialIcons}>
              <a
                href="https://www.linkedin.com/in/pankaj-naik-788549262"
                className={styles.socialIcon}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-linkedin"></i>
              </a>
              <a
                href="https://github.com/pankaj297"
                className={styles.socialIcon}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-github"></i>
              </a>
              <a
                href="https://www.instagram.com/pankajnaik53"
                className={styles.socialIcon}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a
                href="https://twitter.com/Pankajnaik077?s=09"
                className={styles.socialIcon}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-twitter"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Center Section - MPL Logo */}
        <div className={styles.mplSection}>
          <h4>
            {" "}
            <span className={styles.M}>Malkheda</span>{" "}
            <span className={styles.P}>Premier</span>{" "}
            <span className={styles.L}>League</span>
          </h4>
          <div className={styles.logoContainer}>
            <img
              src="./images/app1.png"
              alt="MPL Logo"
              className={styles.mplLogo}
            />
          </div>
          <p className={styles.mplTagline}>Uniting Through Cricket</p>
        </div>

        {/* Right Section - MPL Authors */}
        <div className={styles.infoSection}>
          <div className={styles.logo}>
            <span className={styles.authors}>MPL Organizers</span>
            <br />
            <div className={styles.nameGroup}>
              <div className={styles.nameGroup}>
                <span className={styles.firstName}>Atul</span>
                <span className={styles.lastName}>Naik</span>
              </div>
              <span className={styles.firstName}>Baban</span>
              <span className={styles.lastName}>Naik</span>
            </div>
          </div>

          <div className={styles.contactLinks}>
            <a href="tel:+917820874167" className={styles.contactIcon}>
              <i className="fa-solid fa-phone-flip"></i>
            </a>
            <a href="tel:+917276746341" className={styles.contactIcon}>
              <i className="fa-solid fa-phone-flip"></i>
            </a>
          </div>

          <div className={styles.socialLinks}>
            <h3>Connect</h3>
            <div className={styles.socialIcons}>
              <a
                href="https://www.instagram.com/_bunty_naik_17"
                className={styles.socialIcon}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p>Made with ❤️ for Cricket Lovers</p>
      </div>
    </footer>
  );
};
