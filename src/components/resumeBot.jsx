import React, { useState, useRef, useEffect } from "react";
import { FaPaperPlane, FaFileUpload } from "react-icons/fa";

export default function ResumeCheck() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [resumeText, setResumeText] = useState(""); // Store uploaded resume
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const addMessage = (message) => setMessages((prev) => [...prev, message]);

  const handleInputChange = (e) => setInputText(e.target.value);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = async () => {
    const trimmedInput = inputText.trim();
    if (!trimmedInput) return;

    addMessage({ type: "text", content: trimmedInput, sender: "user" });
    setInputText("");

    try {
      const response = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmedInput, resumeText }),
      });

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        throw new Error(`Expected JSON but got: ${text}`);
      }

      const data = await response.json();
      addMessage({ type: "text", content: data.reply, sender: "bot" });
    } catch (err) {
      addMessage({ type: "text", content: `Network error: ${err.message}`, sender: "bot" });
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const response = await fetch("http://localhost:5000/upload-resume", {
        method: "POST",
        body: formData,
      });

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        throw new Error(`Expected JSON but got: ${text}`);
      }

      const data = await response.json();
      addMessage({ type: "text", content: `Resume Score: ${data.score}/100`, sender: "bot" });
      setResumeText(data.text_preview); // Save resume text for chat context
    } catch (err) {
      addMessage({ type: "text", content: `Network error: ${err.message}`, sender: "bot" });
    }
  };

  return (
    <div className="flex flex-col w-[750px] p-[15px] border max-w-lg mx-auto h-[500px] bg-gray-900 overflow-hidden mt-12 shadow-lg">
      <div className="bg-blue-600 text-white px-5 py-4 font-bold text-lg">
        Upload Resume to chat with Bot
      </div>

      <div className="flex-1 overflow-y-auto p-4 bg-gray-100 mb-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex mb-3 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[70%] px-4 py-2 rounded-lg break-words ${
                msg.sender === "user" ? "bg-blue-600 text-white" : "bg-gray-300 text-black"
              }`}
            >
              {msg.type === "text" ? msg.content : <span>📄 {msg.content}</span>}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <div className="flex items-center gap-2 p-3 mt-[15px] border-t bg-white">
        <input
          type="text"
          value={inputText}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          placeholder="Type a message..."
          className="flex-1 m-[15px] px-[15px] p-[10px] border rounded-full outline-none focus:ring-2 focus:ring-blue-400"
        />

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

        <button
          onClick={handleSend}
          className="p-3 mr-[10px] rounded-full text-white flex items-center justify-center"
        >
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
}
