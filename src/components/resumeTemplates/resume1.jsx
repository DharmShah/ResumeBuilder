import React, { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const Resume1 = () => {
  const resumeRef = useRef(); // ✅ Reference to capture resume

  const handleDownload = () => {
    const input = resumeRef.current;
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "pt", "a4"); // portrait, points, A4
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("Resume_Nadia_Smith.pdf");
    });
  };

  return (
    <div className="p-4">     
      {/* Resume Content */}
      <div
        ref={resumeRef} // ✅ Attach ref here for PDF capture
        className="w-[8.5in] mx-auto border p-[15px] bg-white text-gray-800 font-sans leading-tight print:m-0 print:p-[0.5in]"
      >
        {/* Header */}
        <header className="text-center" name="header">
          <h1 className="text-[26pt] font-bold text-black mb-2" name="name">
            Nadia Smith
          </h1>
          <div className="flex justify-center text-[9pt] mb-5 pb-1" name="contact-info">
            <span className="mx-2 whitespace-nowrap" name="email">
              <i className="fas fa-envelope mr-1 text-gray-800"></i> nadia@smith.com
            </span>
            <span className="mx-2 whitespace-nowrap" name="phone">
              <i className="fas fa-phone mr-1 text-gray-800"></i> 555-555-5555
            </span>
            <span className="mx-2 whitespace-nowrap" name="linkedin">
              <i className="fab fa-linkedin mr-1 text-gray-800"></i> linkedin.com/in/youracct/
            </span>
          </div>
        </header>

        <hr className="border-t border-black my-4" />

        {/* Summary Section */}
        <section className="mb-6">
          <h2 className="text-[11pt] font-bold text-black uppercase tracking-[0.5px] border-b-2 border-black text-center pb-1 mb-2">
            Summary
          </h2>
          <p className="text-[10pt] text-justify">
            Results-oriented finance professional with over 10 years of experience in publicly traded and privately held enterprises. 
            Proven track record in complex and capital-intensive global industries, delivering value and innovation in Finance, 
            Strategy, and Corporate Planning.
          </p>
        </section>

        <hr className="border-t border-black my-3" />

        {/* Education Section */}
        <section className="mb-6">
          <h2 className="text-[11pt] font-bold text-black uppercase tracking-[0.5px] border-b-2 border-black text-center pb-1 mb-2">
            Education
          </h2>

          {/* Harvard */}
          <div className="mb-4">
            <div className="flex justify-between items-end mt-2">
              <h3 className="text-[10.5pt] font-bold text-black m-0 leading-tight">
                HARVARD UNIVERSITY EXTENSION SCHOOL
              </h3>
              <span className="text-[10pt] whitespace-nowrap">2014 – 2016</span>
            </div>
            <p className="text-[10pt] italic mb-1">Master of Liberal Arts, Management</p>
            <ul className="list-disc list-inside text-[10pt] leading-snug">
              <li>Recipient of Dean's List Academic Achievement Award</li>
              <li>Selected for the Venture Incubation Program at Harvard Innovation Lab</li>
              <li>Winner of Stretch Award 2016</li>
            </ul>
          </div>

          {/* UNAM */}
          <div className="mb-4">
            <div className="flex justify-between items-end mt-2">
              <h3 className="text-[10.5pt] font-bold text-black m-0 leading-tight">
                UNIVERSIDAD NACIONAL AUTONOMA DE MEXICO
              </h3>
              <span className="text-[10pt] whitespace-nowrap">2001 – 2006</span>
            </div>
            <p className="text-[10pt] italic mb-1">Bachelor of Business Administration in Marketing</p>
            <ul className="list-disc list-inside text-[10pt] leading-snug">
              <li>Graduated from Honors Program, Rank 1</li>
              <li>College Student of the Year 2006 – Expansion Time Warner Magazine</li>
              <li>Recipient of L'Oréal Excellence Award 2006</li>
            </ul>
          </div>
        </section>

        <hr className="border-t border-black my-3" />

        {/* Work Experience */}
        <section>
          <h2 className="text-[11pt] font-bold text-black uppercase tracking-[0.5px] border-b-2 border-black text-center pb-1 mb-2">
            Work Experience
          </h2>

          {/* Agenda28 */}
          <div className="mb-4">
            <div className="flex justify-between items-end mt-2">
              <h3 className="text-[10.5pt] font-bold text-black">
                AGENDA28 <span className="ml-2 text-[10.5pt] font-normal">CO-FOUNDER / DESIGN STRATEGY DIRECTOR</span>
              </h3>
              <span className="text-[10pt] whitespace-nowrap">Sep 2012 – present</span>
            </div>
            <ul className="list-disc list-inside text-[10pt] leading-snug">
              <li>Founded design studio specialized in social impact.</li>
              <li>Led 20 design projects for nonprofits and social enterprises worldwide.</li>
              <li>Won Most Innovative Idea at Harvard Conference, May 2015.</li>
            </ul>
          </div>

          {/* Entreprise de Mexico */}
          <div className="mb-4">
            <div className="flex justify-between items-end mt-2">
              <h3 className="text-[10.5pt] font-bold text-black">
                ENTERPRESSE DE MEXICO <span className="ml-2 text-[10.5pt] font-normal">MARKETING & SALES DIRECTOR</span>
              </h3>
              <span className="text-[10pt] whitespace-nowrap">Nov 2008 – Jan 2014</span>
            </div>
            <ul className="list-disc list-inside text-[10pt] leading-snug">
              <li>Led the Marketing and Sales teams achieving 163% growth in 5 years.</li>
              <li>Redesigned corporate identity and executed online campaigns.</li>
              <li>Implemented new Sales Methodology, CRM, and Loyalty Program.</li>
              <li>Developed Corporate Strategic Planning methodology.</li>
              <li>Expanded operations to 9 new countries in Latin America.</li>
            </ul>
          </div>
        </section>
      </div>
       {/* Download Button */}
      <div className="flex justify-center mt-[20px]">
        <button
          onClick={handleDownload}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Download Resume
        </button>
      </div>
    </div>
  );
};

export default Resume1;
