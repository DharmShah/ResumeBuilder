import React, { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Mail, Phone, Linkedin, Github, MapPin, Globe } from "lucide-react";

const Resume1 = () => {
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
        ⚠️ No data received. Please go back and fill the form.
      </p>
    );
  }

 const handleDownload = () => {
  const input = resumeRef.current;

  html2canvas(input, { scale: 3, useCORS: true }).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "pt", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    // Calculate the number of pages
    const imgProps = canvas.width / canvas.height;
    const pdfImgHeight = pdfWidth / imgProps;

    let heightLeft = pdfImgHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfImgHeight);
    heightLeft -= pdfHeight;

    while (heightLeft > 0) {
      position = heightLeft - pdfImgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfImgHeight);
      heightLeft -= pdfHeight;
    }

    pdf.save(`${formData.fullName || "Resume"}.pdf`);
  });
};

  const handleEdit = () => {
    localStorage.setItem("resumeData", JSON.stringify(formData));
    navigate(`/form?id=${id}`, { state: { formData } });
  };

  return (
    <div className="bg-gray-100 min-h-screen py-6">
      <div
        ref={resumeRef}
        className="w-[8.5in] mx-auto bg-white text-black p-[40px] leading-relaxed text-[10.5pt] font-serif shadow-lg"
      >
        {/* HEADER */}
        <header className="text-center mb-6">
          {formData.profileImagePreview && (
            <div className="flex justify-center mb-3">
              <img
                src={formData.profileImagePreview}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border border-gray-300"
              />
            </div>
          )}

          <h1 className="text-[20pt] font-bold uppercase tracking-wide mb-2">
            {formData.fullName || "Your Name"}
          </h1>

          {/* CONTACT DETAILS */}
          <div className="flex flex-wrap justify-center gap-4 text-[9pt] text-gray-700">
            {formData.email && (
              <span className="flex items-center gap-[5px] mr-[15px]">
                <Mail size={14} style={{ display: "inline-block" }} />
                {formData.email}
              </span>
            )}
            {formData.phone && (
              <span className="flex items-center gap-[5px] mr-[15px]">
                <Phone size={14} style={{ display: "inline-block" }} />
                {formData.phone}
              </span>
            )}
            {formData.linkedin && (
              <span className="flex items-center gap-[5px] mr-[15px]">
                <Linkedin size={14} style={{ display: "inline-block" }} />
                {formData.linkedin}
              </span>
            )}
            {formData.github && (
              <span className="flex items-center gap-[5px] mr-[15px]">
                <Github size={14} style={{ display: "inline-block" }} />
                {formData.github}
              </span>
            )}
            {formData.portfolio && (
              <span className="flex items-center gap-[5px] mr-[15px]">
                <Globe size={14} style={{ display: "inline-block" }} />
                {formData.portfolio}
              </span>
            )}
            {formData.address && (
              <span className="flex items-center gap-[5px] mr-[15px]">
                <MapPin size={14} style={{ display: "inline-block" }} />
                {formData.address}
              </span>
            )}
          </div>
        </header>

        {/* SUMMARY */}
        {formData.summary && (
          <section className="mb-5">
            <h2 className="text-[10pt] font-bold uppercase border-t border-b border-black text-center py-1">
              Summary
            </h2>
            <p className="mt-2 text-justify">{formData.summary}</p>
          </section>
        )}

        {/* EDUCATION */}
        {formData.education && formData.education.length > 0 && (
          <section className="mb-5">
            <h2 className="text-[10pt] font-bold uppercase border-t border-b border-black text-center py-1">
              Education
            </h2>
            {formData.education.map((edu, index) => (
              <div key={index} className="mt-3">
                <div className="flex justify-between items-end">
                  <h3 className="font-bold uppercase text-[10pt]">
                    {edu.school || "Institution Name"}
                  </h3>
                  <span className="text-[9pt]">
                    {edu.startYear || "Start"} – {edu.endYear || "End"}
                  </span>
                </div>
                <p className="italic text-[10pt]">
                  {edu.degree || "Degree"}
                  {edu.field && `, ${edu.field}`}
                </p>
              </div>
            ))}
          </section>
        )}

        {/* WORK EXPERIENCE */}
        {formData.experience && formData.experience.length > 0 && (
          <section className="mb-5">
            <h2 className="text-[10pt] font-bold uppercase border-t border-b border-black text-center py-1">
              Work Experience
            </h2>
            {formData.experience.map((exp, index) => (
              <div key={index} className="mt-3">
                <div className="flex justify-between items-end">
                  <h3 className="font-bold uppercase text-[10pt]">
                    {exp.company || "Company Name"}
                  </h3>
                  <span className="text-[9pt]">
                    {exp.startDate || "Start"} – {exp.endDate || "End"}
                  </span>
                </div>
                <p className="italic text-[10pt] mb-1">
                  {exp.position || "Position"}
                </p>
                {exp.description && (
                  <ul className="list-disc list-inside text-[9.5pt]">
                    {exp.description.split("\n").map((line, i) => (
                      <li key={i}>{line}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </section>
        )}

        {/* SKILLS */}
        {formData.skills && (
          <section className="mb-5">
            <h2 className="text-[10pt] font-bold uppercase border-t border-b border-black text-center py-1">
              Skills
            </h2>
            <p className="mt-2">{formData.skills}</p>
          </section>
        )}

        {/* LANGUAGES */}
        {formData.languages && (
          <section className="mb-5">
            <h2 className="text-[10pt] font-bold uppercase border-t border-b border-black text-center py-1">
              Languages
            </h2>
            <p className="mt-2">{formData.languages}</p>
          </section>
        )}

        {/* CERTIFICATIONS */}
        {formData.certifications && (
          <section>
            <h2 className="text-[10pt] font-bold uppercase border-t border-b border-black text-center py-1">
              Certifications
            </h2>
            <p className="mt-2">{formData.certifications}</p>
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

export default Resume1;
