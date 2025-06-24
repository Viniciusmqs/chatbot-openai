export default function ChatBubble({ role, content }) {
  const isUser = role === "user";

  return (
    <div className={`chat-bubble ${isUser ? "user" : "bot"}`}>
      <p>{content}</p>
    </div>
  );
}
