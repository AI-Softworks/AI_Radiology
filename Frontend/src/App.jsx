import React,{ useRef } from "react";
import "./App.css";
import LandingPage from "./Components/LandingPage";
import InputSection from "./Components/InputSection";
import { ThemeProvider, useTheme } from "./context/ThemeContext";

function App() {
  const [showInputSection, setShowInputSection] = React.useState(false);
  const InputSectionRef = useRef(null);

  const handleGetStarted = () => {
    setShowInputSection(true);
    setTimeout(() => {
      InputSectionRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <ThemeProvider>
      <LandingPage onGetStarted={handleGetStarted} />
      {showInputSection && <InputSection ref={InputSectionRef} />}
    </ThemeProvider>
  );
}

export default App;
