import React from "react";

const Resume1 = () => {
  return (
    <div className="w-[8.5in] mx-auto my-[0.5in] p-[0.5in] bg-white text-gray-800 font-sans leading-tight print:m-0 print:p-[0.5in]">
      {/* Header */}
      <header className="text-center">
        <h1 className="text-[26pt] font-bold text-black mb-2">Nadia Smith</h1>
        <div className="flex justify-center text-[9pt] mb-5 pb-1">
          <span className="mx-2 whitespace-nowrap">
            <i className="fas fa-envelope mr-1 text-gray-800"></i> nadia@smith.com
          </span>
          <span className="mx-2 whitespace-nowrap">
            <i className="fas fa-phone mr-1 text-gray-800"></i> 555-555-5555
          </span>
          <span className="mx-2 whitespace-nowrap">
            <i className="fab fa-linkedin mr-1 text-gray-800"></i> linkedin.com/in/youracct/
          </span>
        </div>
      </header>

      <hr className="border-t border-black my-4" />

      {/* Summary */}
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

      {/* Education */}
      <section className="mb-6">
        <h2 className="text-[11pt] font-bold text-black uppercase tracking-[0.5px] border-b-2 border-black text-center pb-1 mb-2">
          Education
        </h2>

        {/* Entry 1 */}
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

        {/* Entry 2 */}
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

        {/* Job 1 */}
        <div className="mb-4">
          <div className="flex justify-between items-end mt-2">
            <h3 className="text-[10.5pt] font-bold text-black">
              AGENDA28
              <span className="ml-2 text-[10.5pt] font-normal">CO-FOUNDER / DESIGN STRATEGY DIRECTOR</span>
            </h3>
            <span className="text-[10pt] whitespace-nowrap">Sep 2012 – present</span>
          </div>
          <ul className="list-disc list-inside text-[10pt] leading-snug">
            <li>
              Founded design studio specialized in social impact that develops integral design strategies to increase 
              effectiveness of social initiatives and empowers designers from underserved communities in Mexico
            </li>
            <li>
              Led 20 design projects for nonprofits and social enterprises in the U.S., Mexico, India, Zambia, Australia, Switzerland
            </li>
            <li>
              Won Most Innovative Idea at Educational Innovation and Social Entrepreneurship Conference at Harvard - May 2015
            </li>
          </ul>
        </div>

        {/* Job 2 */}
        <div className="mb-4">
          <div className="flex justify-between items-end mt-2">
            <h3 className="text-[10.5pt] font-bold text-black">
              ENTERPRESSE DE MEXICO
              <span className="ml-2 text-[10.5pt] font-normal">MARKETING & SALES DIRECTOR</span>
            </h3>
            <span className="text-[10pt] whitespace-nowrap">Nov 2008 – Jan 2014</span>
          </div>
          <ul className="list-disc list-inside text-[10pt] leading-snug">
            <li>Led the Marketing and Sales teams achieving a company growth of 163% in 5 years</li>
            <li>Redesigned corporate identity and executed online marketing campaigns</li>
            <li>Implemented a new Sales Methodology, CRM, and Loyalty Program</li>
            <li>Developed new Corporate Strategic Planning methodology</li>
            <li>Expanded operations to 9 new countries in Latin America</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Resume1;
