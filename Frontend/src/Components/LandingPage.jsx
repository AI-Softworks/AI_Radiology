import React, { useState, useEffect } from "react";
import "./LandingPage.css";

export default function LandingPage({ onGetStarted }) {
  const [darkTheme, setDarkTheme] = useState(false);

  // Effect to apply the theme to the body element
  useEffect(() => {
    if (darkTheme) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkTheme]);

  // Toggle the theme
  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };

  return (
    <div className="LandingPage">
      <div className="navBar">
        <div className="navBarLeft">
          <img src="logo.png" alt="logo" />
        </div>
        <div className="navBarRight">
          <a href="#">About Us</a>
          <label className="ui-switch">
            <input type="checkbox" onChange={toggleTheme} checked={darkTheme} />
            <div className="slider">
              <div className="circle"></div>
            </div>
          </label>
        </div>
      </div>
      <div className="content">
        <div className="contentLeft">
          <h1 className="type">AI For Radiology</h1>
          <p className="tagLine">
            Empowering Radiologists with AI: Precision Diagnosis at Lightning
            Speed.
          </p>
          <button className="btn" onClick={onGetStarted}>
            Get Started
          </button>
        </div>
        <div className="contentRight">
          <img className="image1" src="./src/assets/robot.png" alt="" />
        </div>
      </div>
    </div>
  );
}
