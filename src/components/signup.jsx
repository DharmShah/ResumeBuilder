import React from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  return (
    <div className="relative flex justify-center items-center min-h-[calc(100vh-80px)] font-poppins bg-gradient-to-br from-[#19485F] via-[#1F5C72] to-[#FFB347] animate-[gradientShift_10s_ease_infinite] bg-[length:200%_200%] overflow-hidden">
      
      {/* Glowing circles */}
      <div className="absolute top-[-120px] left-[-120px] w-[350px] h-[350px] bg-[#FFB347]/30 rounded-full blur-3xl animate-[pulseSlow_6s_ease_in_out_infinite]"></div>
      <div className="absolute bottom-[-120px] right-[-120px] w-[350px] h-[350px] bg-[#D9E0A4]/20 rounded-full blur-3xl animate-[pulseSlow_6s_ease_in_out_infinite]"></div>

      {/* Book-style container */}
      <div className="relative flex w-[75%] max-w-6xl h-[75vh] rounded-[40px] shadow-2xl overflow-hidden border border-[#D9E0A4]/30 transform perspective-[1200px] bg-[#1F5C72]/90 backdrop-blur-sm">
        
        {/* Left page (form) */}
        <div className="w-1/2 flex justify-center items-center bg-[#1F5C72]/80">
          <form className="w-[80%] max-w-sm text-[#D9E0A4]">
            <h2 className="text-3xl font-bold mb-8 text-center">Create Account</h2>

            <div className="mb-5">
              <label className="block mb-2 text-sm font-semibold">Full Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                required
                className="w-full p-3 rounded-full bg-[#19485F] border border-[#D9E0A4]/50 text-[#D9E0A4] placeholder-[#C5D2B3] focus:outline-none focus:ring-2 focus:ring-[#FFB347]"
              />
            </div>

            <div className="mb-5">
              <label className="block mb-2 text-sm font-semibold">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                required
                className="w-full p-3 rounded-full bg-[#19485F] border border-[#D9E0A4]/50 text-[#D9E0A4] placeholder-[#C5D2B3] focus:outline-none focus:ring-2 focus:ring-[#FFB347]"
              />
            </div>

            <div className="mb-5">
              <label className="block mb-2 text-sm font-semibold">Password</label>
              <input
                type="password"
                placeholder="Enter password"
                required
                className="w-full p-3 rounded-full bg-[#19485F] border border-[#D9E0A4]/50 text-[#D9E0A4] placeholder-[#C5D2B3] focus:outline-none focus:ring-2 focus:ring-[#FFB347]"
              />
            </div>

            <div className="mb-6">
              <label className="block mb-2 text-sm font-semibold">Confirm Password</label>
              <input
                type="password"
                placeholder="Re-enter password"
                required
                className="w-full p-3 rounded-full bg-[#19485F] border border-[#D9E0A4]/50 text-[#D9E0A4] placeholder-[#C5D2B3] focus:outline-none focus:ring-2 focus:ring-[#FFB347]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#FFB347] text-[#19485F] font-bold py-3 rounded-full hover:bg-[#FFA533] transition-all duration-300"
            >
              Sign Up
            </button>

            <p className="text-center text-sm mt-6">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/login")}
                className="text-[#FFB347] cursor-pointer font-semibold hover:underline"
              >
                Login
              </span>
            </p>
          </form>
        </div>

        {/* Right page (text/graphic) */}
        <div className="w-1/2 bg-gradient-to-br from-[#19485F]/90 to-[#1F5C72]/90 flex flex-col justify-center items-center text-[#D9E0A4] p-12 border-l border-[#D9E0A4]/30">
          <h1 className="text-5xl font-bold mb-4 text-center">
            Join <span className="text-[#FFB347]">SkillFrame</span>
          </h1>
          <p className="text-lg text-center leading-relaxed opacity-90 max-w-md">
            Create your personalized resume, get feedback instantly, and build your professional profile with ease.
          </p>
        </div>

        {/* Center fold (book spine) */}
        <div className="absolute left-1/2 top-0 h-full w-[3px] bg-gradient-to-b from-[#D9E0A4]/10 via-[#D9E0A4]/40 to-[#D9E0A4]/10"></div>
      </div>

      {/* Tailwind keyframes */}
      <style>
        {`
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          @keyframes pulseSlow {
            0%, 100% { opacity: 0.4; transform: scale(1); }
            50% { opacity: 0.6; transform: scale(1.05); }
          }
        `}
      </style>
    </div>
  );
}
