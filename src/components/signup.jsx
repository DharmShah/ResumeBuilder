import React from "react";
import logo from "../assets/robot.png"; // Import image
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="flex mr-[10px] mt-[-20px] bg-gray-100 dark:bg-gray-900">
      {/* Left Side - Logo Section */}
      {/* Left Side - Logo Section */}
      <div className="flex flex-col justify-center items-center w-1/2 bg-white">
        <img src={logo} alt="Logo" height={550} />
      </div>

      {/* Right Side - Login Form */}
      <div className="flex justify-center items-center w-1/2">
        <div className="w-[350px] p-8 space-y-8 bg-white rounded-2xl shadow-2xl dark:bg-gray-800">
          <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100">
            Signup
          </h1>

          <form noValidate className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block mt-[10px] w-[150px] mr-[230px] text-sm font-semibold text-gray-600 dark:text-gray-300"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="h-12 w-full p-[10px] pl-[25px] bg-gray-50 border border-gray-300 text-gray-900 rounded-full dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block mt-[10px] mr-[230px] text-sm font-semibold text-gray-600 dark:text-gray-300"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="h-12 w-full p-[10px]  pl-[25px] bg-gray-50 border border-gray-300 text-gray-900 rounded-full dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div >
              <label
                htmlFor="password"
                className="block w-[200px] mt-[10px] text-sm font-semibold text-gray-600 dark:text-gray-300"
              >
                Conform Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Conform password"
                className="h-12 w-full p-[10px] pl-[25px] bg-gray-50 border border-gray-300 text-gray-900 rounded-full dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <button
              type="submit" onClick={() => navigate('/')}
              className="w-[390px] h-12 text-lg font-semibold text-white bg-gray-800 rounded-full mt-[15px] ">
              Signup
            </button>

            <div className="text-sm text-center text-gray-600 dark:text-gray-400 mt-[15px]">
              Already have an account?{" "}
              <a
                href="/login"
                className="font-semibold text-blue-600 hover:underline dark:text-blue-400"
              >
                Login
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
