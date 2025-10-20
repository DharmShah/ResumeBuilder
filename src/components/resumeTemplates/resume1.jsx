import React from "react";

const Resume1 = () => {
  return (
    <div className="w-[8.5in] mx-auto border p-[15px] bg-white text-gray-800 font-sans leading-tight print:m-0 print:p-[0.5in]">

      {/* Header */}
      <header className="text-center" name="header">
        <h1 className="text-[26pt] font-bold text-black mb-2" name="name">Nadia Smith</h1>
        <div className="flex justify-center text-[9pt] mb-5 pb-1" name="contact-info">
          <span className="mx-2 whitespace-nowrap" name="email">
            <i className="fas fa-envelope mr-1 text-gray-800" name="mail-icon"></i> nadia@smith.com
          </span>
          <span className="mx-2 whitespace-nowrap" name="phone">
            <i className="fas fa-phone mr-1 text-gray-800" name="phone-icon"></i> 555-555-5555
          </span>
          <span className="mx-2 whitespace-nowrap" name="linkedin">
            <i className="fab fa-linkedin mr-1 text-gray-800" name="linkedin-icon"></i> linkedin.com/in/youracct/
          </span>
        </div>
      </header>

      <hr className="border-t border-black my-4" name="header-divider" />

      {/* Summary */}
      <section className="mb-6" name="summary-section">
        <h2 name="summary-title" className="text-[11pt] font-bold text-black uppercase tracking-[0.5px] border-b-2 border-black text-center pb-1 mb-2">
          Summary
        </h2>
        <p name="summary-text" className="text-[10pt] text-justify">
          Results-oriented finance professional with over 10 years of experience in publicly traded and privately held enterprises. 
          Proven track record in complex and capital-intensive global industries, delivering value and innovation in Finance, 
          Strategy, and Corporate Planning.
        </p>
      </section>

      <hr className="border-t border-black my-3" name="summary-divider" />

      {/* Education */}
      <section className="mb-6" name="education-section">
        <h2 name="education-title" className="text-[11pt] font-bold text-black uppercase tracking-[0.5px] border-b-2 border-black text-center pb-1 mb-2">
          Education
        </h2>

        {/* Entry 1 */}
        <div className="mb-4" name="education-entry-1">
          <div className="flex justify-between items-end mt-2" name="education-entry-1-header">
            <h3 className="text-[10.5pt] font-bold text-black m-0 leading-tight" name="education-entry-1-school">
              HARVARD UNIVERSITY EXTENSION SCHOOL
            </h3>
            <span className="text-[10pt] whitespace-nowrap" name="education-entry-1-dates">2014 – 2016</span>
          </div>
          <p className="text-[10pt] italic mb-1" name="education-entry-1-degree">Master of Liberal Arts, Management</p>
          <ul className="list-disc list-inside text-[10pt] leading-snug" name="education-entry-1-achievements">
            <li name="education-entry-1-award-1">Recipient of Dean's List Academic Achievement Award</li>
            <li name="education-entry-1-award-2">Selected for the Venture Incubation Program at Harvard Innovation Lab</li>
            <li name="education-entry-1-award-3">Winner of Stretch Award 2016</li>
          </ul>
        </div>

        {/* Entry 2 */}
        <div className="mb-4" name="education-entry-2">
          <div className="flex justify-between items-end mt-2" name="education-entry-2-header">
            <h3 className="text-[10.5pt] font-bold text-black m-0 leading-tight" name="education-entry-2-school">
              UNIVERSIDAD NACIONAL AUTONOMA DE MEXICO
            </h3>
            <span className="text-[10pt] whitespace-nowrap" name="education-entry-2-dates">2001 – 2006</span>
          </div>
          <p className="text-[10pt] italic mb-1" name="education-entry-2-degree">Bachelor of Business Administration in Marketing</p>
          <ul className="list-disc list-inside text-[10pt] leading-snug" name="education-entry-2-achievements">
            <li name="education-entry-2-award-1">Graduated from Honors Program, Rank 1</li>
            <li name="education-entry-2-award-2">College Student of the Year 2006 – Expansion Time Warner Magazine</li>
            <li name="education-entry-2-award-3">Recipient of L'Oréal Excellence Award 2006</li>
          </ul>
        </div>
      </section>

      <hr className="border-t border-black my-3" name="education-divider" />

      {/* Work Experience */}
      <section name="work-experience-section">
        <h2 name="work-experience-title" className="text-[11pt] font-bold text-black uppercase tracking-[0.5px] border-b-2 border-black text-center pb-1 mb-2">
          Work Experience
        </h2>

        {/* Job 1 */}
        <div className="mb-4" name="job-1">
          <div className="flex justify-between items-end mt-2" name="job-1-header">
            <h3 className="text-[10.5pt] font-bold text-black" name="job-1-company">
              AGENDA28
              <span className="ml-2 text-[10.5pt] font-normal" name="job-1-role">CO-FOUNDER / DESIGN STRATEGY DIRECTOR</span>
            </h3>
            <span className="text-[10pt] whitespace-nowrap" name="job-1-dates">Sep 2012 – present</span>
          </div>
          <ul className="list-disc list-inside text-[10pt] leading-snug" name="job-1-responsibilities">
            <li name="job-1-resp-1">
              Founded design studio specialized in social impact that develops integral design strategies to increase effectiveness of social initiatives and empowers designers from underserved communities in Mexico
            </li>
            <li name="job-1-resp-2">
              Led 20 design projects for nonprofits and social enterprises in the U.S., Mexico, India, Zambia, Australia, Switzerland
            </li>
            <li name="job-1-resp-3">
              Won Most Innovative Idea at Educational Innovation and Social Entrepreneurship Conference at Harvard - May 2015
            </li>
          </ul>
        </div>

        {/* Job 2 */}
        <div className="mb-4" name="job-2">
          <div className="flex justify-between items-end mt-2" name="job-2-header">
            <h3 className="text-[10.5pt] font-bold text-black" name="job-2-company">
              ENTERPRESSE DE MEXICO
              <span className="ml-2 text-[10.5pt] font-normal" name="job-2-role">MARKETING & SALES DIRECTOR</span>
            </h3>
            <span className="text-[10pt] whitespace-nowrap" name="job-2-dates">Nov 2008 – Jan 2014</span>
          </div>
          <ul className="list-disc list-inside text-[10pt] leading-snug" name="job-2-responsibilities">
            <li name="job-2-resp-1">Led the Marketing and Sales teams achieving a company growth of 163% in 5 years</li>
            <li name="job-2-resp-2">Redesigned corporate identity and executed online marketing campaigns</li>
            <li name="job-2-resp-3">Implemented a new Sales Methodology, CRM, and Loyalty Program</li>
            <li name="job-2-resp-4">Developed new Corporate Strategic Planning methodology</li>
            <li name="job-2-resp-5">Expanded operations to 9 new countries in Latin America</li>
          </ul>
        </div>
      </section>

    </div>
  );
};

export default Resume1;
