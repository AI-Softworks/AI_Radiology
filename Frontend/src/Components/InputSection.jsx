// src/Components/InputSection.js
import React from "react";
import "./InputSection.css";

const InputSection = React.forwardRef((props, ref) => {
  return (
    <section className="inputSection" ref={ref}>
      <h2>Welcome to the Next Section</h2>
      <p>
        This section appears after clicking the "Get Started" button, and the
        page automatically scrolls to it.
      </p>
    </section>
  );
});

export default InputSection;
