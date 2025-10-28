import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[#19485F] text-center py-8 px-6 mt-16 w-full shadow-inner border-t border-[#D9E0A4]/20">
      <div className="max-w-6xl mx-auto space-y-3 text-[#D9E0A4]">
        
        {/* University & Course */}
        <p className="text-sm sm:text-base font-medium">
          Student of{" "}
          <span className="font-bold text-[#FFB347]">Alliance University</span> | MCA (Gen AI)
        </p>

        {/* GitHub Link */}
        <p className="text-sm sm:text-base font-medium">
          GitHub:{" "}
          <a
            href="https://github.com/DharmShah/ResumeBuilder.git"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#FFB347] font-semibold hover:text-[#D9E0A4] hover:underline transition-colors duration-200"
          >
            github.com/DharmShah/ResumeBuilder
          </a>
        </p>

        {/* Team Names */}
        <p className="text-sm sm:text-base font-medium">
          Team Members:{" "}
          <span className="text-[#FFB347]">
            Dharm Shah, Nandana R Nair, Manoj, Vijendra Jha, Balaji
          </span>
        </p>

        {/* Divider line */}
        <div className="w-[80%] sm:w-[60%] mx-auto border-t border-[#D9E0A4]/20 my-3"></div>

        {/* Copyright */}
        <p className="text-xs sm:text-sm font-light opacity-80">
          © {new Date().getFullYear()} All Rights Reserved | SkillFrame Project
        </p>
      </div>
    </footer>
  );
}
