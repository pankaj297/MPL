import React, { useState } from "react";
import styles from "./design/Gallery.module.css";

const images = [
  { id: 1, src: "./images/g1.jpeg", alt: "MPL Event" },
  { id: 2, src: "./images/g2.jpeg", alt: "MPL Event" },
  { id: 3, src: "./images/g3.jpeg", alt: "MPL Event" },
  { id: 4, src: "./images/g4.jpeg", alt: "MPL Event" },
  { id: 5, src: "./images/g5.jpeg", alt: "MPL Event" },
  { id: 6, src: "./images/g6.jpeg", alt: "MPL Event" },
  { id: 7, src: "./images/g7.jpeg", alt: "MPL Event" },
  { id: 8, src: "./images/g8.jpeg", alt: "MPL Event" },
  { id: 9, src: "./images/g9.jpeg", alt: "MPL Event" },
  { id: 10, src: "./images/g10.jpeg", alt: "MPL Event" },
  { id: 11, src: "./images/g11.jpeg", alt: "MPL Event" },
  { id: 12, src: "./images/g12.jpeg", alt: "MPL Event" },
  { id: 13, src: "./images/g13.jpg", alt: "MPL Event" },
  { id: 14, src: "./images/g14.jpg", alt: "MPL Event" },
  { id: 15, src: "./images/g15.jpg", alt: "MPL Event" },
  { id: 16, src: "./images/g16.jpg", alt: "MPL Event" },
  { id: 17, src: "./images/g17.jpg", alt: "MPL Event" },
  { id: 18, src: "./images/g18.jpeg", alt: "MPL Event" },
  { id: 19, src: "./images/g19.jpg", alt: "MPL Event" },
  { id: 20, src: "./images/g20.jpeg", alt: "MPL Event" },
  // { id: 21, src: "./images/g21.jpg", alt: "MPL Event" },
  // { id: 22, src: "./images/g22.jpeg", alt: "MPL Event" },
  // { id: 21, src: "./images/g9.jpg", alt: "MPL Event" },
  // { id: 22, src: "./images/g10.jpg", alt: "MPL Event" },
  // { id: 23, src: "./images/g11.jpg", alt: "MPL Event" },
  // { id: 24, src: "./images/g12.jpg", alt: "MPL Event" },
];

export const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const openImage = (image) => {
    setSelectedImage(image);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <div className={styles.galleryPage}>
      <div className={styles.gallerySection}>
        <h2>Gallery</h2>
        <p className={styles.gallerySubtitle}>Moments from MPL 2024</p>
        <div className={styles.galleryGrid}>
          {images.map((image) => (
            <div
              key={image.id}
              className={styles.galleryItem}
              onClick={() => openImage(image)}
            >
              <img src={image.src} alt={image.alt} />
              <div className={styles.imageOverlay}>
                <span className={styles.viewIcon}>👁️</span>
              </div>
            </div>
          ))}
        </div>

        {selectedImage && (
          <div className={styles.modalOverlay} onClick={closeImage}>
            <div className={styles.modalContent} onClick={stopPropagation}>
              <span className={styles.closeButton} onClick={closeImage}>
                &times;
              </span>
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className={styles.modalImage}
              />
              <div className={styles.imageInfo}>
                <p>{selectedImage.alt}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

