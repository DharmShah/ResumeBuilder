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
    { id: 1, name: "Business Professional", img: resume1, color: "bg-blue-100" },
    { id: 2, name: "Creative Designer", img: resume2, color: "bg-red-100" },
    { id: 3, name: "Tech Specialist", img: resume3, color: "bg-green-100" },
    { id: 4, name: "Business Professional", img: resume4, color: "bg-blue-100" },
    { id: 5, name: "Creative Designer", img: resume5, color: "bg-red-100" },
    { id: 6, name: "Tech Specialist", img: resume6, color: "bg-green-100" },
    { id: 7, name: "Business Professional", img: resume7, color: "bg-blue-100" },
    { id: 8, name: "Creative Designer", img: resume8, color: "bg-red-100" },
    { id: 9, name: "Custom Resume", img: custome, color: "bg-yellow-100" },
  ];

  const handleClick = (id) => {
    if (id === 9) {
      navigate("/resume9");
    } else {
      navigate(`/form?id=${id}`);
    }
  };

  return (
    <div className="grid grid-cols-3 gap-6 p-4">
      {resumes.map((resume) => (
        <div
          onClick={() => handleClick(resume.id)}
          key={resume.id}
          className={`max-w-xs mt-[30px] cursor-pointer rounded-md shadow-md transition transform hover:shadow-xl hover:-translate-y-1 ${resume.color}`}
        >
          <img
            src={resume.img}
            alt={resume.name}
            className="object-cover object-center w-[320px] h-[450px] rounded-t-md"
          />
          <div className="flex flex-col justify-between p-6 space-y-8">
            <h2 className="text-3xl font-semibold tracking-wide text-gray-800">
              {resume.name}
            </h2>
            <button
              type="button"
              className="flex items-center justify-center w-[280px] ml-[70px] font-semibold tracking-wide rounded-md bg-[#D9E0A4] text-[#19485F] hover:bg-[#C5D2A0] transition-shadow shadow-md hover:shadow-lg"
            >
              Make This Resume
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}