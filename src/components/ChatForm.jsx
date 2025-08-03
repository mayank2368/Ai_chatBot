import React from "react";
import { useRef } from "react";

const ChatForm = ({ chatHistory, setChatHistory, generateBotResponse }) => {
  const inputRef = useRef();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const userMessage = inputRef.current.value.trim();
    if (!userMessage) return;
    inputRef.current.value = "";

    // Add user message to chatHistory
    setChatHistory((prev) => [...prev, { role: "user", text: userMessage }]);

    // Call generateBotResponse with updated history (including new user message)
    generateBotResponse([
      ...chatHistory,
      {
        role: "user",
        text: `Using the details provided above, please address this query: ${userMessage}`,
      },
    ]);
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
