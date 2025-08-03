import React, { useEffect, useRef, useState } from "react";
import ChatbotIcon from "./components/ChatbotIcon";
import ChatForm from "./components/ChatForm";
import ChatMessage from "./components/ChatMessage";
import footballInfo from "./footballInfo";

const App = () => {
  const [chatHistory, setChatHistory] = useState([
    {
      hideInChat: true,
      role: "model",
      text: `You are a friendly AI football assistant. 
Greet users warmly and answer their questions about football using the info below:

${footballInfo} 

If a user just greets you (e.g., "hey", "hello"), reply with:
"Hi there! 👋 How can I help you today? Is there anything you'd like to know about football?"`,
    }, //adding football's info as the bot's intial message so it can respond to later msgs accordingly
  ]);
  const [showChatbot, setShowChatbot] = useState(false);
  const chatBodyRef = useRef();

  const generateBotResponse = async (history) => {
    // Add "Thinking..." message immediately before API call
    setChatHistory((prev) => [...prev, { role: "model", text: "Thinking..." }]);

    history = history.map(({ role, text }) => ({ role, parts: [{ text }] }));

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: history }),
    };

    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL,
        requestOptions
      );
      const data = await response.json();

      if (!response.ok)
        throw new Error(data.error.message || "Something is wrong!");

      const apiResponseText = data.candidates[0].content.parts[0].text
        .replace(/\*\*(.*?)\*\*/g, "$1")
        .trim();

      // Replace "Thinking..." with the actual bot response
      setChatHistory((prev) => [
        ...prev.filter((msg) => msg.text !== "Thinking..."),
        { role: "model", text: apiResponseText },
      ]);
    } catch (error) {
      console.log(error);
      // Remove "Thinking..." if error occurs
      setChatHistory((prev) =>
        prev.filter((msg) => msg.text !== "Thinking...")
      );
      setChatHistory((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "model",
          text: `⚠️ ${error.message}`,
          error: true,
        };
        return updated;
      });
    }
  };

  useEffect(() => {
    // Auto-scroll whenever chat history updates
    chatBodyRef.current.scrollTo({
      top: chatBodyRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [chatHistory]);

  return (
    <div className={`container ${showChatbot ? "show-chatbot" : ""}`}>
      {/*toggling the showChatbot value on click*/}
      <button
        onClick={() => setShowChatbot((prev) => !prev)}
        id="chatbot-toggler"
      >
        <span className="material-symbols-rounded">mode_comment</span>
        <span className="material-symbols-rounded">close</span>
      </button>
      <div className="chatbot-popup">
        {/* Chatbot header */}
        <div className="chat-header">
          <div className="header-info">
            <ChatbotIcon />
            <h2 className="logo_text">AiChatbot</h2>
          </div>
          {/* <button
            onClick={() => setShowChatbot((prev) => !prev)}
            id="chatbot-toggler"
            className="material-symbols-rounded"
          >
            keyboard_arrow_down
          </button> */}
        </div>
        {/* Chatbot body */}
        <div ref={chatBodyRef} className="chat-body">
          <div className="message bot-message">
            <ChatbotIcon />
            <p className="message-text">
              Hey there!!!👋😉
              <br /> How can I help you today?
            </p>
          </div>
          {/* Render chat history dynamically */}
          {chatHistory.map((chat, index) => (
            <ChatMessage key={index} chat={chat} />
          ))}
        </div>
        {/* Chatbot footer */}
        <div className="chat-footer">
          <ChatForm
            chatHistory={chatHistory}
            setChatHistory={setChatHistory}
            generateBotResponse={generateBotResponse}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
