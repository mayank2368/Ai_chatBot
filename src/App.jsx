import React from "react";
import ChatbotIcon from "./components/ChatbotIcon";

const App = () => {
  return (
    <div className="container">
      <div className="chatbot-popup">
        {/* Chatbot header */}
        <div className="chat-header">
          <div className="header-info">
            <ChatbotIcon />
            <h2 className="logo_text">Chatbot</h2>
          </div>
          <button className="material-symbols-rounded">
            keyboard_arrow_down
          </button>
        </div>
        {/* Chatbot body */}
        <div className="chat-body">
          <div className="message bot-message">
            <ChatbotIcon />
            <p className="message-text">
              Hey there!!!👋😉
              <br /> How can I help you today?
            </p>
          </div>

          <div className="message user-message">
            <p className="message-text">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            </p>
          </div>
        </div>
        {/* Chatbot footer */}
        <div className="chat-footer">
          <form action="#" className="chat-form">
            <input
              type="text"
              placeholder="Go on lad...ask me!"
              className="message-input"
              required
            />
            <button className="material-symbols-rounded">arrow_upward</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default App;
