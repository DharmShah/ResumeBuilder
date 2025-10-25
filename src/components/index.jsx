import React, { useEffect, useState } from "react";
import resume1 from "../assets/resume1.png";
import resume2 from "../assets/resume2.png";
import resume3 from "../assets/resume3.png";
import resume4 from "../assets/resume4.png";
import resume5 from "../assets/resume5.png";
import resume6 from "../assets/resume6.png";
import resume7 from "../assets/resume7.png";
import resume8 from "../assets/resume8.png";

export default function Index() {
  const resumes = [
    { img: resume1, title: "Professional", desc: "Clean, professional layout for corporate jobs." },
    { img: resume2, title: "Creative", desc: "Colorful, eye-catching template for creative roles." },
    { img: resume3, title: "Minimalist", desc: "Simple, elegant design highlighting key info." },
    { img: resume4, title: "Modern", desc: "Trendy template with modern layout and style." },
    { img: resume5, title: "Classic", desc: "Timeless design for traditional industries." },
    { img: resume6, title: "Tech", desc: "Perfect for IT and tech-related job applications." },
    { img: resume7, title: "Executive", desc: "Showcase leadership and experience in style." },
    { img: resume8, title: "Elegant", desc: "Sleek, professional template for polished resumes." },
  ];

  const [selectedResume, setSelectedResume] = useState(null);

  useEffect(() => {
    const grid = document.querySelector(".scrolling-grid");
    if (grid) {
      const clone = grid.innerHTML;
      grid.innerHTML += clone; // seamless scroll
    }
  }, []);

  return (
    <div className="font-poppins bg-[#EAF2F8] w-[1490px] ml-[-100px] px-5 py-16 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute -top-32 -left-32 w-80 h-80 bg-[#19485F] opacity-10 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#FFB347] opacity-10 rounded-full blur-3xl animate-pulse-slow"></div>

      {/* Header */}
      <h1 className="text-4xl md:text-5xl font-bold text-[#19485F] mb-4 text-center animate-float">
        Build Your Dream Resume in Minutes ✨
      </h1>
      <p className="text-[#1F5C72] text-lg md:text-xl max-w-3xl text-center mb-12 mx-auto">
        Our AI-powered resume builder helps you craft professional, recruiter-ready resumes effortlessly. Choose from stunning templates, highlight your strengths, and land your dream job faster.
      </p>

      {/* Horizontal scrolling grid */}
      <div className="overflow-hidden w-[1490px] mb-12">
        <div className="scrolling-grid flex gap-6 animate-scroll">
          {resumes.map((resume, idx) => (
            <div
              key={idx}
              className="relative min-w-[220px] sm:min-w-[250px] md:min-w-[280px] h-[300px] sm:h-[340px] md:h-[380px] rounded-xl bg-white border border-gray-200 shadow-lg flex justify-center items-center overflow-hidden flex-shrink-0 transform transition-all duration-500 hover:scale-105 hover:-translate-y-2 hover:shadow-2xl cursor-pointer"
              onClick={() => setSelectedResume(resume)}
            >
              <img src={resume.img} alt={resume.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-transparent via-[#19485F]/20 to-transparent opacity-0 hover:opacity-30 transition-opacity duration-300 rounded-xl flex items-end justify-center pb-4">
                <span className="text-white font-bold text-lg drop-shadow-lg">{resume.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Button */}
      <div className="text-center mb-16">
        <button className="px-14 py-4 rounded-full text-lg md:text-xl font-bold text-white mt-[10px] shadow-xl transform transition-all duration-300 hover:scale-110 hover:shadow-2xl">
          Start Building Your Resume 🚀
        </button>
      </div>

      {/* Why Our AI Resume Builder Section */}
      <div className="max-w-5xl mx-auto mt-16 px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-[#19485F] text-center mb-8">
          Why Our AI Resume Builder Works for You
        </h2>
        <p className="text-[#1F5C72] text-lg md:text-xl text-center mb-12">
          Combining intelligence, speed, and beautiful design, our builder ensures your resume stands out — every time.
        </p>

        {/* Fun staggered layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="relative group">
            <div className="absolute -top-4 -left-4 w-full h-full bg-[#FFB347]/20 rounded-xl transform rotate-2 z-0"></div>
            <div className="bg-white rounded-xl shadow-lg p-6 relative z-10 transform transition duration-500 group-hover:scale-105 group-hover:rotate-0 cursor-pointer">
              <h3 className="text-xl font-bold mb-2">🚀 Lightning-Fast AI</h3>
              <p className="text-[#1F5C72]">
                Generate polished resumes in seconds — no stress, no guesswork.
              </p>
            </div>
          </div>

          <div className="relative group mt-8 md:mt-16">
            <div className="absolute -top-4 -right-4 w-full h-full bg-[#19485F]/10 rounded-xl transform -rotate-2 z-0"></div>
            <div className="bg-white rounded-xl shadow-lg p-6 relative z-10 transform transition duration-500 group-hover:scale-105 group-hover:rotate-0 cursor-pointer">
              <h3 className="text-xl font-bold mb-2">🎨 Stunning Templates</h3>
              <p className="text-[#1F5C72]">
                Choose designs that highlight your strengths and suit your industry.
              </p>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -top-4 -left-4 w-full h-full bg-[#1F5C72]/10 rounded-xl transform rotate-2 z-0"></div>
            <div className="bg-white rounded-xl shadow-lg p-6 relative z-10 transform transition duration-500 group-hover:scale-105 group-hover:rotate-0 cursor-pointer">
              <h3 className="text-xl font-bold mb-2">📝 Smart Customization</h3>
              <p className="text-[#1F5C72]">
                Let AI tailor each section to showcase your skills perfectly.
              </p>
            </div>
          </div>

          <div className="relative group mt-8 md:mt-16">
            <div className="absolute -top-4 -right-4 w-full h-full bg-[#FF6C63]/20 rounded-xl transform -rotate-2 z-0"></div>
            <div className="bg-white rounded-xl shadow-lg p-6 relative z-10 transform transition duration-500 group-hover:scale-105 group-hover:rotate-0 cursor-pointer">
              <h3 className="text-xl font-bold mb-2">💼 Job-Ready Output</h3>
              <p className="text-[#1F5C72]">
                ATS-friendly resumes recruiters love to read.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Resume Modal */}
      {selectedResume && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 md:p-10 relative w-11/12 md:w-1/2 lg:w-1/3 animate-float">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl font-bold"
              onClick={() => setSelectedResume(null)}
            >
              ✕
            </button>
            <img
              src={selectedResume.img}
              alt={selectedResume.title}
              className="w-full h-80 object-cover rounded-lg mb-4"
            />
            <h3 className="text-2xl font-bold text-[#19485F] mb-2">{selectedResume.title}</h3>
            <p className="text-[#1F5C72]">{selectedResume.desc}</p>
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
            animation: scroll 20s linear infinite;
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
        `}
      </style>
    </div>
  );
}