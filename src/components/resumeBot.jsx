import React, { useState, useRef, useEffect } from "react";
import { FaPaperPlane, FaFileUpload, FaMicrophone } from "react-icons/fa";

export default function ResumeCheck() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [resumeText, setResumeText] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isConverting, setIsConverting] = useState(false);
  const chatEndRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const addMessage = (msg) => setMessages((p) => [...p, msg]);
  const removeLastLoader = () =>
    setMessages((p) => p.filter((m) => m.type !== "loader"));

  const handleInputChange = (e) => setInputText(e.target.value);
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = async () => {
    const trimmed = inputText.trim();
    if (!trimmed) return;

    addMessage({ type: "text", content: trimmed, sender: "user" });
    setInputText("");
    setLoading(true);
    addMessage({ type: "loader", sender: "bot", content: "Thinking..." });

    try {
      const res = await fetch("https://45r0mpcf-5000.inc1.devtunnels.ms/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed, resumeText }),
      });
      const data = await res.json();
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

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const res = await fetch("https://45r0mpcf-5000.inc1.devtunnels.ms/upload-resume", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
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

  const handleMicClick = async () => {
    if (isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const rec = new MediaRecorder(stream);
      audioChunksRef.current = [];

      rec.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      rec.onstop = async () => {
        const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        await sendAudioToWhisper(blob);
      };

      mediaRecorderRef.current = rec;
      rec.start();
      setIsRecording(true);
    } catch (err) {
      alert("Microphone access denied.");
    }
  };

  const sendAudioToWhisper = async (audioBlob) => {
    const formData = new FormData();
    formData.append("audio", audioBlob);

    setIsConverting(true);
    addMessage({ type: "loader", sender: "bot", content: "🎙️ Processing..." });

    try {
      const res = await fetch("https://45r0mpcf-5000.inc1.devtunnels.ms/speech-to-text", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      removeLastLoader();
      if (data.text)
        setInputText((p) => (p ? p + " " + data.text : data.text));
      else
        addMessage({
          type: "text",
          content: "Speech recognition failed.",
          sender: "bot",
        });
    } catch (err) {
      removeLastLoader();
      addMessage({
        type: "text",
        content: "Error converting speech to text.",
        sender: "bot",
      });
    } finally {
      setIsConverting(false);
      setIsRecording(false);
    }
  };

  const LoaderBubble = ({ text }) => (
    <div className="flex justify-start mb-3">
      <div className="bg-[#1F5C72] text-[#FFD97A] px-3 py-1.5 rounded-lg flex items-center shadow-md text-sm animate-pulse">
        <svg
          aria-hidden="true"
          role="status"
          className="inline w-3 h-3 mr-2 text-[#FFB347] animate-spin"
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
    <div className="relative flex justify-center items-center min-h-screen bg-gradient-to-br from-[#0F2027] via-[#203A43] to-[#2C5364] bg-[length:200%_200%] animate-[gradientShift_10s_ease_infinite] overflow-hidden">
      {/* Soft Glow Bubbles */}
      <div className="absolute top-[5%] left-[10%] w-[250px] h-[250px] bg-[#FFB347]/20 rounded-full blur-3xl animate-[floatGlow_8s_ease_in_out_infinite]"></div>
      <div className="absolute bottom-[5%] right-[10%] w-[250px] h-[250px] bg-[#D9E0A4]/20 rounded-full blur-3xl animate-[floatGlowReverse_8s_ease_in_out_infinite]"></div>

      {/* Chatbot Box */}
      <div className="relative z-10 flex flex-col w-[750px] h-[540px] rounded-[35px] overflow-hidden shadow-[0_0_40px_rgba(255,179,71,0.3)] border border-[#FFB347]/40 backdrop-blur-md bg-[#102F3D]/90 transform transition-all duration-500">
        {/* Header */}
        <div className="bg-[#1F5C72]/90 text-[#FFE8A3] text-center py-3 font-semibold text-xl border-b border-[#FFD97A]/20 shadow-md tracking-wide">
          Resume Analyzer <span className="text-[#FFB347]">ChatBot</span>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto px-6 py-5 bg-[#133F52]/70 space-y-4">
          {messages.map((msg, i) =>
            msg.type === "loader" ? (
              <LoaderBubble key={i} text={msg.content} />
            ) : (
              <div
                key={i}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[70%] px-3 py-2 rounded-2xl leading-relaxed shadow-md text-sm transition-all duration-300 ${
                    msg.sender === "user"
                      ? "bg-[#FFB347] text-[#1F3B4D]"
                      : "bg-[#D9E0A4]/25 text-[#F5F5DC]"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            )
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input Area */}
        <div className="flex items-center justify-between gap-3 p-4 bg-[#1F5C72]/85 border-t border-[#FFD97A]/30">
          <input
            type="text"
            value={inputText}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 p-3 px-5 rounded-full bg-[#19485F] text-[#FFE8A3] placeholder-[#C5D2B3] border border-[#FFD97A]/40 focus:ring-2 focus:ring-[#FFB347] outline-none"
          />

          <div className="flex items-center gap-4">
            <button
              onClick={handleMicClick}
              disabled={isConverting}
              className={`p-3 rounded-full shadow-md transition-all ${
                isRecording
                  ? "bg-red-600 animate-pulse scale-110"
                  : "bg-[#FFB347] text-[#1F3B4D] hover:bg-[#FFA533]"
              }`}
            >
              <FaMicrophone />
            </button>

            <label
              htmlFor="file-upload"
              className="bg-[#FFB347] text-[#1F3B4D] p-3 rounded-full cursor-pointer hover:bg-[#FFA533] transition shadow-md"
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
              className={`p-3 rounded-full flex items-center justify-center shadow-md transition ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#FFB347] text-[#1F3B4D] hover:bg-[#FFA533]"
              }`}
            >
              <FaPaperPlane />
            </button>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes floatGlow {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.5; }
          50% { transform: translateY(-15px) scale(1.1); opacity: 0.8; }
        }
        @keyframes floatGlowReverse {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.5; }
          50% { transform: translateY(15px) scale(1.1); opacity: 0.8; }
        }
      `}</style>
    </div>
  );
}
