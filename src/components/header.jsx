import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="flex w-[1200px] mt-[-20px] items-center justify-between bg-[#19485F] px-[15px] py-[10px] shadow-md">

      {/* Left: Logo + Title */}
      <div
        className="flex items-center cursor-pointer"
        onClick={() => navigate("/")}
      >
        <h2 className="text-[#D9E0A4] font-bold text-[20px] ml-[20px]">SkillFrame</h2>
      </div>

      {/* Center: Search Bar */}
      <div className="flex w-[550px] justify-center">
        <input
          type="text"
          placeholder="Search templates..."
          className="w-[480px] max-w-lg p-[10px] text-base border-2 border-[#D9E0A4] rounded-full 
          focus:outline-none focus:ring-2 focus:ring-[#D9E0A4] 
          bg-[#1F5C72] text-[#D9E0A4] placeholder-[#C5D2B3]"
        />
      </div>

      {/* Right: Buttons */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate('/resumeBot')}
          className="px-6 py-2 bg-[#FFB347] text-[#19485F] rounded-lg font-semibold 
          hover:bg-[#FFA533] transition w-[210px]"
        >
          Review Resume
        </button>
        <button
          onClick={() => navigate('/login')}
          className="px-6 py-2 ml-[25px] bg-[#D9E0A4] text-[#19485F] rounded-lg 
          font-semibold hover:bg-[#C5D2A0] transition w-[200px]"
        >
          Login / Signup
        </button>
      </div>

    </header>
  );
}
