import React from "react";
import "./InputSection.css";
import Tooltip from "./Tooltip";
import { useTheme } from "../context/ThemeContext";

const InputSection = React.forwardRef((props, ref) => {
  const { isDarkMode } = useTheme(); // Access the theme context
  console.log("isDarkMode:", isDarkMode); // Log the value to check

  return (
    <section className={`inputSection ${isDarkMode ? "dark" : ""}`} ref={ref}>
      <h1 className="uploadText">Upload the image here</h1>
      <Tooltip />
    </section>
  );
});

export default InputSection;
