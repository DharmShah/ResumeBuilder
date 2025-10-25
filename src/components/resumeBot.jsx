import React, { useState, useRef, useEffect } from "react";
import { FaPaperPlane, FaFileUpload, FaMicrophone } from "react-icons/fa";

export default function ResumeCheck() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [resumeText, setResumeText] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isConverting, setIsConverting] = useState(false); // 🆕 while converting speech
  const chatEndRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const addMessage = (message) => setMessages((prev) => [...prev, message]);
  const removeLastLoader = () =>
    setMessages((prev) => prev.filter((msg) => msg.type !== "loader"));

  const handleInputChange = (e) => setInputText(e.target.value);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  // 💬 Chat with Bot
  const handleSend = async () => {
    const trimmedInput = inputText.trim();
    if (!trimmedInput) return;

    addMessage({ type: "text", content: trimmedInput, sender: "user" });
    setInputText("");
    setLoading(true);
    addMessage({ type: "loader", sender: "bot", content: "Bot is thinking..." });

    try {
      const response = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmedInput, resumeText }),
      });

      const data = await response.json();
      removeLastLoader();
      addMessage({ type: "text", content: data.reply, sender: "bot" });
    } catch (err) {
      removeLastLoader();
      addMessage({
        type: "text",
        content: `Network error: ${err.message}`,
        sender: "bot",
      });
    } finally {
      setLoading(false);
    }
  };

  // 📁 Upload Resume
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

      const data = await response.json();
      addMessage({
        type: "text",
        content: `Resume Score: ${data.score}/100`,
        sender: "bot",
      });
      setResumeText(data.text_preview);
    } catch (err) {
      addMessage({
        type: "text",
        content: `Network error: ${err.message}`,
        sender: "bot",
      });
    }
  };

  // 🎙️ Start or stop recording audio
  const handleMicClick = async () => {
    if (isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        await sendAudioToWhisper(audioBlob);
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      alert("Microphone access denied or unavailable.");
      console.error("Mic error:", err);
    }
  };

  // 🎯 Send audio blob → backend → Whisper → text
  const sendAudioToWhisper = async (audioBlob) => {
    const formData = new FormData();
    formData.append("audio", audioBlob);

    setIsConverting(true);
    addMessage({
      type: "loader",
      sender: "bot",
      content: "🎙️ Converting your speech...",
    });

    try {
      const response = await fetch("http://localhost:5000/speech-to-text", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      removeLastLoader();
      if (data.text) {
        setInputText((prev) => (prev ? prev + " " + data.text : data.text));
      } else {
        addMessage({
          type: "text",
          content: "Speech recognition failed.",
          sender: "bot",
        });
      }
    } catch (err) {
      removeLastLoader();
      addMessage({
        type: "text",
        content: "Error converting speech to text.",
        sender: "bot",
      });
      console.error("Speech-to-text error:", err);
    } finally {
      setIsConverting(false);
      setIsRecording(false);
    }
  };

  // 💬 Loader bubble
  const LoaderBubble = ({ text = "Bot is thinking..." }) => (
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
            100 50.5908Z"
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
            4.19778 38.4501 6.62326Z"
            fill="currentColor"
          />
        </svg>
        {text}
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
            <LoaderBubble key={index} text={msg.content} />
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

        {/* 🎙️ Microphone Button */}
        <button
          onClick={handleMicClick}
          disabled={isConverting}
          className={`p-3 rounded-full text-white mr-[10px] transition-all ${
            isRecording
              ? "bg-red-600 animate-pulse shadow-lg scale-110"
              : "bg-blue-600 hover:bg-blue-700"
          } ${isConverting ? "opacity-60 cursor-not-allowed" : ""}`}
          title={isRecording ? "Recording..." : "Start recording"}
        >
          <FaMicrophone />
        </button>

        {/* 📁 File Upload */}
        <label
          htmlFor="file-upload"
          className="bg-blue-600 mr-[15px] ml-[5px] text-white p-3 rounded-full cursor-pointer flex items-center justify-center hover:bg-blue-700 transition"
        >
          <FaFileUpload />
        </label>
        <input id="file-upload" type="file" onChange={handleFileChange} className="hidden" />

        {/* 🚀 Send Button */}
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
