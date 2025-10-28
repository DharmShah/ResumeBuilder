import React, { useState } from "react";
import html2pdf from "html2pdf.js";

const ResumeBot = () => {
  const questions = [
    "What's your full name?",
    "Date of Birth?",
    "Your email address?",
    "Your phone number?",
    "LinkedIn profile link (optional)?",
    "GitHub profile link (optional)?",
    "Portfolio or personal website (optional)?",
    "Tell me about your education background.",
    "Tell me about your experience or projects.",
    "List your skills (comma separated).",
    "Any certifications you’ve earned?",
    "Languages you know?",
  ];

  const [answers, setAnswers] = useState({});
  const [current, setCurrent] = useState(0);
  const [input, setInput] = useState("");
  const [chat, setChat] = useState([]);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  // Dynamic input type based on question
  const getInputType = () => {
    const q = questions[current].toLowerCase();
    if (q.includes("date of birth")) return "date";
    if (q.includes("email")) return "email";
    if (q.includes("phone")) return "tel";
    if (q.includes("link") || q.includes("website")) return "url";
    return "text";
  };

  // Handle input submission
  const handleNext = async () => {
    if (!input.trim()) return;

    const newAnswers = { ...answers, [questions[current]]: input };
    setAnswers(newAnswers);

    setChat((prev) => [
      ...prev,
      { sender: "user", text: input },
      {
        sender: "bot",
        text:
          current + 1 < questions.length
            ? questions[current + 1]
            : "Generating your professional resume... 🧠",
      },
    ]);

    setInput("");

    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:5000/generate-summary", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newAnswers),
        });
        const data = await response.json();
        if (data.summary) {
          const cleanText = data.summary
            .replace(/[#`*]/g, "") // remove markdown symbols
            .replace(/\n{2,}/g, "\n\n"); // clean extra newlines
          setSummary(cleanText);
        } else {
          setSummary("❌ No summary generated.");
        }
      } catch (err) {
        console.error("Error generating summary:", err);
        setSummary("⚠️ Error generating summary. Check backend logs.");
      } finally {
        setLoading(false);
      }
    }
  };

  // Download as PDF
  const handleDownload = () => {
    const resumeElement = document.getElementById("resume");
    const opt = {
      margin: 0.5,
      filename: "Resume.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };
    html2pdf().from(resumeElement).set(opt).save();
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-900 text-white rounded-2xl shadow-xl">
      {!summary && (
        <>
          <h2 className="text-2xl font-bold mb-4 text-center">
            💬 Resume ChatBot
          </h2>

          <div className="bg-gray-800 p-4 rounded-md h-96 overflow-y-auto mb-4">
            {chat.map((msg, index) => (
              <div
                key={index}
                className={`mb-3 flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-3 py-2 rounded-lg max-w-xs ${
                    msg.sender === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-700 text-gray-100"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {chat.length === 0 && (
              <div className="text-gray-400 italic">
                👋 Hi! Let's create your resume step by step.
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <input
              type={getInputType()}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleNext()}
              placeholder="Enter Your Name: "
              className="flex-1 p-2 text-black rounded-md"
            />
            <button
              onClick={handleNext}
              className="bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Send
            </button>
          </div>
        </>
      )}

      {loading && (
        <p className="mt-4 text-center text-blue-400 animate-pulse">
          ⚙️ Generating your professional resume...
        </p>
      )}

      {summary && (
        <div
          id="resume"
          className="mt-8 bg-white text-black p-8 rounded-lg shadow-lg"
        >
          <h1 className="text-3xl font-bold mb-2 text-center">
            Professional Resume
          </h1>
          <hr className="mb-4 border-gray-400" />
          <div className="whitespace-pre-wrap leading-relaxed text-gray-800">
            {summary}
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={handleDownload}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
            >
              ⬇️ Download PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeBot;
