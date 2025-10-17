import React, { useState, useRef, useEffect } from "react";
import { FaPaperPlane, FaFileUpload } from "react-icons/fa";

export default function ResumeCheck() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const chatEndRef = useRef(null);

  // Auto-scroll to the latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle input field change
  const handleInputChange = (e) => setInputText(e.target.value);

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  // Handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    addMessage({ type: "file", content: file.name, sender: "user" });
    addMessage({
      type: "text",
      content: `File received: ${file.name}`,
      sender: "bot",
    });
  };

  // Send a message
  const handleSend = () => {
    const trimmedInput = inputText.trim();
    if (!trimmedInput) return;

    addMessage({ type: "text", content: trimmedInput, sender: "user" });
    setInputText("");

    // Simulate bot response
    setTimeout(() => {
      addMessage({
        type: "text",
        content: `You said: "${trimmedInput}"`,
        sender: "bot",
      });
    }, 500);
  };

  // Add a message to the chat
  const addMessage = (message) => setMessages((prev) => [...prev, message]);

  return (
    <div className="flex flex-col w-[750px]  max-w-lg mx-auto h-[500px] bg-gray-900 overflow-hidden mt-12 shadow-lg">
      {/* Header */}
      <div className="bg-blue-600 text-white px-5 py-4 font-bold text-lg">
        <h3>Upload Resume to chat with Bot</h3>
      </div>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-100 mb-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex mb-3 ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[70%] px-4 py-2 rounded-lg break-words ${
                msg.sender === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-300 text-black"
              }`}
            >
              {msg.type === "text" ? (
                msg.content
              ) : (
                <span>📄 {msg.content}</span>
              )}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Input area */}
      <div className="flex items-center gap-2 p-3 mt-[15px] border-t bg-white">
        <input
          type="text"
          value={inputText}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress} // <-- Added this line
          placeholder="Type a message..."
          className="flex-1 m-[15px] px-[15px] p-[10px] border rounded-full outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* File Upload Button */}
        <label
          htmlFor="file-upload"
          className="bg-blue-600 mr-[15px] ml-[15px] text-white p-3 rounded-full cursor-pointer flex items-center justify-center hover:bg-blue-700 transition"
        >
          <FaFileUpload />
        </label>
        <input
          id="file-upload"
          type="file"
          onChange={handleFileChange}
          className="hidden"
        />

        {/* Send Button */}
        <button
          className="p-3 mr-[10px] rounded-full text-white flex items-center justify-center "
        >
          <FaPaperPlane  />
        </button>
      </div>
    </div>
  );
}
