import React, { useState } from "react";
import { FaSun, FaMoon } from 'react-icons/fa';

function App() {
  const [situation, setSituation] = useState("");
  const [decision, setDecision] = useState("");
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  }

  const handleSubmit = async () => {
    try {
      const response = await fetch("https://decision-helper.onrender.com/api/decision", { 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ situation }),
      });

      const data = await response.json();
      setDecision(data.answer);
    } catch (err) {
      console.error("Error contacting AI:", err);
      setDecision("Something went wrong.");
    }
  };

  return (
     <div
      style={{
        minHeight: "100vh",
        background: theme === "light"
        ? "linear-gradient(to right, #e0eafc, #cfdef3)"
        : "#121212",
        color: theme === "light" ? "#000" : "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "1rem",
        boxSizing: "border-box",
      }}
    >
      <div
  style={{
    width: "100%",
    maxWidth: "700px",
    backgroundColor: theme === "light" ? "#ffffffe0" : "#1e1e1e", // switch bg
    color: theme === "light" ? "#000" : "#fff", // switch text
    borderRadius: "16px",
    padding: "2rem",
    boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
    fontFamily: "'Inter', sans-serif",
  }}
>
    <button 
  onClick={toggleTheme} 
  style={{
    border: "none",
    background: "transparent",
    cursor: "pointer",
    fontSize: "1.5rem",
    position: "absolute",
    top: "1rem",
    left: "1rem",
    color: theme === "light" ? "#111" : "#fff"
  }}
>
  {theme === "light" ? <FaMoon /> : <FaSun />}
</button>
    
    <h1 style={{ fontSize: "1.8rem", textAlign: "center" }}>🤖 Decision Helper</h1>

   <textarea
    placeholder="Describe your situation..."
    rows="4"
    cols="50"
    value={situation}
    onChange={(e) => setSituation(e.target.value)}
    style={{
    width: "100%",
    padding: "1rem",
    borderRadius: "8px",
    border: "1px solid #ccc",
    backgroundColor: theme === "dark" ? "black" : "white", 
    color: theme === "dark" ? "#f1f1f1" : "#000000", 
    marginBottom: "1rem",
    fontSize: "1rem",
  }}
/>
        <button
          onClick={handleSubmit}
          style={{
            width: "100%",
            padding: "1rem",
            background: "linear-gradient(to right, #667eea, #764ba2)",
            color: "#fff",
            fontWeight: "bold",
            fontSize: "1rem",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            marginTop: "0.5rem",
          }}
        >
          Get Advice
        </button>

<div style={{ display: "flex", justifyContent: "center", marginTop: "0.5rem" }}>
  <button
    onClick={() => {
      setSituation("");    // clears the textarea
      setDecision("");     // clears the AI response
    }}
    style={{
      padding: "0.6rem 1.2rem",
      borderRadius: "8px",
      background: "#2c2c2c",
      color: "#fff",
      border: "none",
      cursor: "pointer"
    }}
  >
    Reset
  </button>

</div>

        {decision && (
          <p
            style={{
              marginTop: "1.5rem",
              backgroundColor: theme === "light" ? "#ffffff" : "#121212",
              color: theme === "light" ? "#000000" : "#ffffff",
              padding: "1.2rem",
              borderLeft: "4px solid #667eea",
              borderRadius: "10px",
              fontSize: "1rem",
              lineHeight: "1.6",
              whiteSpace: "pre-wrap", // preserves line breaks
            }}
          >
            <strong>Suggestion:</strong> {decision}
          </p>
        )}
      </div>
    </div>
  );
}

export default App;