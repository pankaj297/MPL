import React from "react";
import styles from "./design/Home.module.css";
import { Gallery } from "./Gallery";

export const Home = () => {
  return (
    <>
      <div className={styles.homeContainer}>
        {/* Background video - covers whole hero area */}
        <video
          className={styles.backgroundVideo}
          src="./images/video1.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="./images/app1.png"
        >
          Your browser does not support the video tag.
        </video>

        {/* subtle dark overlay to keep text readable */}
        <div className={styles.videoOverlay} />

        <div className={styles.heroContent}>
          {/* optional hero text if you want later */}
          {/* <h1>Malkheda Premier League</h1>
          <p>Experience the Spirit of Cricket</p> */}
        </div>
      </div>

      {/* About Section */}
      <div className={styles.aboutSection}>
        <div className={styles.aboutContent}>
          <h2>About MPL</h2>
          <p>
            बंजara समाजाची एक अत्यंत सुंदर क्रिकेट स्पर्धा यंदा मालखेडा गावात
            आयोजित करण्यात येत आहे. मालखेडा प्रीमियर लीग स्पर्धेचे हे दुसरे वर्ष
            असून ही केवळ एक क्रिकेट स्पर्धा नसून, गावातील लोकांना एकत्र आणण्याचा
            आणि एकजूट वाढवण्याचा उपक्रम आहे. <br /> आपल्यामध्ये व आपल्या गावातील
            युवा वर्गामध्ये बंधुत्वाची, सहकार्याची, आणि एकात्मतेची भावना निर्माण
            व्हावी, हा या उपक्रमाचा मुख्य उद्देश आहे. अशा स्पर्धांमुळे आपल्या
            गावातील प्रत्येक स्तरावरील युवा खेळाडूंना एक नवा आणि सशक्त
            प्लॅटफॉर्म उपलब्ध होईल, यासाठी आयोजक कायमच प्रयत्नशील असतील. <br />
            तरी सर्वांनी मोठ्या संख्येने आणि उत्स्फूर्तपणे या क्रिकेट महोत्सवात
            सहभागी होऊन आपल्या गावाची एकता दाखवावी आणि या उपक्रमाला यशस्वी
            बनवावे!
          </p>
          <a href="/about" className={styles.learnMoreBtn}>
            About MPL
          </a>
        </div>

        {/* Responsive video block (keeps aspect ratio & scales) */}
        <div className={styles.aboutMedia}>
          <div className={styles.videoWrapper}>
            <video
              className={styles.aboutVideo}
              src="./images/video2.mp4"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              poster="./images/g6.jpeg"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>

      <Gallery />
    </>
  );
};
