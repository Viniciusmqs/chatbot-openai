export default function Header() {
  return (
    <header className="header">
      <span className="chatbot-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
  <rect x="3" y="8" width="18" height="12" rx="2" ry="2"/>
  <circle cx="8" cy="14" r="1"/>
  <circle cx="16" cy="14" r="1"/>
  <line x1="12" y1="2" x2="12" y2="6"/>
</svg>
</span>
      <span className="status">ChatBot IA</span>
    </header>
  );
}
