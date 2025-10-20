import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();

  return (
    <div className='mt-[-10px] w-[100%]'>
      <header className="flex items-center justify-between bg-white shadow-lg px-12 py-6">

      {/* Left: Resume Builder Title */}
      <div className="flex items-center mr-[15px] cursor-pointer" onClick={()=>navigate("/")}>
        <h2 className="font-semibold text-gray-600" >Resume Builder</h2>
      </div>

      {/* Middle: Search Bar */}
      <div className="flex-1 flex justify-center ml-[10px] mr-[5px]">
        <input
          type="text"
          placeholder="Search templates..."
          className="w-[450px] mr-[50px] max-w-lg p-[15px] text-lg border-2 border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Right: Review & Login/Signup */}
      <div className="flex items-start space-x-4 mr-[-80px]">
        <button onClick={()=>navigate('/resumeBot')} className="px-6 py-3 mt-1 bg-gray-200 rounded-[20px] w-[250px] text-lg font-medium hover:bg-gray-300 transition">
          Review Resume
        </button>
        <button
          className="px-6 py-3 mt-1 ml-[15px] mr-[30px] bg-blue-600 text-white w-[250px] rounded-[20px] text-lg font-medium hover:bg-blue-700 transition"
          onClick={() => navigate('/login')}
        >
          Login / Signup
        </button>
      </div>

    </header>
    </div>
  );
}
