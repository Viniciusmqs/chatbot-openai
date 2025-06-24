import { useState } from "react";

export default function ChatBox() {
  const [message, setMessage] = useState("");
  const [history, setHistory] = useState([]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = { role: "user", content: message };
    setHistory([...history, userMessage]);
    setMessage("");

    try {
      const res = await fetch("http://localhost:3000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      const botReply = { role: "bot", content: data.reply || "Sem resposta" };

      setHistory([...history, userMessage, botReply]);
    } catch (err) {
      console.error("Erro ao enviar mensagem:", err);
      setHistory([...history, userMessage, { role: "bot", content: "Erro ao se comunicar com o servidor." }]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-md shadow-lg rounded-2xl p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">🤖 Chatbot IA Profissional</h1>

      <div className="h-80 overflow-y-auto bg-black/30 rounded-lg p-4 space-y-2 mb-4">
        {history.map((msg, i) => (
          <div
            key={i}
            className={`p-2 rounded-lg ${
              msg.role === "user" ? "bg-indigo-600 text-right" : "bg-gray-700 text-left"
            }`}
          >
            {msg.content}
          </div>
        ))}
      </div>

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Digite sua pergunta e pressione Enter..."
        className="w-full p-3 rounded-md bg-white/20 text-white placeholder:text-white/50 focus:outline-none resize-none mb-4"
        rows={3}
      />

      <button
        onClick={sendMessage}
        className="bg-emerald-500 hover:bg-emerald-600 transition rounded-md px-4 py-2 font-semibold"
      >
        Enviar
      </button>
    </div>
  );
}
