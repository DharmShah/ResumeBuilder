import React, { useState, useRef, useEffect } from "react";
import html2pdf from "html2pdf.js";

const ResumeBot = () => {
  const questions = [
    "What's your full name?",
    "Date of Birth?",
    "Your email address?",
    "Your phone number?",
    "LinkedIn profile link (optional)?",
    "GitHub profile link (optional)?",
    "Portfolio or other link (optional)?",
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
  const [summary, setSummary] = useState(""); // AI summary
  const [loading, setLoading] = useState(false);
  const resumeRef = useRef(null);

  const getInputType = () => {
    const q = questions[current].toLowerCase();
    if (q.includes("date of birth")) return "date";
    if (q.includes("email")) return "email";
    if (q.includes("phone")) return "tel";
    if (q.includes("link") || q.includes("website")) return "url";
    return "text";
  };

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
        // ✅ Connect to your backend
        const response = await fetch("http://127.0.0.1:5000/generate-summary", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newAnswers),
        });
        const data = await response.json();

        // Clean up the summary text
        let cleanSummary = data.summary || "";
        cleanSummary = cleanSummary
          .replace(/[#`>-]/g, "")
          .replace(/Professional Resume/gi, "")
          .replace(/Feel free to modify.*/gi, "")
          .replace(/\n{3,}/g, "\n\n")
          .trim();

        setSummary(cleanSummary);
      } catch (err) {
        console.error("Error generating summary:", err);
        setSummary("⚠️ Error generating summary. Check backend logs.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDownload = () => {
    const element = document.getElementById("printable-resume");
    const opt = {
      margin: 0.4,
      filename: "Professional_Resume.pdf",
      image: { type: "jpeg", quality: 1 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };
    html2pdf().set(opt).from(element).save();
  };

  const get = (q) => answers[q] || "";

  const splitList = (text) =>
    text
      ? text
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
      : [];

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-900 text-white rounded-2xl shadow-xl">
      {!summary && (
        <>
          <h2 className="text-2xl font-bold mb-4 text-center">
            💬 Resume ChatBot
          </h2>

          <div className="bg-gray-800 p-4 rounded-md h-96 overflow-y-auto mb-4">
            {chat.map((msg, i) => (
              <div
                key={i}
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
              placeholder="Enter your response..."
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
        <div className="mt-8 bg-white text-black rounded-lg shadow-lg overflow-hidden">
          <div
            id="printable-resume"
            ref={resumeRef}
            style={{
              fontFamily: "Arial, sans-serif",
              padding: "0.9in",
              width: "8.27in",
              color: "#000",
              lineHeight: "1.5",
            }}
          >
            {/* Header */}
            <div style={{ textAlign: "center", marginBottom: "10px" }}>
              <h1
                style={{
                  fontSize: "26px",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}
              >
                {get("What's your full name?")}
              </h1>
              <p style={{ fontSize: "13px", color: "#333" }}>
                📧 {get("Your email address?")} | 📞 {get("Your phone number?")}
                {get("LinkedIn profile link (optional)?") && (
                  <>
                    {" | "}
                    <a
                      href={get("LinkedIn profile link (optional)?")}
                      target="_blank"
                      rel="noreferrer"
                      style={{ color: "#0077b5" }}
                    >
                      LinkedIn
                    </a>
                  </>
                )}
                {get("GitHub profile link (optional)?") && (
                  <>
                    {" | "}
                    <a
                      href={get("GitHub profile link (optional)?")}
                      target="_blank"
                      rel="noreferrer"
                      style={{ color: "#24292e" }}
                    >
                      GitHub
                    </a>
                  </>
                )}
              </p>
            </div>

            <hr style={{ border: "1px solid #000", marginBottom: "15px" }} />

            {/* ✅ Professional Summary */}
            {summary && (
              <>
                <h2
                  style={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    borderBottom: "1px solid #000",
                    marginBottom: "6px",
                  }}
                >
                  Professional Summary
                </h2>
                <p
                  style={{
                    fontSize: "13px",
                    marginBottom: "10px",
                    whiteSpace: "pre-line",
                  }}
                >
                  {summary}
                </p>
              </>
            )}

            {/* Education */}
            <h2
              style={{
                fontSize: "16px",
                fontWeight: "bold",
                borderBottom: "1px solid #000",
                marginBottom: "6px",
              }}
            >
              Education
            </h2>
            <p style={{ fontSize: "13px", marginBottom: "10px" }}>
              {get("Tell me about your education background.")}
            </p>

            {/* Experience */}
            <h2
              style={{
                fontSize: "16px",
                fontWeight: "bold",
                borderBottom: "1px solid #000",
                marginBottom: "6px",
              }}
            >
              Experience / Projects
            </h2>
            <p style={{ fontSize: "13px", marginBottom: "10px" }}>
              {get("Tell me about your experience or projects.")}
            </p>

            {/* Skills */}
            <h2
              style={{
                fontSize: "16px",
                fontWeight: "bold",
                borderBottom: "1px solid #000",
                marginBottom: "6px",
              }}
            >
              Skills
            </h2>
            <ul style={{ fontSize: "13px", marginBottom: "10px" }}>
              {splitList(get("List your skills (comma separated).")).map(
                (skill, i) => (
                  <li key={i}>• {skill}</li>
                )
              )}
            </ul>

            {/* Certifications */}
            {get("Any certifications you’ve earned?") && (
              <>
                <h2
                  style={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    borderBottom: "1px solid #000",
                    marginBottom: "6px",
                  }}
                >
                  Certifications
                </h2>
                <ul style={{ fontSize: "13px", marginBottom: "10px" }}>
                  {splitList(get("Any certifications you’ve earned?")).map(
                    (cert, i) => (
                      <li key={i}>• {cert}</li>
                    )
                  )}
                </ul>
              </>
            )}

            {/* Languages */}
            {get("Languages you know?") && (
              <>
                <h2
                  style={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    borderBottom: "1px solid #000",
                    marginBottom: "6px",
                  }}
                >
                  Languages
                </h2>
                <ul style={{ fontSize: "13px" }}>
                  {splitList(get("Languages you know?")).map((lang, i) => (
                    <li key={i}>• {lang}</li>
                  ))}
                </ul>
              </>
            )}
          </div>

          <div className="mt-6 text-center mb-6">
            <button
              onClick={handleDownload}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
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
