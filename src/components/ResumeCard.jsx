import React from "react";

export default function ResumeCard() {
  return (
    <div className="grid grid-cols-3 gap-6 p-4">
      
      {/* Card 1 */}
      <div className="max-w-xs mt-[30px]  rounded-md shadow-md bg-blue-200 ">
        <img
          src="https://resumegenius.com/wp-content/uploads/modern-resume-template-ms-word.png?w=1400"
          alt="Business Resume"
          className="object-cover object-center w-[320px] h-[450px] dark:bg-gray-500 rounded-t-md"
        />
        <div className="flex flex-col justify-between p-6 space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-semibold tracking-wide">Business Professional</h2> 
          </div>
          <button
            type="button"
            className="flex items-center justify-center w-[280px] ml-[70px] font-semibold tracking-wide rounded-md dark:bg-rose-600 dark:text-gray-50"
          >
            Make This Resume
          </button>
        </div>
      </div>

      {/* Card 2 */}
      <div className="max-w-xs mt-[30px] rounded-md shadow-md bg-red-200 ">
        <img
          src="https://www.my-resume-templates.com/wp-content/uploads/2023/12/engineer-resume-sample-234.jpg"
          alt="Creative Resume"
          className="object-cover object-center rounded-t-md w-[320px] h-[450px] dark:bg-gray-500"
        />
        <div className="flex flex-col justify-between p-6 space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-semibold tracking-wide">Creative Designer</h2>
          </div>
          <button
            type="button"
            className="flex items-center justify-center w-[280px] ml-[70px] font-semibold tracking-wide rounded-md dark:bg-rose-600 dark:text-gray-50"
          >
            Make This Resume
          </button>
        </div>
      </div>

      {/* Card 3 */}
      <div className="max-w-xs mt-[30px] rounded-md shadow-md bg-green-200">
        <img
          src="https://www.mygreatlearning.com/blog/wp-content/uploads/2021/09/image.png"
          alt="Tech Resume"
          className="object-cover object-center rounded-t-md w-[320px] h-[450px] dark:bg-gray-500"
        />
        <div className="flex flex-col justify-between p-6 space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-semibold tracking-wide">Tech Specialist</h2>
          </div>
          <button
            type="button"
            className="flex items-center justify-center w-[280px] ml-[70px] font-semibold tracking-wide rounded-md dark:bg-rose-600 dark:text-gray-50"
          >
            Make This Resume
          </button>
        </div>
      </div>
      
      {/* Card 5 */}
      <div className="max-w-xs mt-[30px] rounded-md shadow-md bg-blue-200 ">
        <img
          src="https://resumegenius.com/wp-content/uploads/modern-resume-template-ms-word.png?w=1400"
          alt="Business Resume"
          className="object-cover object-center w-[320px] h-[450px] dark:bg-gray-500 rounded-t-md"
        />
        <div className="flex flex-col justify-between p-6 space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-semibold tracking-wide">Business Professional</h2> 
          </div>
          <button
            type="button"
            className="flex items-center justify-center w-[280px] ml-[70px] font-semibold tracking-wide rounded-md dark:bg-rose-600 dark:text-gray-50"
          >
            Make This Resume
          </button>
        </div>
      </div>

      {/* Card 5 */}
      <div className="max-w-xs mt-[30px] rounded-md shadow-md bg-red-200 ">
        <img
          src="https://www.my-resume-templates.com/wp-content/uploads/2023/12/engineer-resume-sample-234.jpg"
          alt="Creative Resume"
          className="object-cover object-center rounded-t-md w-[320px] h-[450px] dark:bg-gray-500"
        />
        <div className="flex flex-col justify-between p-6 space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-semibold tracking-wide">Creative Designer</h2>
          </div>
          <button
            type="button"
            className="flex items-center justify-center w-[280px] ml-[70px] font-semibold tracking-wide rounded-md dark:bg-rose-600 dark:text-gray-50"
          >
            Make This Resume
          </button>
        </div>
      </div>

      {/* Card 6 */}
      <div className="max-w-xs mt-[30px] rounded-md shadow-md bg-green-200">
        <img
          src="https://www.mygreatlearning.com/blog/wp-content/uploads/2021/09/image.png"
          alt="Tech Resume"
          className="object-cover object-center rounded-t-md w-[320px] h-[450px] dark:bg-gray-500"
        />
        <div className="flex flex-col justify-between p-6 space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-semibold tracking-wide">Tech Specialist</h2>
          </div>
          <button
            type="button"
            className="flex items-center justify-center w-[280px] ml-[70px] font-semibold tracking-wide rounded-md dark:bg-rose-600 dark:text-gray-50"
          >
            Make This Resume
          </button>
        </div>
      </div>      
    </div>
  );
}
