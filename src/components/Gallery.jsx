import React, { useState } from "react";
import "./design/Gallery.css";
const images = [
  { id: 25, src: "./images/g25.jpeg", alt: "Image 2" },
  { id: 26, src: "./images/g26.jpeg", alt: "Image 3" },
  { id: 1, src: "./images/g17.jpeg", alt: "Image 1" },
  { id: 2, src: "./images/g18.jpeg", alt: "Image 1" },
  { id: 3, src: "./images/g19.jpeg", alt: "Image 1" },
  { id: 4, src: "./images/g20.jpeg", alt: "Image 1" },
  { id: 5, src: "./images/g21.jpeg", alt: "Image 1" },
  { id: 6, src: "./images/g22.jpeg", alt: "Image 1" },
  { id: 7, src: "./images/g23.jpeg", alt: "Image 1" },
  { id: 8, src: "./images/g24.jpeg", alt: "Image 1" },
  { id: 9, src: "./images/g1.jpg", alt: "Image 1" },
  { id: 10, src: "./images/g2.jpg", alt: "Image 2" },
  { id: 11, src: "./images/g4.jpg", alt: "Image 7" },
  { id: 12, src: "./images/g3.jpg", alt: "Image 3" },
  { id: 13, src: "./images/g14.jpeg", alt: "Image 4" },
  { id: 14, src: "./images/g13.jpeg", alt: "Image 7" },
  { id: 15, src: "./images/g5.jpg", alt: "Image 5" },
  { id: 16, src: "./images/g6.jpg", alt: "Image 6" },
  { id: 17, src: "./images/g7.jpg", alt: "Image 7" },
  { id: 18, src: "./images/g5.jpg", alt: "Image 7" },
  { id: 19, src: "./images/g8.jpg", alt: "Image 8" },
  { id: 20, src: "./images/g16.jpeg", alt: "Image 7" },
  { id: 21, src: "./images/g9.jpg", alt: "Image 9" },
  { id: 22, src: "./images/g10.jpg", alt: "Image 10" },
  { id: 23, src: "./images/g11.jpg", alt: "Image 11" },
  { id: 24, src: "./images/g12.jpg", alt: "Image 12" },
];

export const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const openIMG = (image) => {
    setSelectedImage(image);
  };

  const closeIMG = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <div className="gallery-page">
        <div className="gallery-section">
          <h2>Gallery</h2>
          <div className="gallery-grid">
            {images.map((image) => (
              <div
                key={image.id}
                className="gallery-item"
                onClick={() => openIMG(image)}
              >
                <img  src={image.src} alt={image.alt} />
              </div>
            ))}
          </div>
          {selectedImage && (
            <div className="show" onClick={closeIMG}>
              <div className="show-content" onClick={(e) => stopPropegation()}>
                <span className="close" onClick={closeIMG}>
                  &times;
                </span>
                <img
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  className="show-img"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
