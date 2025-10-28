import React, { useEffect, useState } from "react";
import resume1 from "../assets/resume1.png";
import resume2 from "../assets/resume2.png";
import resume3 from "../assets/resume3.png";
import resume4 from "../assets/resume4.png";
import resume5 from "../assets/resume5.png";
import resume6 from "../assets/resume6.png";
import resume7 from "../assets/resume7.png";
import resume8 from "../assets/resume8.png";
import { useNavigate } from "react-router-dom";

export default function Index() {
  const navigate = useNavigate();
  const resumes = [
    { img: resume1 },
    { img: resume2 },
    { img: resume3 },
    { img: resume4 },
    { img: resume5 },
    { img: resume6 },
    { img: resume7 },
    { img: resume8 },
  ];

  const [selectedResume, setSelectedResume] = useState(null);

  useEffect(() => {
    const grid = document.querySelector(".scrolling-grid");
    if (grid) {
      const clone = grid.innerHTML;
      grid.innerHTML += clone; // seamless infinite scroll
    }
  }, []);

  return (
    <div className="font-poppins bg-[#EAF2F8] w-[1490px] ml-[-100px] px-5 py-20 relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute -top-32 -left-32 w-80 h-80 bg-[#19485F] opacity-10 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#FFB347] opacity-10 rounded-full blur-3xl animate-pulse-slow"></div>

      {/* Header */}
      <h1 className="text-5xl font-bold text-[#19485F] mb-4 text-center animate-float tracking-wide">
        SkillFrame — Build Resumes That Speak for You ✨
      </h1>
      <p className="text-[#1F5C72] text-lg max-w-3xl text-center mb-16 mx-auto leading-relaxed">
        Your story deserves more than plain text. Explore elegant templates,
        personalize your layout, and let SkillFrame turn your experience into a professional masterpiece.
      </p>

      {/* Scrolling Grid */}
      <div className="overflow-hidden w-[1490px] mb-20">
        <div className="scrolling-grid flex gap-10 animate-scroll">
          {resumes.map((resume, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedResume(resume)}
              className="relative min-w-[260px] md:min-w-[300px] h-[400px] md:h-[440px] rounded-2xl bg-white shadow-lg border border-gray-200 
                         flex justify-center items-center overflow-hidden transform transition-all duration-500 hover:scale-[1.03] 
                         hover:shadow-2xl cursor-pointer"
            >
              <img
                src={resume.img}
                alt={`resume-${idx + 1}`}
                className="w-full h-full object-cover rounded-2xl"
              />

              {/* Flowing Gradient Overlay */}
              <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-700 rounded-2xl">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#19485F]/30 via-transparent to-[#FFB347]/30 animate-gradient-flow rounded-2xl"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Button */}
      <div className="text-center mb-24">
        <button
          onClick={() => navigate("/airesume")}
          className="px-14 py-4 rounded-full text-lg font-bold text-[#1F3B4D] shadow-lg 
                     bg-gradient-to-r from-[#FFB347] via-[#FFD97A] to-[#D9E0A4]
                     hover:scale-110 hover:shadow-[0_0_20px_rgba(255,179,71,0.4)] 
                     transition-all duration-500"
        >
          Create My Resume Now 
        </button>
      </div>

      {/* Info Section (Restored old effect) */}
      <div className="max-w-5xl mx-auto mt-20 px-6">
        <h2 className="text-4xl font-bold text-[#19485F] text-center mb-10">
          Why SkillFrame Stands Out
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Card 1 */}
          <div className="relative group">
            <div className="absolute -top-4 -left-4 w-full h-full bg-[#FFB347]/20 rounded-2xl transform rotate-2 z-0 transition-all duration-500 group-hover:rotate-0"></div>
            <div className="bg-white rounded-2xl shadow-lg p-6 relative z-10 transform transition-all duration-500 group-hover:scale-105 cursor-pointer">
              <h3 className="text-2xl font-bold mb-2"> AI-Powered Speed</h3>
              <p className="text-[#1F5C72]">
                Craft your resume in moments — intelligent, accurate, and job-ready.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="relative group mt-8 md:mt-16">
            <div className="absolute -top-4 -right-4 w-full h-full bg-[#19485F]/10 rounded-2xl transform -rotate-2 z-0 transition-all duration-500 group-hover:rotate-0"></div>
            <div className="bg-white rounded-2xl shadow-lg p-6 relative z-10 transform transition-all duration-500 group-hover:scale-105 cursor-pointer">
              <h3 className="text-2xl font-bold mb-2"> Beautiful Templates</h3>
              <p className="text-[#1F5C72]">
                Pick from professional, creative, and modern designs that fit your style.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="relative group">
            <div className="absolute -top-4 -left-4 w-full h-full bg-[#1F5C72]/10 rounded-2xl transform rotate-2 z-0 transition-all duration-500 group-hover:rotate-0"></div>
            <div className="bg-white rounded-2xl shadow-lg p-6 relative z-10 transform transition-all duration-500 group-hover:scale-105 cursor-pointer">
              <h3 className="text-2xl font-bold mb-2"> Smart Personalization</h3>
              <p className="text-[#1F5C72]">
                AI helps tailor your resume sections to highlight your best qualities.
              </p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="relative group mt-8 md:mt-16">
            <div className="absolute -top-4 -right-4 w-full h-full bg-[#FF6C63]/20 rounded-2xl transform -rotate-2 z-0 transition-all duration-500 group-hover:rotate-0"></div>
            <div className="bg-white rounded-2xl shadow-lg p-6 relative z-10 transform transition-all duration-500 group-hover:scale-105 cursor-pointer">
              <h3 className="text-2xl font-bold mb-2"> Score Check</h3>
              <p className="text-[#1F5C72]">
                when you upload resume bot will check the score out of 100. 
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Resume Preview Modal */}
      {selectedResume && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 md:p-10 relative w-11/12 md:w-1/2 lg:w-1/3 animate-float">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl font-bold"
              onClick={() => setSelectedResume(null)}
            >
              ✕
            </button>
            <img
              src={selectedResume.img}
              alt="Resume Preview"
              className="w-full h-80 object-cover rounded-lg mb-4"
            />
          </div>
        </div>
      )}

      {/* Tailwind Animations */}
      <style>
        {`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-scroll {
            animation: scroll 25s linear infinite;
          }

          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-6px); }
          }
          .animate-float {
            animation: float 4s ease-in-out infinite;
          }

          @keyframes pulse-slow {
            0%, 100% { opacity: 0.1; }
            50% { opacity: 0.2; }
          }
          .animate-pulse-slow {
            animation: pulse-slow 6s ease-in-out infinite;
          }

          @keyframes gradient-flow {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .animate-gradient-flow {
            background-size: 200% 200%;
            animation: gradient-flow 6s ease infinite;
          }
        `}
      </style>
    </div>
  );
}
