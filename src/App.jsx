import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

// static JSON responses
const responses = {
  Hello: "Hello! How can I assist you today?",
  "How do I contact customer support?":
    "You can contact our customer support via email at support@example.com or call us at +1-800-123-4567.",
};

// ---------------- HOME ----------------
function Home() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    let reply = responses[input] || "Sorry, Did not understand your query!";

    const newMessages = [...messages, { question: input, answer: reply }];

    setMessages(newMessages);
    setInput("");
  };

  const handleSave = () => {
    localStorage.setItem("conversations", JSON.stringify(messages));
  };

  return (
    <div>
      {/* HEADER */}
      <header>
        <h1>Customer Support AI</h1>
      </header>

      {/* NAV */}
      <Link to="/history">Past Conversations</Link>

      {/* INPUT */}
      <form onSubmit={handleSubmit}>
        <input
          key={messages.length} // 🔥 ensures reset
          placeholder="Please tell me about your query!"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>

      {/* CHAT */}
      <div>
        {messages.map((msg, i) => (
          <div key={i}>
            <p>{msg.question}</p>
            <p>{msg.answer}</p>
          </div>
        ))}
      </div>

      {/* SAVE BUTTON */}
      <button type="button" onClick={handleSave}>
        Save Conversation
      </button>
    </div>
  );
}

// ---------------- HISTORY ----------------
function History() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("conversations")) || [];
    setData(saved);
  }, []);

  return (
    <div>
      <h1>Past Conversations</h1>

      {/* 🔥 FIX: force reload to reset Home */}
      <button type="button" onClick={() => navigate("/")}>
        New Query
      </button>

      {data.map((item, i) => (
        <div key={i}>
          <p>{item.question}</p>
          <p>{item.answer}</p>
        </div>
      ))}
    </div>
  );
}

// ---------------- APP ----------------
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 🔥 key forces remount */}
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </BrowserRouter>
  );
}
