import React from "react";

const Resume4 = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#b8728a] to-[#a8627a] py-10 px-5 font-[Georgia] text-black leading-relaxed">
      <div className="max-w-[850px] mx-auto bg-[#faf8f5] p-[60px_80px] shadow-[0_10px_40px_rgba(0,0,0,0.3)] text-black">
        <h1 className="text-center text-[#666] text-[3em] font-bold mb-2 tracking-[1px]">
          Catherine Bale
        </h1>
        <p className="text-center italic text-[1.5em] mb-8 text-[#333]">
          Marketing Assistant
        </p>

        {/* Contact Info */}
        <div className="flex justify-between items-start mb-10 gap-5 flex-wrap">
          <div className="flex-1 text-center">
            <div className="text-[1.5em] mb-2 text-[#666]">✉</div>
            <div className="text-[0.95em] text-[#666]">c.bale@bale.com</div>
          </div>
          <div className="flex-1 text-center">
            <div className="text-[1.5em] text-[#666] mb-2">📍</div>
            <div className="text-[0.95em] text-[#666]">
              22611 Pacific Coast Hwy, Malibu
              <br />
              California 9022 USA
            </div>
          </div>
          <div className="flex-1 text-center">
            <div className="text-[1.5em] text-[#666] mb-2">📞</div>
            <div className="text-[0.95em] text-[#666]">+1+541+754-3010</div>
          </div>
        </div>

        {/* Profile Section */}
        <div className="bg-[#ebe8e3] py-3 px-5 my-[35px] text-center font-bold text-[1.1em] tracking-[2px] flex items-center justify-center gap-2">
          <span className="text-[1.2em] text-[#666]">👤</span>
          <span className="text-[#666]">PROFILE</span>
        </div>
        <p className="text-justify text-[#666] leading-[1.8] mb-5">
          To obtain a challenging marketing position with a reputable company
          where I can utilize my marketing skills and experience to drive
          business growth.
        </p>

        {/* Experience Section */}
        <div className="bg-[#ebe8e3]  py-3 px-5 my-[35px] text-center font-bold text-[1.1em] tracking-[2px] flex items-center justify-center gap-2">
          <span className="text-[1.2em] text-[#666]">💼</span>
          <span className="text-[#666]">PROFESSIONAL EXPERIENCE</span>
        </div>

        {/* Job 1 */}
        <div className="mb-6">
          <div className="flex justify-between items-baseline mb-2">
            <div className="flex-1">
              <span className="font-bold text-[#666]">Marketing Manager,</span>{" "}
              <span className="text-[#666]">Acme Corporation</span>
            </div>
            <div className="text-right min-w-[150px]">
              <div className="font-bold text-[#666]">2019 – present</div>
              <div className="text-[#666]">Milwaukee</div>
            </div>
          </div>
          <p className="leading-[1.7] text-[#666]">
            Developed and executed marketing strategies to increase brand
            awareness and drive sales
          </p>
        </div>

        {/* Job 2 */}
        <div className="mb-6">
          <div className="flex justify-between items-baseline mb-2">
            <div className="flex-1">
              <span className="font-bold text-[#666]">Marketing Coordinator,</span>{" "}
              <span className="text-[#666]">Global Industries</span>
            </div>
            <div className="text-right min-w-[150px]">
              <div className="font-bold text-[#666]">2017 – 2019</div>
              <div className="text-[#666]">Grand Island</div>
            </div>
          </div>
          <p className="leading-[1.7] text-[#666]">
            Assisted in the development and execution of marketing campaigns to
            promote products and services
          </p>
        </div>

        {/* Education Section */}
        <div className="bg-[#ebe8e3] py-3 px-5 my-[35px] text-center font-bold text-[1.1em] tracking-[2px] flex items-center justify-center gap-2">
          <span className="text-[1.2em] text-[#666]">🎓</span>
          <span className="text-[#666]">EDUCATION</span>
        </div>

        <div className="flex justify-between mb-4">
          <div>
            <span className="font-bold text-[#666]">Business Marketing,</span>{" "}
            <span className="text-[#666]">University of Wisconsin</span>
          </div>
          <div className="text-right">
            <div className="font-bold text-[#666]">2014 – 2017</div>
            <div className="text-[#666]">Milwaukee</div>
          </div>
        </div>

        {/* Certificates */}
        <div className="bg-[#ebe8e3] py-3 px-5 my-[35px] text-center font-bold text-[1.1em] tracking-[2px] flex items-center justify-center gap-2">
          <span className="text-[1.2em] text-[#666]">📜</span>
          <span className="text-[#666]">CERTIFICATES</span>
        </div>

        <div className="flex gap-4 flex-wrap mt-4 text-[#666]">
          <div className="text-[#666] text-black py-3 px-6 rounded-lg font-medium text-[0.95em]">
            Google Analytics Certified
          </div>
          <div className="text-[#666] text-black py-3 px-6 rounded-lg font-medium text-[0.95em]">
            HubSpot Inbound Marketing Certified
          </div>
        </div>

        {/* Languages */}
        <div className="bg-[#ebe8e3] text-[#666] py-3 px-5 my-[35px] text-center font-bold text-[1.1em] tracking-[2px] flex items-center justify-center gap-2">
          <span className="text-[1.2em]">🌐</span>
          <span>LANGUAGES</span>
        </div>

        <div className="flex gap-4 flex-wrap mt-4">
          <div className="text-[#666] text-black py-3 px-6 rounded-lg font-medium text-[0.95em]">
            English (C2)
          </div>
          <div className="text-[#666] text-black py-3 px-6 rounded-lg font-medium text-[0.95em]">
            Spanish (C2)
          </div>
        </div>

        {/* Skills */}
        <div className="bg-[#ebe8e3] py-3 px-5 my-[35px] text-center font-bold text-[1.1em] tracking-[2px] flex items-center justify-center gap-2">
          <span className="text-[1.2em] text-[#666]">💡</span>
          <span className="text-[#666]">SKILLS</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          {/* Skill 1 */}
          <div className="flex justify-between text-[#666] items-center">
            <span className="font-medium">Market research</span>
            <div className="flex gap-[6px] ">
              <div className="w-3 h-3 rounded-full bg-[#b8728a] text-[#666]" />
              <div className="w-3 h-3 rounded-full bg-[#b8728a] text-[#666]" />
              <div className="w-3 h-3 rounded-full bg-[#b8728a] text-[#666]" />
              <div className="w-3 h-3 rounded-full bg-[#b8728a] text-[#666]" />
              <div className="w-3 h-3 rounded-full bg-[#d4b5be] text-[#666]" />
            </div>
          </div>

          {/* Skill 2 */}
          <div className="flex justify-between items-center">
            <span className="font-medium text-[#666]">Analytical thinking</span>
            <div className="flex gap-[6px] text-[#666]">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="w-3 h-3 rounded-full bg-[#b8728a] text-[#666]"
                ></div>
              ))}
            </div>
          </div>

          {/* Skill 3 */}
          <div className="flex justify-between items-center">
            <span className="font-medium text-[#666]">Project management</span>
            <div className="flex gap-[6px]">
              <div className="w-3 h-3 rounded-full bg-[#b8728a] text-[#666]" />
              <div className="w-3 h-3 rounded-full bg-[#b8728a] text-[#666]" />
              <div className="w-3 h-3 rounded-full bg-[#b8728a] text-[#666]" />
              <div className="w-3 h-3 rounded-full bg-[#d4b5be] text-[#666]" />
              <div className="w-3 h-3 rounded-full bg-[#d4b5be]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume4;
