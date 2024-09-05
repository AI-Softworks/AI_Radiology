// src/Context/ThemeContext.js
import React, { createContext, useState, useContext } from "react";

// Create a Context for the theme
const ThemeContext = createContext();

// Create a provider component
export function ThemeProvider({ children }) {
  const [darkTheme, setDarkTheme] = useState(false);

  const toggleTheme = () => {
    setDarkTheme((prevTheme) => !prevTheme);
  };

  return (
    <ThemeContext.Provider value={{ darkTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook to use the ThemeContext
export function useTheme() {
  return useContext(ThemeContext);
}
