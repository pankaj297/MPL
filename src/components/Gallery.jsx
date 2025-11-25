import React, { useState } from "react";
import styles from "./design/Gallery.module.css";

const images = [
  { id: 1, src: "./images/g1.jpeg", alt: "MPL Event" },
  { id: 2, src: "./images/g2.jpeg", alt: "MPL Event" },
  { id: 3, src: "./images/g3.jpeg", alt: "MPL Event" },
  { id: 4, src: "./images/g4.jpeg", alt: "MPL Event" },
  { id: 6, src: "./images/g6.jpeg", alt: "MPL Event" },
  { id: 25, src: "./images/g25.jpeg", alt: "MPL Event" },
  { id: 26, src: "./images/g26.jpeg", alt: "MPL Event" },
  { id: 5, src: "./images/g5.jpeg", alt: "MPL Event" },
  { id: 29, src: "./images/g29.jpeg", alt: "MPL Event" },
  { id: 28, src: "./images/g28.jpeg", alt: "MPL Event" },
  { id: 24, src: "./images/g24.jpeg", alt: "MPL Event" },
  { id: 7, src: "./images/g7.jpeg", alt: "MPL Event" },
  { id: 21, src: "./images/g21.jpeg", alt: "MPL Event" },
  { id: 8, src: "./images/g8.jpeg", alt: "MPL Event" },
  { id: 9, src: "./images/g9.jpeg", alt: "MPL Event" },
  { id: 10, src: "./images/g10.jpeg", alt: "MPL Event" },
  { id: 11, src: "./images/g11.jpeg", alt: "MPL Event" },
  { id: 12, src: "./images/g12.jpeg", alt: "MPL Event" },
  { id: 13, src: "./images/g13.jpg", alt: "MPL Event" },
  { id: 18, src: "./images/g18.jpeg", alt: "MPL Event" },
  { id: 19, src: "./images/g19.jpg", alt: "MPL Event" },
  { id: 20, src: "./images/g20.jpeg", alt: "MPL Event" },
  { id: 22, src: "./images/g22.jpeg", alt: "MPL Event" },
  { id: 23, src: "./images/g23.jpeg", alt: "MPL Event" },
  { id: 27, src: "./images/g27.jpeg", alt: "MPL Event" },
  { id: 30, src: "./images/g30.jpeg", alt: "MPL Event" },
  { id: 32, src: "./images/g32.jpeg", alt: "MPL Event" },
  { id: 31, src: "./images/g31.jpeg", alt: "MPL Event" },
  { id: 14, src: "./images/g14.jpg", alt: "MPL Event" },
  { id: 15, src: "./images/g15.jpg", alt: "MPL Event" },
  { id: 16, src: "./images/g16.jpg", alt: "MPL Event" },
  { id: 17, src: "./images/g17.jpg", alt: "MPL Event" },
];

export const Gallery = () => {
  const pageSize = 10;
  const totalPages = Math.ceil(images.length / pageSize);

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);

  const startIndex = (currentPage - 1) * pageSize;
  const currentImages = images.slice(startIndex, startIndex + pageSize);

  const openImage = (image) => setSelectedImage(image);
  const closeImage = () => setSelectedImage(null);
  const stopPropagation = (e) => e.stopPropagation();

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    // window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={styles.galleryPage}>
      <div className={styles.gallerySection}>
        <h2>Gallery</h2>
        <p className={styles.gallerySubtitle}>Moments from MPL 2024</p>

        <div className={styles.galleryGrid}>
          {currentImages.map((image) => (
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

        {/* Pagination controls */}
        <div className={styles.pagination}>
          <button
            className={styles.pageBtn}
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Previous page"
          >
            ← Prev
          </button>

          <div className={styles.pageNumbers}>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                className={`${styles.pageNumber} ${
                  p === currentPage ? styles.activePage : ""
                }`}
                onClick={() => goToPage(p)}
                aria-current={p === currentPage ? "page" : undefined}
              >
                {p}
              </button>
            ))}
          </div>

          <button
            className={styles.pageBtn}
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Next page"
          >
            Next →
          </button>
        </div>

        {/* Modal */}
        {selectedImage && (
          <div className={styles.modalOverlay} onClick={closeImage}>
            <div className={styles.modalContent} onClick={stopPropagation}>
              <button
                className={styles.closeButton}
                onClick={closeImage}
                aria-label="Close"
              >
                &times;
              </button>
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
