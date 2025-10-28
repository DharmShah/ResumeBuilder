import React, { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const Resume4 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const resumeRef = useRef();

  // Retrieve resume data safely
  const formData =
    location.state?.formData ||
    JSON.parse(localStorage.getItem("resumeData")) ||
    {};

  // Safe destructuring with fallbacks
  const name = formData.fullName || "Catherine Bale";
  const title = formData.title || "Marketing Assistant";
  const email = formData.email || "c.bale@bale.com";
  const phone = formData.phone || "+1 541 754-3010";
  const address =
    formData.address || "22611 Pacific Coast Hwy, Malibu, California, USA";
  const summary =
    formData.summary ||
    "To obtain a challenging marketing position where I can utilize my skills and experience to drive business growth.";
  const experience = Array.isArray(formData.experience)
    ? formData.experience
    : [];
  const education = Array.isArray(formData.education)
    ? formData.education
    : [];
  const certificates = Array.isArray(formData.certificates)
    ? formData.certificates
    : [];
  const skills = Array.isArray(formData.skills) ? formData.skills : [];
  const languages = Array.isArray(formData.languages)
    ? formData.languages
    : [];

  // Download as PDF
  const handleDownload = async () => {
    if (!resumeRef.current) return;
    const resumeElement = resumeRef.current;

    const canvas = await html2canvas(resumeElement, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = 210;
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${name.replace(/\s+/g, "_")}_Resume.pdf`);
  };

  // Go back to edit form
  const handleEdit = () => {
    navigate("/form", { state: { formData } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#b8728a] to-[#a8627a] py-10 px-5 font-[Georgia] text-black leading-relaxed">
      <div
        ref={resumeRef}
        className="max-w-[850px] mx-auto bg-[#faf8f5] p-[60px_80px] shadow-[0_10px_40px_rgba(0,0,0,0.3)] text-black"
      >
        {/* Header */}
        <h1 className="text-center text-[#666] text-[3em] font-bold mb-2 tracking-[1px]">
          {name}
        </h1>
        <p className="text-center italic text-[1.5em] mb-8 text-[#333]">
          {title}
        </p>

        {/* Contact Info */}
        <div className="flex justify-between items-start mb-10 gap-5 flex-wrap text-[#666]">
          <div className="flex-1 text-center">
            <div className="text-[1.5em] mb-2">✉</div>
            <div className="text-[0.95em]">{email}</div>
          </div>
          <div className="flex-1 text-center">
            <div className="text-[1.5em] mb-2">📍</div>
            <div className="text-[0.95em]">{address}</div>
          </div>
          <div className="flex-1 text-center">
            <div className="text-[1.5em] mb-2">📞</div>
            <div className="text-[0.95em]">{phone}</div>
          </div>
        </div>

        {/* Profile */}
        <Section title="PROFILE">
          <p className="text-justify text-[#666] leading-[1.8]">{summary}</p>
        </Section>

        {/* Experience */}
        <Section title="PROFESSIONAL EXPERIENCE">
          {experience.length > 0 ? (
            experience.map((exp, i) => (
              <div key={i} className="mb-6">
                <div className="flex justify-between items-baseline mb-2">
                  <div className="flex-1">
                    <span className="font-bold text-[#666]">{exp.title}, </span>
                    <span className="text-[#666]">{exp.company}</span>
                  </div>
                  <div className="text-right min-w-[150px]">
                    <div className="font-bold text-[#666]">
                      {exp.startDate} – {exp.endDate}
                    </div>
                    <div className="text-[#666]">{exp.location}</div>
                  </div>
                </div>
                <p className="leading-[1.7] text-[#666]">{exp.description}</p>
              </div>
            ))
          ) : (
            <p className="text-[#666] italic">No experience added yet.</p>
          )}
        </Section>

        {/* Education */}
        <Section title="EDUCATION">
          {education.length > 0 ? (
            education.map((edu, i) => (
              <div key={i} className="flex justify-between mb-4 text-[#666]">
                <div>
                  <span className="font-bold">{edu.degree}, </span>
                  <span>{edu.school}</span>
                </div>
                <div className="text-right">
                  <div className="font-bold">
                    {edu.startYear} – {edu.endYear}
                  </div>
                  <div>{edu.location}</div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-[#666] italic">No education details available.</p>
          )}
        </Section>

        {/* Certificates */}
        {certificates.length > 0 && (
          <Section title="CERTIFICATES">
            <div className="flex gap-4 flex-wrap mt-4 text-[#666]">
              {certificates.map((cert, i) => (
                <div
                  key={i}
                  className="py-3 px-6 rounded-lg font-medium text-[0.95em]"
                >
                  {cert}
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <Section title="LANGUAGES">
            <div className="flex gap-4 flex-wrap mt-4 text-[#666]">
              {languages.map((lang, i) => (
                <div
                  key={i}
                  className="py-3 px-6 rounded-lg font-medium text-[0.95em]"
                >
                  {lang}
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <Section title="SKILLS">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 text-[#666]">
              {skills.map((skill, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center text-[#666]"
                >
                  <span className="font-medium">{skill}</span>
                  <div className="flex gap-[6px]">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <div
                        key={j}
                        className={`w-3 h-3 rounded-full ${
                          j < 4 ? "bg-[#b8728a]" : "bg-[#d4b5be]"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Section>
        )}
      </div>

      {/* Buttons */}
      <div className="text-center mt-10">
        <button
          onClick={handleDownload}
          className="bg-[#444] text-white px-6 py-3 rounded-lg mx-2 hover:bg-[#333]"
        >
          Download Resume
        </button>
        <button
          onClick={handleEdit}
          className="bg-[#666] text-white px-6 py-3 rounded-lg mx-2 hover:bg-[#555]"
        >
          Edit Information
        </button>
      </div>
    </div>
  );
};

// Section Component
const Section = ({ title, children }) => (
  <>
    <div className="bg-[#ebe8e3] py-3 px-5 my-[35px] text-center font-bold text-[1.1em] tracking-[2px] flex items-center justify-center gap-2 text-[#666]">
      <span>{title}</span>
    </div>
    {children}
  </>
);

export default Resume4;
