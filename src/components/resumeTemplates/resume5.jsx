import React, { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const Resume5 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const resumeRef = useRef();

  // Load form data safely
  const formData =
    location.state?.formData ||
    JSON.parse(localStorage.getItem("resumeData")) ||
    {};

  // Safe destructuring with fallbacks
  const name = formData.fullName || "Brian T. Wayne";
  const title = formData.title || "Business Development Consultant";
  const email = formData.email || "brian@wayne.com";
  const phone = formData.phone || "+1-541-754-3010";
  const address =
    formData.address ||
    "22611 Pacific Coast Hwy, Malibu, California, 9022, USA";
  const linkedin = formData.linkedin || "linkedin.com/wayne-2345";
  const website = formData.website || "wayne.com";
  const summary =
    formData.summary ||
    "I'm a business development consultant with a passion for helping companies achieve growth. With my MBA degree and experience in strategy and relationship building, I provide innovative solutions that drive success.";

  const education = Array.isArray(formData.education)
    ? formData.education
    : [
        {
          degree: "Master of Business Administration",
          school: "Harvard Business School",
          startYear: "2016",
          endYear: "2018",
          location: "Boston",
        },
      ];

  const experience = Array.isArray(formData.experience)
    ? formData.experience
    : [
        {
          title: "Business Development Consultant",
          company: "Appleseed Inc.",
          startDate: "2022",
          endDate: "Present",
          location: "New York",
          description:
            "Developed and implemented strategic plans resulting in a 30% increase in new business opportunities. Collaborated with cross-functional teams to drive business growth and expansion.",
        },
      ];

  const skills = Array.isArray(formData.skills)
    ? formData.skills
    : [
        "Strategic thinking and problem-solving",
        "Relationship building and networking",
        "Creative and innovative thinking",
      ];

  const languages = Array.isArray(formData.languages)
    ? formData.languages
    : ["English", "Spanish"];

  const awards = Array.isArray(formData.awards)
    ? formData.awards
    : [
        {
          name: "Outstanding Business Student Award",
          institution: "University of Southern California",
          year: "2014",
        },
        {
          name: "Dean's List",
          institution: "University of California, Los Angeles",
          year: "2015–2016",
        },
      ];

  // Handle download
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

  const handleEdit = () => {
    navigate("/form", { state: { formData } });
  };

  return (
    <div className="bg-[#e6e3dd] py-10">
      <div
        ref={resumeRef}
        className="flex max-w-[1200px] mx-auto min-h-screen text-[#333] font-[Georgia] leading-relaxed bg-white shadow-[0_10px_30px_rgba(0,0,0,0.2)]"
      >
        {/* Left Column */}
        <div className="bg-[#3d4f45] text-[#f5f5f0] w-[370px] p-[60px_40px]">
          <h1 className="text-[2.5em] font-normal mb-2">{name}</h1>
          <p className="text-[1.3em] italic mb-10 leading-snug">{title}</p>

          {/* Contact */}
          <div className="mb-12 text-[0.95em]">
            <p className="flex items-center mb-3">
              <span className="mr-3 text-[1.1em]">✉</span> {email}
            </p>
            <p className="flex items-center mb-3">
              <span className="mr-3 text-[1.1em]">📞</span> {phone}
            </p>
            <p className="flex items-start mb-3">
              <span className="mr-3 text-[1.1em]">📍</span>
              <span>{address}</span>
            </p>
            <p className="flex items-center mb-3">
              <span className="mr-3 text-[1.1em]">in</span> {linkedin}
            </p>
            <p className="flex items-center mb-3">
              <span className="mr-3 text-[1.1em]">🌐</span> {website}
            </p>
          </div>

          {/* Profile */}
          <h2 className="text-[1.4em] font-bold mb-5 pb-2 border-b-2 border-[#f5f5f0]">
            Profile
          </h2>
          <p className="text-justify text-[0.95em] leading-[1.7] mb-12">
            {summary}
          </p>

          {/* Education */}
          <h2 className="text-[1.4em] font-bold mb-5 pb-2 border-b-2 border-[#f5f5f0]">
            Education
          </h2>
          {education.map((edu, i) => (
            <div key={i} className="mb-9">
              <p className="font-bold text-[1.05em] mb-1">
                {edu.degree || "Degree"},
              </p>
              <p className="italic mb-1">{edu.school || "Institution"}</p>
              <p className="text-[0.9em] opacity-90">
                {edu.startYear} – {edu.endYear} | {edu.location}
              </p>
            </div>
          ))}

          {/* Languages */}
          <div className="mt-12">
            <h2 className="text-[1.4em] font-bold mb-5 pb-2 border-b-2 border-[#f5f5f0]">
              Languages
            </h2>
            <ul className="list-none pl-0">
              {languages.map((lang, i) => (
                <li
                  key={i}
                  className="mb-2 pl-5 relative before:content-['•'] before:absolute before:left-0"
                >
                  {lang}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column */}
        <div className="bg-[#f5f5f0] flex-1 p-[60px_50px]">
          {/* Experience */}
          <section className="mb-10">
            <h2 className="text-[1.4em] font-bold mb-5 pb-2 border-b-2 border-[#2d2d2d] text-[#2d2d2d]">
              Professional Experience
            </h2>

            {experience.map((exp, i) => (
              <div key={i} className="mb-9">
                <p className="font-bold text-[1.05em] mb-1">
                  {exp.title},{" "}
                  <span className="italic">{exp.company || ""}</span>
                </p>
                <p className="text-[0.9em] text-[#555] mb-3">
                  {exp.startDate} – {exp.endDate} | {exp.location}
                </p>
                <p className="text-justify text-[0.95em] leading-[1.7]">
                  {exp.description}
                </p>
              </div>
            ))}
          </section>

          {/* Skills */}
          <section className="mb-10">
            <h2 className="text-[1.4em] font-bold mb-5 pb-2 border-b-2 border-[#2d2d2d] text-[#2d2d2d]">
              Skills
            </h2>
            <ul className="list-none pl-0">
              {skills.map((skill, i) => (
                <li
                  key={i}
                  className="mb-3 pl-5 relative before:content-['•'] before:absolute before:left-0"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </section>

          {/* Awards */}
          {awards.length > 0 && (
            <section className="mb-10">
              <h2 className="text-[1.4em] font-bold mb-5 pb-2 border-b-2 border-[#2d2d2d] text-[#2d2d2d]">
                Awards
              </h2>
              {awards.map((award, i) => (
                <div key={i} className="mb-4">
                  <p>
                    <span className="font-bold">{award.name},</span> <br />
                    <span className="italic">
                      {award.institution}, {award.year}
                    </span>
                  </p>
                </div>
              ))}
            </section>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="text-center mt-10">
        <button
          onClick={handleDownload}
          className="bg-[#3d4f45] text-white px-6 py-3 rounded-lg mx-2 hover:bg-[#2d3b34]"
        >
          Download Resume
        </button>
        <button
          onClick={handleEdit}
          className="bg-[#555] text-white px-6 py-3 rounded-lg mx-2 hover:bg-[#444]"
        >
          Edit Information
        </button>
      </div>
    </div>
  );
};

export default Resume5;
