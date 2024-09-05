import React, { useState, useRef } from "react";
import "./Tooltip.css"; // Import the CSS file if you have one for styling

const Tooltip = () => {
  const [showFileInput, setShowFileInput] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleIconClick = (e) => {
    e.preventDefault(); // Prevent the default link behavior
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Trigger the file input click
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file)); // Create a URL for the selected image
      setShowFileInput(false); // Hide the file input after selection
    }
  };

  return (
    <div className="tooltip-container">
      <div className="button-content">
        <span className="text">Upload Here</span>
        <svg
          className="upload-icon"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 16 16"
        >
          <path
            fill="#ffff"
            d="M1 8C1 4.13401 4.13401 1 8 1C11.866 1 15 4.13401 15 8C15 11.866 11.866 15 8 15C4.13401 15 1 11.866 1 8ZM7.80861 4.53794C7.75051 4.56198 7.69602 4.59744 7.64857 4.64433L7.64625 4.64665L5.14645 7.14645C4.95118 7.34171 4.95118 7.65829 5.14645 7.85355C5.34171 8.04882 5.65829 8.04882 5.85355 7.85355L7.5 6.20711V11C7.5 11.2761 7.72386 11.5 8 11.5C8.27614 11.5 8.5 11.2761 8.5 11V6.20711L10.1464 7.85355C10.3417 8.04882 10.6583 8.04882 10.8536 7.85355C11.0488 7.65829 11.0488 7.34171 10.8536 7.14645L8.35375 4.64665L8.35143 4.64433C8.26112 4.55509 8.13699 4.5 8 4.5C7.93221 4.5 7.86756 4.51349 7.80861 4.53794Z"
          />
        </svg>
      </div>
      <div className="tooltip-content">
        <div className="social-icons">
          <button className="social-icon twitter" onClick={handleIconClick}>
            X Rays
          </button>
          <button className="social-icon facebook" onClick={handleIconClick}>
            MRI
          </button>
          <button className="social-icon linkedin" onClick={handleIconClick}>
            CT Scan
          </button>
        </div>
      </div>

      {/* File input to select an image */}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: "none" }}
        ref={fileInputRef}
      />

      {/* Display the selected image if any */}
      {selectedImage && (
        <div className="image-preview">
          <img
            src={selectedImage}
            alt="Selected"
            style={{ width: "100px", height: "100px" }}
          />
        </div>
      )}
    </div>
  );
};

export default Tooltip;
