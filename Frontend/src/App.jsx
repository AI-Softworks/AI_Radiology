import React,{ useRef } from "react";
import "./App.css";
import LandingPage from "./Components/LandingPage";
import NextSection from "./Components/InputSection";
import { ThemeProvider, useTheme } from "./context/ThemeContext";

function App() {
  const [showNextSection, setShowNextSection] = React.useState(false);
  const nextSectionRef = useRef(null);

  const handleGetStarted = () => {
    setShowNextSection(true);
    setTimeout(() => {
      nextSectionRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <ThemeProvider>
      <LandingPage onGetStarted={handleGetStarted} />
      {showNextSection && <NextSection ref={nextSectionRef} />}
    </ThemeProvider>
  );
}

export default App;
