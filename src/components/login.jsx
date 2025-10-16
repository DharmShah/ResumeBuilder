import React from "react";

export default function Login() {
  return (
    <div>
      <div className="flex items-center justify-center text-center dark:bg-gray-50 dark:text-gray-800">
        <form
          noValidate=""
          action=""
          className="flex flex-col w-full max-w-lg p-12 rounded shadow-lg dark:text-gray-800"
        >
          <label
            htmlFor="username"
            className="self-start text-xs font-semibold"
          >
            Username or Email
          </label>
          <input
            id="username"
            type="text"
            className="flex items-center h-12 px-4 mt-2 rounded dark:text-gray-50 focus:outline-none focus:ring-2 focus:dark:border-rose-600 focus:dark:ring-rose-600"
          />
          <label
            htmlFor="password"
            className="self-start mt-3 text-xs font-semibold"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            className="flex items-center h-12 px-4 mt-2 rounded dark:text-gray-50 focus:outline-none focus:ring-2 focus:dark:border-rose-600 focus:dark:ring-rose-600"
          />
          <button
            type="submit"
            className="flex items-center justify-center h-12 px-6 mt-8 text-sm font-semibold rounded dark:bg-rose-600 dark:text-gray-50"
          >
            Login
          </button>
          <div className="flex justify-center mt-6 space-x-2 text-xs">
            <a
              rel="noopener noreferrer"
              href="#"
              className="dark:text-gray-600"
            >
              Forgot Password?
            </a>
            <span className="dark:text-gray-600">/</span>
            <a
              rel="noopener noreferrer"
              href="#"
              className="dark:text-gray-600"
            >
              Sign Up
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
