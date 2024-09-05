import React, { useState } from "react";
import axios from "axios";
import "./chatbot.css"; // Make sure to import your CSS file

const Chatbot = () => {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!question) return;

    // Add user's message to the chat
    setMessages((prev) => [...prev, { text: question, sender: "user" }]);
    setLoading(true);
    setQuestion("");

    try {
      const response = await axios.post("http://localhost:5001/", {
        prompt: question,
      });
      setMessages((prev) => [...prev, { text: response.data, sender: "bot" }]);
    } catch (error) {
      console.error("Error fetching response:", error);
      setMessages((prev) => [
        ...prev,
        {
          text: "Sorry, to answer that!",
          sender: "bot",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chatbot-container">
      <h1 className="chatbot-header">Disease Analysis</h1>
      <div className="chat-window">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${
              msg.sender === "user" ? "user-message" : "bot-message"
            }`}
          >
            <p className="message-text">{msg.text}</p>
          </div>
        ))}
        {loading && <p className="loading-text">Loading...</p>}
      </div>
      <div className="input-group">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask your question..."
          className="input-field"
        />
        <button onClick={handleSend} className="send-button">
          Ask Gemini
        </button>
      </div>
    </div>
  );
};

export default Chatbot;