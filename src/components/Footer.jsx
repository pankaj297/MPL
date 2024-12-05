import React from "react";
import "./design/Footer.css";

export const Footer = () => {
  return (
    <>
      <footer className="footer-section">
        <div className="footer-bigcard">
          <div className="info-me">
            <div href="#home">
              <div className="logo">
                <span className="authors">Authors</span>
                <br />
                <span className="pankaj">Pankaj</span>
                <span className="naik">Naik</span>
                <br />
                <span className="pankaj">Abbas</span>
                <span className="naik">Gawali</span>
              </div>
            </div>

            <p>ACreations &copy; All Rights Reserved - 2024</p>
            <div className="call-me">
              <a href="mailto:pankajnaik958@gmail.com" className="icon1">
                <i className="fa-solid fa-envelope"></i>
              </a>
              <a href="tel:+91 7276028036" className="icon1">
                <i className="fa-solid fa-phone-flip"></i>
              </a>
            </div>
            <div className="social-links">
              <h3>Social Links</h3>
              <div className="social-link-content">
                <a
                  href="https://www.linkedin.com/in/pankaj-naik-788549262"
                  className="icon"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa-brands fa-linkedin"></i>
                </a>
                <a
                  href="https://github.com/pankaj297"
                  className="icon"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa-brands fa-github"></i>
                </a>
                <a
                  href="https://www.instagram.com/pankajnaik53"
                  className="icon"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa-brands fa-instagram"></i>
                </a>
                <a
                  href="https://twitter.com/Pankajnaik077?s=09"
                  className="icon"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa-brands fa-twitter"></i>
                </a>
              </div>
            </div>
          </div>

          <div className="mpl-logo">
            <h4>Malkheda Primer League</h4>
            <img
              src="../images/logo1.png"
              alt="MPL Logo"
              className="mpl-logo-img"
            />
          </div>

          <div className="info-me2">
            <div href="#home">
              <div className="logo">
                <span className="authors">MPL Authors</span>
                <br />
                <span className="pankaj">Baban</span>
                <span className="naik">Naik</span>
                <br />
                <span className="pankaj">Vivek</span>
                <span className="naik">Chavan</span>
              </div>
            </div>
            <div className="call-me">
              <a href="tel:+91 7276746341" className="icon1">
                <i className="fa-solid fa-phone-flip"></i>
              </a>
              <a href="tel:+91 9511271868" className="icon1">
                <i className="fa-solid fa-phone-flip"></i>
              </a>
            </div>
            <div className="social-links">
              <h3>Social Links</h3>
              <div className="social-link-content">
                <a
                  href="https://www.instagram.com/_bunty_naik_17"
                  className="icon"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa-brands fa-instagram"></i>
                </a>

                <a
                  href="https://www.instagram.com/vivek_chavan07"
                  className="icon"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa-brands fa-instagram"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );

};
