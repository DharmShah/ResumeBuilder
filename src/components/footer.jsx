import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[#19485F] text-center py-6 px-4 mt-12 w-full shadow-inner">
      <div className="max-w-6xl mx-auto space-y-2">
        <p className="text-base sm:text-sm font-medium text-[#D9E0A4]">
          Student of <span className="font-bold text-[#FFB347]">Alliance University</span> | MCA (Gen AI)
        </p>
        <p className="text-base sm:text-sm font-medium text-[#D9E0A4]">
          GitHub:{" "}
          <a
            href="https://github.com/DharmShah/ResumeBuilder.git"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#FFB347] hover:text-[#D9E0A4] hover:underline transition-colors"
          >
            https://github.com/DharmShah/ResumeBuilder.git
          </a>
        </p>
        <p className="text-base sm:text-sm font-medium text-[#D9E0A4]">
          Name: Dharm Shah, Nandana R Nair, Manoj, Vijendra Jha, Balaji
        </p>
        <p className="text-sm mt-2 font-light text-[#D9E0A4]">
          © {new Date().getFullYear()} All rights reserved
        </p>
      </div>
    </footer>
  );
}