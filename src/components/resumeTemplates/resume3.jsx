import React, { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const Resume3 = () => {
  const resumeRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();

  const idMatch = location.pathname.match(/resume(\d+)/);
  const id = idMatch ? idMatch[1] : null;

  const formData =
    location.state?.formData ||
    JSON.parse(localStorage.getItem("resumeData") || "{}");

  if (!formData || Object.keys(formData).length === 0) {
    return (
      <p className="text-center text-red-600 mt-10">
        ⚠️ No data found. Please go back and fill out the form.
      </p>
    );
  }

  const handleDownload = async () => {
    const element = resumeRef.current;

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      scrollY: -window.scrollY,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "pt", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgProps = canvas.width / canvas.height;
    const imgHeight = pdfWidth / imgProps;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, imgHeight);
    pdf.save(`${formData.fullName || "Resume"}.pdf`);
  };

  const handleEdit = () => {
    localStorage.setItem("resumeData", JSON.stringify(formData));
    navigate(`/form?id=${id}`, { state: { formData } });
  };

  return (
    <div className="bg-gray-100 min-h-screen py-6">
      <div
        ref={resumeRef}
        className="w-[8.5in] min-h-[11in] mx-auto border p-[15px] bg-white text-[10pt] text-[#333] font-sans leading-relaxed shadow-md"
      >
        {/* HEADER */}
        <header className="flex items-start mb-6">
          {formData.profileImage ? (
            <img
              className="w-[100px] h-[100px] border-2 border-[#5f9ea0] rounded-md mr-6 shadow-sm object-contain"
              src={formData.profileImage}
              alt="Profile"
            />
          ) : (
            <img
              className="w-[100px] h-[100px] border-2 border-[#5f9ea0] rounded-md mr-6 shadow-sm object-contain"
              src="https://assets.scandit.com/400x500/34188e9ca7/symbology-qr-code.svg"
              alt="QR Code Logo"
            />
          )}

          <div className="flex-grow">
            <div className="flex items-baseline mb-1">
              <h1 className="text-[20pt] font-bold leading-tight">
                {formData.fullName || "Your Name"}
              </h1>
              {formData.title && (
                <span className="ml-3 text-[11pt] italic text-[#555]">
                  {formData.title}
                </span>
              )}
            </div>

            <div className="text-[9.5pt] text-[#555] space-y-1 mt-1">
              <div className="flex flex-wrap gap-x-4">
                {formData.address && (
                  <span className="whitespace-nowrap">
                    📍 {formData.address}
                  </span>
                )}
                {formData.email && (
                  <span className="whitespace-nowrap">
                    ✉️ {formData.email}
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-x-4">
                {formData.linkedin && (
                  <span className="whitespace-nowrap">
                    🔗{" "}
                    <a
                      href={formData.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-black"
                    >
                      LinkedIn
                    </a>
                  </span>
                )}
                {formData.github && (
                  <span className="whitespace-nowrap">
                    💻{" "}
                    <a
                      href={formData.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-black"
                    >
                      GitHub
                    </a>
                  </span>
                )}
                {formData.portfolio && (
                  <span className="whitespace-nowrap">
                    🌐{" "}
                    <a
                      href={formData.portfolio}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-black"
                    >
                      Portfolio
                    </a>
                  </span>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* PROFILE / SUMMARY */}
        {formData.summary && (
          <section>
            <h3 className="text-[14pt] font-bold border-b-2 border-[#5f9ea0] inline-block mb-2">
              Profile
            </h3>
            <p className="mt-2 text-justify">{formData.summary}</p>
          </section>
        )}

        {/* EXPERIENCE */}
        {formData.experience && formData.experience.length > 0 && (
          <section>
            <h3 className="text-[14pt] font-bold border-b-2 border-[#5f9ea0] inline-block mt-8 mb-2">
              Professional Experience
            </h3>
            {formData.experience.map((exp, index) => (
              <div key={index} className="mb-5">
                <div className="flex justify-between items-baseline mt-1 mb-0.5">
                  <strong className="text-[10.5pt] font-bold">
                    {exp.position || "Job Title"}
                  </strong>
                  <span className="text-[9.5pt] text-[#555] whitespace-nowrap">
                    {exp.startDate || "Start"} – {exp.endDate || "End"}{" "}
                    {exp.location ? `| ${exp.location}` : ""}
                  </span>
                </div>
                <div className="text-[#555]">
                  <em className="not-italic block">
                    {exp.company || "Company Name"}
                  </em>
                  {exp.description && (
                    <ul className="list-disc ml-5 mt-1 space-y-1 text-[9.5pt]">
                      {exp.description.split("\n").map((line, i) => (
                        <li key={i}>{line}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </section>
        )}

        {/* EDUCATION */}
        {formData.education && formData.education.length > 0 && (
          <section>
            <h3 className="text-[14pt] font-bold border-b-2 border-[#5f9ea0] inline-block mt-8 mb-2">
              Education
            </h3>
            {formData.education.map((edu, index) => (
              <div key={index} className="mb-5">
                <div className="flex justify-between items-baseline mt-1 mb-0.5">
                  <strong className="text-[10.5pt] font-bold">
                    {edu.degree || "Degree"}
                  </strong>
                  <span className="text-[9.5pt] text-[#555] whitespace-nowrap">
                    {edu.startYear || ""} – {edu.endYear || ""}
                  </span>
                </div>
                <div className="text-[#555]">
                  <em className="not-italic block">
                    {edu.school || "Institution Name"}
                  </em>
                  {edu.field && (
                    <p className="text-[9.5pt] mt-1">{edu.field}</p>
                  )}
                </div>
              </div>
            ))}
          </section>
        )}

        {/* SKILLS + LANGUAGES + STRENGTHS */}
        <section className="flex mt-8">
          {/* SKILLS */}
          {formData.skills && (
            <div className="w-3/5 pr-8">
              <h3 className="text-[14pt] font-bold border-b-2 border-[#5f9ea0] inline-block mb-2">
                Skills
              </h3>
              <p className="text-justify text-[10pt] leading-relaxed whitespace-pre-line">
                {formData.skills}
              </p>
            </div>
          )}

          {/* LANGUAGES & STRENGTHS */}
          <div className="w-2/5">
            {formData.languages && (
              <>
                <h3 className="text-[14pt] font-bold border-b-2 border-[#5f9ea0] inline-block mb-2">
                  Languages
                </h3>
                <p className="text-[10pt]">{formData.languages}</p>
              </>
            )}

            {formData.strengths && (
              <>
                <h3 className="text-[14pt] font-bold border-b-2 border-[#5f9ea0] inline-block mt-6 mb-2">
                  Strengths
                </h3>
                <p className="text-[10pt] whitespace-pre-line">
                  {formData.strengths}
                </p>
              </>
            )}
          </div>
        </section>
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex justify-center gap-4 mt-5">
        <button
          onClick={handleDownload}
          className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
        >
          Download Resume
        </button>

        <button
          onClick={handleEdit}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition"
        >
          Edit Information
        </button>
      </div>
    </div>
  );
};

export default Resume3;
