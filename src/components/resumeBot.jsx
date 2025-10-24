import React, { useState, useRef, useEffect } from "react";
import { FaPaperPlane, FaFileUpload } from "react-icons/fa";

export default function ResumeCheck() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [resumeText, setResumeText] = useState("");
  const [loading, setLoading] = useState(false);
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
    setLoading(true);

    // temporary loader message
    addMessage({ type: "loader", sender: "bot" });

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

      // replace loader with bot reply
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { type: "text", content: data.reply, sender: "bot" },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { type: "text", content: `Network error: ${err.message}`, sender: "bot" },
      ]);
    } finally {
      setLoading(false);
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
      setResumeText(data.text_preview);
    } catch (err) {
      addMessage({ type: "text", content: `Network error: ${err.message}`, sender: "bot" });
    }
  };

  // Loader Bubble Component
  const LoaderBubble = () => (
    <div className="flex justify-start mb-3">
      <div className="bg-gray-300 text-black px-4 py-2 rounded-lg flex items-center">
        <svg
          aria-hidden="true"
          role="status"
          className="inline w-4 h-4 mr-2 text-gray-600 animate-spin"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 
            50 100.591C22.3858 100.591 0 78.2051 
            0 50.5908C0 22.9766 22.3858 0.59082 
            50 0.59082C77.6142 0.59082 100 22.9766 
            100 50.5908ZM9.08144 50.5908C9.08144 
            73.1895 27.4013 91.5094 50 91.5094C72.5987 
            91.5094 90.9186 73.1895 90.9186 
            50.5908C90.9186 27.9921 72.5987 9.67226 
            50 9.67226C27.4013 9.67226 9.08144 
            27.9921 9.08144 50.5908Z"
            fill="#E5E7EB"
          />
          <path
            d="M93.9676 39.0409C96.393 
            38.4038 97.8624 35.9116 97.0079 
            33.5539C95.2932 28.8227 92.871 
            24.3692 89.8167 20.348C85.8452 
            15.1192 80.8826 10.7238 75.2124 
            7.41289C69.5422 4.10194 63.2754 
            1.94025 56.7698 1.05124C51.7666 
            0.367541 46.6976 0.446843 41.7345 
            1.27873C39.2613 1.69328 37.813 
            4.19778 38.4501 6.62326C39.0873 
            9.04874 41.5694 10.4717 44.0505 
            10.1071C47.8511 9.54855 51.7191 
            9.52689 55.5402 10.0491C60.8642 
            10.7766 65.9928 12.5457 70.6331 
            15.2552C75.2735 17.9648 79.3347 
            21.5619 82.5849 25.841C84.9175 
            28.9121 86.7997 32.2913 88.1811 
            35.8758C89.083 38.2158 91.5421 
            39.6781 93.9676 39.0409Z"
            fill="currentColor"
          />
        </svg>
        Bot is thinking...
      </div>
    </div>
  );

  return (
    <div className="flex flex-col w-[750px] p-[15px] border max-w-lg mx-auto h-[500px] bg-gray-900 overflow-hidden mt-12 shadow-lg">
      <div className="bg-blue-600 text-white px-5 py-4 font-bold text-lg">
        Upload Resume to chat with Bot
      </div>

      <div className="flex-1 overflow-y-auto p-4 bg-gray-100 mb-2">
        {messages.map((msg, index) =>
          msg.type === "loader" ? (
            <LoaderBubble key={index} />
          ) : (
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
                {msg.content}
              </div>
            </div>
          )
        )}
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
          disabled={loading}
          className={`p-3 mr-[10px] rounded-full text-white flex items-center justify-center ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
}
