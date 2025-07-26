import React from "react";
import ChatbotIcon from "./components/ChatbotIcon";

const App = () => {
  return (
    <div className="container">
      <div className="chatbot-pop">
        <div className="chat-header">
          <div className="header-info">
            <ChatbotIcon />
            <h2 className="logo_text">Chatbot</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
