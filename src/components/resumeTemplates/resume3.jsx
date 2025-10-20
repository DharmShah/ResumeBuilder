import React from "react";

const Resume3 = () => {
  return (
    <div className="w-[8.5in] min-h-[11in] mx-auto  border p-[15px] p-5 bg-white text-[10pt] text-[#333] font-sans leading-relaxed">
      {/* Header Section */}
      <header className="flex items-start mb-6">
        <img
          className="w-[100px] h-[100px] border-2 border-[#5f9ea0] rounded-md mr-6 shadow-sm object-contain"
          src="https://assets.scandit.com/400x500/34188e9ca7/symbology-qr-code.svg"
          alt="QR Code Logo"
        />

        <div className="flex-grow">
          <div className="flex items-baseline mb-1">
            <h1 className="text-[20pt] font-bold leading-tight">Anna Field</h1>
            <span className="ml-3 text-[11pt] italic text-[#555]">
              Junior Project Manager
            </span>
          </div>

          <div className="text-[9.5pt] text-[#555] space-y-1 mt-1">
            <div className="flex">
              <span className="w-1/2 whitespace-nowrap">
                <i className="fas fa-map-marker-alt text-[#5f9ea0] mr-1.5" />
                123 Main Street, Paris, France
              </span>
              <span className="w-1/2 whitespace-nowrap">
                <i className="fas fa-envelope text-[#5f9ea0] mr-1.5" />
                anna@field.com
              </span>
            </div>
            <div className="flex">
              <span className="w-1/2 whitespace-nowrap">
                <i className="fab fa-linkedin text-[#5f9ea0] mr-1.5" />
                linkedin.com/in/annafield
              </span>
              <span className="w-1/2 whitespace-nowrap">
                <i className="fab fa-youtube text-[#5f9ea0] mr-1.5" />
                youtube.com/anna
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Profile Section */}
      <section>
        <h3 className="text-[14pt] font-bold border-b-2 border-[#5f9ea0] inline-block mb-2">
          Profile
        </h3>
        <p className="mt-2 text-justify">
          Passionate and driven Junior Project Manager with a track record of
          delivering successful projects on time and within budget. Strong
          ability to lead cross-functional teams, effectively communicate with
          stakeholders, and adapt to dynamic environments. Committed to
          achieving outstanding results while maintaining a positive and
          collaborative work atmosphere.
        </p>
      </section>

      {/* Professional Experience */}
      <section>
        <h3 className="text-[14pt] font-bold border-b-2 border-[#5f9ea0] inline-block mt-8 mb-2">
          Professional Experience
        </h3>

        {/* Entry 1 */}
        <div className="mb-5">
          <div className="flex justify-between items-baseline mt-1 mb-0.5">
            <strong className="text-[10.5pt] font-bold">
              Junior Project Manager
            </strong>
            <span className="text-[9.5pt] text-[#555] whitespace-nowrap">
              August 2021 – Present | Paris, France
            </span>
          </div>
          <div className="text-[#555]">
            <em className="not-italic block">ABC Corporation</em>
            <ul className="list-disc ml-5 mt-1 space-y-1 text-[9.5pt]">
              <li>
                Successfully managed multiple projects simultaneously,
                coordinating cross-functional teams.
              </li>
              <li>
                Led a team of 10 members, delegating tasks and providing
                guidance resulting in a 30% reduction in project errors and
                improved team collaboration.
              </li>
              <li>
                Effectively utilized project management tools such as Jira and
                Asana to track progress and report metrics to senior management.
              </li>
            </ul>
          </div>
        </div>

        {/* Entry 2 */}
        <div className="mb-5">
          <div className="flex justify-between items-baseline mt-1 mb-0.5">
            <strong className="text-[10.5pt] font-bold">
              Assistant Project Manager
            </strong>
            <span className="text-[9.5pt] text-[#555] whitespace-nowrap">
              March 2019 – June 2021 | Paris, France
            </span>
          </div>
          <div className="text-[#555]">
            <em className="not-italic block">XYZ Solutions</em>
            <ul className="list-disc ml-5 mt-1 space-y-1 text-[9.5pt]">
              <li>
                Assisted in managing high-profile projects, contributing to a
                15% increase in overall project efficiency.
              </li>
              <li>
                Monitored project budgets and timelines, ensuring all
                deliverables met client specifications.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Education */}
      <section>
        <h3 className="text-[14pt] font-bold border-b-2 border-[#5f9ea0] inline-block mt-8 mb-2">
          Education
        </h3>

        <div className="mb-5">
          <div className="flex justify-between items-baseline mt-1 mb-0.5">
            <strong className="text-[10.5pt] font-bold">
              Bachelor of Science in Business Administration
            </strong>
            <span className="text-[9.5pt] text-[#555] whitespace-nowrap">
              September 2018 – 2022
            </span>
          </div>
          <div className="text-[#555]">
            <em className="not-italic block">Paris University</em>
          </div>
        </div>
      </section>

      {/* Skills, Languages & Strengths */}
      <section className="flex mt-8">
        {/* Skills Column */}
        <div className="w-3/5 pr-8">
          <h3 className="text-[14pt] font-bold border-b-2 border-[#5f9ea0] inline-block mb-2">
            Skills
          </h3>
          <p className="text-justify text-[10pt] leading-relaxed">
            <strong>Project Management Tools:</strong> Jira, Asana, Microsoft
            Project, Trello.{" "}
            <strong>Methodologies:</strong> Agile/Scrum, Waterfall.{" "}
            <strong>Leadership Skills:</strong> Exceptional leadership skills
            demonstrated through successful cross-functional team management,
            resulting in a 20% reduction in project delivery time. 💪 Excellent
            communication and interpersonal skills, fostering strong
            relationships with stakeholders and ensuring seamless project
            execution. 📈{" "}
            <strong>Proven track record</strong> in managing projects from
            inception to completion, resulting in a 15% increase in overall
            project efficiency.
          </p>
        </div>

        {/* Languages and Strengths */}
        <div className="w-2/5">
          <h3 className="text-[14pt] font-bold border-b-2 border-[#5f9ea0] inline-block mb-2">
            Languages
          </h3>
          <ul className="list-none mt-1 text-[10pt]">
            <li className="mb-1">
              <strong className="inline-block w-[70px]">French</strong> —{" "}
              Native/Bilingual
            </li>
            <li className="mb-1">
              <strong className="inline-block w-[70px]">English</strong> —{" "}
              Fluent
            </li>
            <li className="mb-1">
              <strong className="inline-block w-[70px]">Spanish</strong> —{" "}
              Fluent
            </li>
          </ul>

          <h3 className="text-[14pt] font-bold border-b-2 border-[#5f9ea0] inline-block mt-6 mb-2">
            Strengths
          </h3>
          <ul className="list-none mt-1 text-[10pt]">
            <li className="mb-1 before:content-['—'] before:mr-1 before:text-[#5f9ea0]">
              Strategic problem solver
            </li>
            <li className="mb-1 before:content-['—'] before:mr-1 before:text-[#5f9ea0]">
              Exceptional leadership and cross-functional team management
            </li>
            <li className="mb-1 before:content-['—'] before:mr-1 before:text-[#5f9ea0]">
              Adaptable and resilient
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Resume3;
