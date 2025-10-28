import React from "react";
import { useNavigate } from "react-router-dom";
import custome from "../assets/customise.png";
import resume1 from "../assets/resume1.png";
import resume2 from "../assets/resume2.png";
import resume3 from "../assets/resume3.png";
import resume4 from "../assets/resume4.png";
import resume5 from "../assets/resume5.png";
import resume6 from "../assets/resume6.png";
import resume7 from "../assets/resume7.png";
import resume8 from "../assets/resume8.png";

export default function ResumeCard() {
  const navigate = useNavigate();

  const resumes = [
    { id: 1, name: "Template 1", img: resume1 },
    { id: 2, name: "Template 2", img: resume2 },
    { id: 3, name: "Template 3", img: resume3 },
    { id: 4, name: "Template 4", img: resume4 },
    { id: 5, name: "Template 5", img: resume5 },
    { id: 6, name: "Template 6", img: resume6 },
    { id: 7, name: "Template 7", img: resume7 },
    { id: 8, name: "Template 8", img: resume8 },
    { id: 9, name: "Custom Resume", img: custome },
  ];

const handleClick = (id) => {
  // Clear ALL saved resume data
  localStorage.removeItem("formData");
  localStorage.removeItem("resumeData");
  sessionStorage.removeItem("formData");

  // If you ever store individual fields
  Object.keys(localStorage)
    .filter((key) => key.includes("resumeField"))
    .forEach((key) => localStorage.removeItem(key));

  // Navigate to selected template
  if (id === 9) {
    navigate("/resume9");
  } else {
    navigate(`/form?id=${id}`);
  }
};



  return (
    <div className="font-poppins bg-[#F9FAFB] w-[1180px] ml-[1px] px-10 py-20 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Decorative blobs (same look as index) */}
      <div className="absolute w-80 h-80 bg-[#19485F] opacity-10 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#FFB347] opacity-10 rounded-full blur-3xl animate-pulse-slow"></div>

      {/* Heading */}
      <h1 className="text-5xl font-bold text-[#19485F] mb-12 text-center tracking-wide animate-float">
        Select Your Template
      </h1>

      {/* Grid (3 columns, generous gaps) */}
      <div className="grid grid-cols-3 gap-x-20 gap-y-28 z-10 ml-[-15px]">
        <style>
          {`
            @keyframes gradientFlow {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
            .flow-card {
              background: linear-gradient(
                120deg,
                rgba(25,72,95,0.04),
                rgba(255,179,71,0.04),
                rgba(217,224,164,0.04)
              );
              background-size: 200% 200%;
              animation: gradientFlow 8s ease-in-out infinite;
            }
            @keyframes float {
              0%,100% { transform: translateY(0); }
              50% { transform: translateY(-5px); }
            }
            .animate-float { animation: float 4s ease-in-out infinite; }

            @keyframes pulse-slow {
              0%, 100% { opacity: 0.1; }
              50% { opacity: 0.2; }
            }
            .animate-pulse-slow { animation: pulse-slow 6s ease-in-out infinite; }

            /* special shimmer for custom card */
            .custom-shimmer {
              background: linear-gradient(90deg, rgba(255,179,71,0.12), rgba(217,224,164,0.08), rgba(25,72,95,0.08));
              background-size: 300% 300%;
              animation: gradientFlow 6s ease-in-out infinite;
            }

            /* subtle light sweep on image */
            .light-sweep::after {
              content: "";
              position: absolute;
              inset: 0;
              background: linear-gradient(120deg, rgba(255,255,255,0.0) 0%, rgba(255,255,255,0.06) 50%, rgba(255,255,255,0.0) 100%);
              transform: translateX(-120%);
              transition: transform 0.9s ease;
              pointer-events: none;
            }
            .group:hover .light-sweep::after {
              transform: translateX(120%);
            }
          `}
        </style>

        {resumes.map((resume, idx) => {
          const isCustom = resume.id === 9;
          return (
            <div
              key={resume.id}
              onClick={() => handleClick(resume.id)}
              className={`group relative cursor-pointer rounded-2xl overflow-hidden transition-all duration-400 transform ${
                isCustom
                  ? "scale-[1.02] hover:scale-[1.025] shadow-[0_10px_40px_rgba(255,179,71,0.14)]"
                  : "hover:-translate-y-1 hover:shadow-2xl"
              } ${isCustom ? "custom-shimmer" : "flow-card"}`}
              style={{ width: 350 }}
            >

              {/* Image wrapper: ensures full image visible */}
              <div className="relative w-full bg-wheat flex items-center justify-center" style={{ height: 480 }}>
                <img
                  src={resume.img}
                  alt={resume.name}
                  className="object-contain w-full h-full transition-transform duration-500"
                />
                {/* light sweep overlay */}
                <div className="absolute inset-0 light-sweep pointer-events-none" />
              </div>

              {/* Button + spacing */}
              <div className="flex flex-col items-center justify-center p-5 bg-transparent">
                <h3 className="text-lg font-medium text-[#19485F] mb-4">{isCustom ? "Build a Custom Resume" : "Preview & Use"}</h3>

                {/* Button: custom one stands out */}
                {isCustom ? (
                  <button
                    type="button"
                    className="w-[220px] py-2 font-semibold tracking-wide rounded-md bg-gradient-to-r from-[#FFB347] via-[#FFD97A] to-[#D9E0A4] text-[#1F3B4D] shadow-lg hover:scale-[1.03] transition-all duration-300"
                  >
                    Create Custom → 
                  </button>
                ) : (
                  <button
                    type="button"
                    className="w-[220px] py-2 font-semibold tracking-wide rounded-md bg-[#D9E0A4] text-[#19485F] hover:bg-[#C5D2A0] transition-all duration-300"
                  >
                    Make This Resume
                  </button>
                )}

                {/* extra breathing space under button */}
                <div style={{ height: 18 }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
