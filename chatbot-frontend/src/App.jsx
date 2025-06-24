import { useState } from "react";
import Header from "./components/Header";
import ChatBubble from "./components/ChatBubble";

export default function App() {
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setHistory([...history, userMessage]);
    setInput("");

    try {
      const res = await fetch("http://localhost:3000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      const botReply = { role: "bot", content: data.reply };
      setHistory((prev) => [...prev, botReply]);
    } catch {
      setHistory((prev) => [
        ...prev,
        { role: "bot", content: "Erro ao se comunicar com o servidor." },
      ]);
    }
  };

  const clearChat = () => {
    setHistory([]);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Header />

      <main>
        <div className="chat-container">
          {history.map((msg, i) => (
            <ChatBubble key={i} role={msg.role} content={msg.content} />
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enviar mensagem"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit">Enviar</button>
          <button type="button" onClick={clearChat} style={{ marginLeft: "10px" }}>
            Novo Chat
          </button>
        </form>
      </main>
    </div>
  );
}
