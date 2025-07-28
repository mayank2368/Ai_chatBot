import React from "react";
import { useRef } from "react";

const ChatForm = ({ chatHistory, setChatHistory, generateBotResponse }) => {
  const inputRef = useRef();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const userMessage = inputRef.current.value.trim();
    if (!userMessage) return;
    //console.log(userMessage);
    inputRef.current.value = "";
    // Update chat history with the user's message
    setChatHistory((prev) => {
      const updated = [...prev, { role: "user", text: userMessage }];
      setTimeout(() => {
        setChatHistory([...updated, { role: "model", text: "Thinking..." }]);
      }, 1000);
      generateBotResponse([
        ...chatHistory,
        { role: "user", text: userMessage },
      ]);
      return updated;
    });
  };

  return (
    <div>
      <form action="#" className="chat-form" onSubmit={handleFormSubmit}>
        <input
          ref={inputRef}
          type="text"
          placeholder="Go on lad...ask me!"
          className="message-input"
          required
        />
        <button className="material-symbols-rounded">arrow_upward</button>
      </form>
    </div>
  );
};

export default ChatForm;
