import React, { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const Resume2 = () => {
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
        className="w-[8.5in] mx-auto border p-[15px] bg-white text-gray-800 font-sans text-[10pt] leading-snug shadow-md overflow-hidden"
        style={{ maxHeight: "11.69in" }} // strict 1-page
      >
        {/* HEADER */}
        <header className="mb-5">
          <h1 className="text-[24pt] font-bold mb-1 text-center uppercase tracking-wide">
            {formData.fullName || "Your Name"}
          </h1>

          <div className="flex flex-wrap justify-center gap-4 text-[10pt] text-gray-600">
            {formData.email && <span>{formData.email}</span>}
            {formData.phone && <span>• {formData.phone}</span>}
            {formData.address && <span>• {formData.address}</span>}

            {formData.linkedin && (
              <span>
                •{" "}
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
              <span>
                •{" "}
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
              <span>
                •{" "}
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
        </header>

        {/* SUMMARY */}
        {formData.summary && (
          <section className="mb-4">
            <h2 className="text-[12pt] font-bold text-black text-center bg-gray-100 border-y border-gray-300 py-1 mt-5 mb-2">
              Profile
            </h2>
            <p className="text-[10pt] my-2 text-justify">{formData.summary}</p>
          </section>
        )}

        {/* EXPERIENCE */}
        {formData.experience && formData.experience.length > 0 && (
          <section className="mb-4">
            <h2 className="text-[12pt] font-bold text-black text-center bg-gray-100 border-y border-gray-300 py-1 mt-5 mb-2">
              Work Experience
            </h2>
            {formData.experience.map((exp, index) => (
              <div key={index} className="flex mb-3 leading-snug">
                <div className="w-1/4 pr-3 text-[9.5pt] text-gray-700 flex-shrink-0">
                  {exp.startDate || "Start"} – {exp.endDate || "End"}
                  <br />
                  {exp.location || ""}
                </div>
                <div className="w-3/4">
                  <p className="font-bold text-[10pt] m-0">
                    {exp.position || "Position"}
                  </p>
                  <span className="block mb-1 text-[10pt] font-normal">
                    {exp.company || "Company Name"}
                  </span>
                  {exp.description && (
                    <ul className="list-disc list-inside text-[9.5pt]">
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
          <section className="mb-4">
            <h2 className="text-[12pt] font-bold text-black text-center bg-gray-100 border-y border-gray-300 py-1 mt-5 mb-2">
              Education
            </h2>
            {formData.education.map((edu, index) => (
              <div key={index} className="flex mb-3 leading-snug">
                <div className="w-1/4 pr-3 text-[9.5pt] text-gray-700 flex-shrink-0">
                  {edu.startYear || "Start"} – {edu.endYear || "End"}
                  <br />
                  {edu.location || ""}
                </div>
                <div className="w-3/4">
                  <p className="font-bold text-[10pt] m-0">
                    {edu.degree || "Degree"}
                  </p>
                  <span className="block mb-1 text-[10pt] font-normal">
                    {edu.school || "Institution Name"}
                  </span>
                  {edu.field && (
                    <ul className="list-disc list-inside text-[9.5pt]">
                      <li>{edu.field}</li>
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </section>
        )}

        {/* SKILLS */}
        {formData.skills && (
          <section className="mb-4">
            <h2 className="text-[12pt] font-bold text-black text-center bg-gray-100 border-y border-gray-300 py-1 mt-5 mb-2">
              Skills
            </h2>
            <p className="text-[10pt]">{formData.skills}</p>
          </section>
        )}

        {/* LANGUAGES */}
        {formData.languages && (
          <section className="mb-4">
            <h2 className="text-[12pt] font-bold text-black text-center bg-gray-100 border-y border-gray-300 py-1 mt-5 mb-2">
              Languages
            </h2>
            <p className="text-[10pt]">{formData.languages}</p>
          </section>
        )}

        {/* CERTIFICATIONS */}
        {formData.certifications && (
          <section>
            <h2 className="text-[12pt] font-bold text-black text-center bg-gray-100 border-y border-gray-300 py-1 mt-5 mb-2">
              Certifications
            </h2>
            <p className="text-[10pt]">{formData.certifications}</p>
          </section>
        )}
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

export default Resume2;
