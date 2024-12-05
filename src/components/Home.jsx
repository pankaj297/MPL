import React from "react";
import "./design/Home.css";
import { Gallery } from "./Gallery";

export const Home = () => {
  return (
    <>
      <div className="home-container">
        <video
          className="background-video"
          src="./images/video1.mp4"
          autoPlay
          loop
          muted
          playsInline
        ></video>
      </div>

      {/* About Section */}
      <div className="about-section">
        <div className="about-content">
          <h2>About MPL</h2>
          <p>
            बंजारा समाजाची एक अत्यंत सुंदर क्रिकेट स्पर्धा यंदा मालखेडा गावात
            आयोजित करण्यात येत आहे. मालखेडा प्रीमियर लीग स्पर्धेचे हे दुसरे वर्ष
            असून ही केवळ एक क्रिकेट स्पर्धा नसून, गावातील लोकांना एकत्र आणण्याचा
            आणि एकजूट वाढवण्याचा उपक्रम आहे. <br /> आपल्यामध्ये व आपल्या गावातील युवा
            वर्गामध्ये बंधुत्वाची, सहकार्याची, आणि एकात्मतेची भावना निर्माण
            व्हावी, हा या उपक्रमाचा मुख्य उद्देश आहे. अशा स्पर्धांमुळे आपल्या
            गावातील प्रत्येक स्तरावरील युवा खेळाडूंना एक नवा आणि सशक्त
            प्लॅटफॉर्म उपलब्ध होईल, यासाठी आयोजक कायमच प्रयत्नशील असतील.  <br />तरी
            सर्वांनी मोठ्या संख्येने आणि उत्स्फूर्तपणे या क्रिकेट महोत्सवात
            सहभागी होऊन आपल्या गावाची एकता दाखवावी आणि या उपक्रमाला यशस्वी
            बनवावे!
          </p>
          <button>Learn More</button>
        </div>
        <div className="about-img">
          <img src="./images/g1.jpg" alt="About Image" />
        </div>
      </div>
      <Gallery />
    </>
  );
};
