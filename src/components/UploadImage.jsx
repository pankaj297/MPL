import React, { useState } from "react";
import "./design/UploadImage.css";

export const UploadImage = ({ setMatchImages }) => {
  const [images, setImages] = useState([]); // Tracks uploaded images

  // Handle image uploads
  const handleUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files);
    setImages([...images, ...uploadedFiles]); // Add uploaded images to the list
  };

  // Handle image deletion
  const handleDelete = (index) => {
    const filteredImages = images.filter((_, i) => i !== index); // Filter out the image
    setImages(filteredImages); // Update the image state
    setMatchImages((prevImages) => prevImages.filter((_, i) => i !== index)); // Sync deletion with MatchImage component
  };

  // Handle selecting images for "Today’s Match"
  const handleSelectForMatch = (image) => {
    setMatchImages((prevImages) => {
      if (prevImages.length < 5 && !prevImages.includes(image)) {
        return [...prevImages, image]; // Allow only two images for the match
      }
      return prevImages;
    });
  };

  return (
    <>
      <div className="upload-image-section">
        <h2>Upload Poster of MPL Today’s Matches</h2>
        <input
          type="file"
          multiple
          onChange={handleUpload}
          className="file-input"
        />
        <div className="image-grid">
          {images.map((image, index) => (
            <div key={index} className="image-item">
              {/* Display the uploaded image */}
              <img
                src={URL.createObjectURL(image)}
                alt={`Uploaded ${index}`}
                className="uploaded-img"
              />

              {/* Buttons for deleting or selecting the image */}
              <button
                onClick={() => handleDelete(index)}
                className="delete-btn"
              >
                Delete
              </button>
              <button
                onClick={() => handleSelectForMatch(image)}
                className="select-btn"
              >
                Select for Match
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
