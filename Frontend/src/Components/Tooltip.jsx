import React, { useState, useRef } from "react";
import "./Tooltip.css"; // Import the CSS file if you have one for styling

const Tooltip = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null); // For storing prediction result
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
      setSelectedImage(file); // Store the image file itself, not just the URL
    }
  };

  const handleAnalyseClick = async () => {
    if (!selectedImage) return;

    const formData = new FormData();
    formData.append("file", selectedImage); // Update key to "file" to match backend

    try {
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const result = await response.json();
      console.log("Analysis result:", result);
      setAnalysisResult(result); // Store the result in state to display later
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="toolTipMain">
      <div className="toolTip">
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
              <button
                className="social-icon facebook"
                onClick={handleIconClick}
              >
                MRI
              </button>
              <button
                className="social-icon linkedin"
                onClick={handleIconClick}
              >
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
                src={URL.createObjectURL(selectedImage)}
                alt="Selected"
                style={{ width: "100px", height: "100px" }}
              />
            </div>
          )}
        </div>

        {selectedImage && (
          <div className="analyseBtn">
            <button className="button2" onClick={handleAnalyseClick}>
              <div className="dots_border"></div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="sparkle"
              >
                <path
                  className="path"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  stroke="black"
                  fill="black"
                  d="M14.187 8.096L15 5.25L15.813 8.096C16.0231 8.83114 16.4171 9.50062 16.9577 10.0413C17.4984 10.5819 18.1679 10.9759 18.903 11.186L21.75 12L18.904 12.813C18.1689 13.0231 17.4994 13.4171 16.9587 13.9577C16.4181 14.4984 16.0241 15.1679 15.814 15.903L15 18.75L14.187 15.904C13.9769 15.1689 13.5829 14.4994 13.0423 13.9587C12.5016 13.4181 11.8321 13.0241 11.097 12.814L8.25 12L11.096 11.187C11.8311 10.9769 12.5006 10.5829 13.0413 10.0423C13.5819 9.50162 13.9759 8.83214 14.186 8.097L14.187 8.096Z"
                ></path>
                <path
                  className="path"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  stroke="black"
                  fill="black"
                  d="M6 14.25L5.741 15.285C5.59267 15.8785 5.28579 16.4206 4.85319 16.8532C4.42059 17.2858 3.87853 17.5927 3.285 17.741L2.25 18L3.285 18.259C3.87853 18.4073 4.42059 18.7142 4.85319 19.1468C5.28579 19.5794 5.59267 20.1215 5.741 20.715L6 21.75L6.259 20.715C6.40725 20.1216 6.71398 19.5796 7.14639 19.147C7.5788 18.7144 8.12065 18.4075 8.714 18.259L9.75 18L8.714 17.741C8.12065 17.5925 7.5788 17.2856 7.14639 16.853C6.71398 16.4204 6.40725 15.8784 6.259 15.285L6 14.25Z"
                ></path>
                <path
                  className="path"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  stroke="black"
                  fill="black"
                  d="M6.5 4L6.303 4.5915C6.24777 4.75718 6.15472 4.90774 6.03123 5.03123C5.90774 5.15472 5.75718 5.24777 5.5915 5.303L5 5.5L5.5915 5.697C5.75718 5.75223 5.90774 5.84528 6.03123 5.96877C6.15472 6.09226 6.24777 6.24282 6.303 6.4085L6.5 7L6.697 6.4085C6.75223 6.24282 6.84528 6.09226 6.96877 5.96877C7.09226 5.84528 7.24282 5.75223 7.4085 5.697L8 5.5L7.4085 5.303C7.24282 5.24777 7.09226 5.15472 6.96877 5.03123C6.84528 4.90774 6.75223 4.75718 6.697 4.5915L6.5 4Z"
                ></path>
              </svg>
              <span className="text_button">Start Analysing</span>
            </button>
          </div>
        )}
      </div>
      {analysisResult && (
        <div className="analysis-result">
          <h3>Analysis Result:</h3>
          <p>{JSON.stringify(analysisResult)}</p>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
