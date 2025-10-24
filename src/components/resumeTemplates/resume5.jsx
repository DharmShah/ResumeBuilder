import React from "react";

const resume5 = () => {
  return (
    <div className="flex max-w-[1200px] mx-auto min-h-screen text-[#333] font-[Georgia] leading-relaxed">
      {/* Left Column */}
      <div className="bg-[#3d4f45] text-[#f5f5f0] w-[370px] p-[60px_40px]">
        <h1 className="text-[2.5em] font-normal mb-2 text-[#f5f5f0]">
          Brian T. Wayne
        </h1>
        <p className="text-[1.3em] italic mb-10 text-[#f5f5f0] leading-snug">
          Business Development
          <br />
          Consultant
        </p>

        {/* Contact Info */}
        <div className="mb-12">
          <p className="flex items-center mb-3 text-[0.95em]">
            <span className="mr-3 text-[1.1em]">✉</span> brian@wayne.com
          </p>
          <p className="flex items-center mb-3 text-[0.95em]">
            <span className="mr-3 text-[1.1em]">📞</span> +1-541-754-3010
          </p>
          <p className="flex items-start mb-3 text-[0.95em]">
            <span className="mr-3 text-[1.1em]">📍</span>
            <span>
              22611 Pacific Coast Hwy.
              <br />
              Malibu, California, 9022, USA
            </span>
          </p>
          <p className="flex items-center mb-3 text-[0.95em]">
            <span className="mr-3 text-[1.1em]">in</span>{" "}
            linkedin.com/wayne-2345
          </p>
          <p className="flex items-center mb-3 text-[0.95em]">
            <span className="mr-3 text-[1.1em]">🌐</span> wayne.com
          </p>
        </div>

        {/* Profile */}
        <h2 className="text-[1.4em] font-bold mb-5 pb-2 border-b-2 border-[#f5f5f0]">
          Profile
        </h2>
        <p className="text-justify text-[0.95em] leading-[1.7] mb-12">
          I'm Brian Thomas Wayne, a business development consultant with a
          passion for helping companies achieve their growth potential. With my
          MBA degree and extensive experience in strategy and relationship
          building, I strive to provide innovative solutions that drive success
          for my clients.
        </p>

        {/* Education */}
        <h2 className="text-[1.4em] font-bold mb-5 pb-2 border-b-2 border-[#f5f5f0]">
          Education
        </h2>

        <div className="mb-9">
          <p className="font-bold text-[1.05em] mb-1">
            Master of Business Administration,
          </p>
          <p className="italic mb-1">Harvard Business School</p>
          <p className="text-[0.9em] opacity-90">2016 – 2018 | Boston</p>
        </div>

        <div className="mb-9">
          <p className="font-bold text-[1.05em] mb-1">
            Master of Business Administration,
          </p>
          <p className="italic mb-1">Harvard Business School</p>
          <p className="text-[0.9em] opacity-90">2015 – 2018 | Boston</p>
        </div>

        {/* Languages */}
        <div className="mt-12">
          <h2 className="text-[1.4em] font-bold mb-5 pb-2 border-b-2 border-[#f5f5f0]">
            Languages
          </h2>
          <ul className="list-none pl-0">
            <li className="mb-2 pl-5 relative before:content-['•'] before:absolute before:left-0">
              English
            </li>
            <li className="mb-2 pl-5 relative before:content-['•'] before:absolute before:left-0">
              Spanish
            </li>
          </ul>
        </div>
      </div>

      {/* Right Column */}
      <div className="bg-[#f5f5f0] flex-1 p-[60px_50px]">
        {/* Professional Experience */}
        <section className="mb-10">
          <h2 className="text-[1.4em] font-bold mb-5 pb-2 border-b-2 border-[#2d2d2d] text-[#2d2d2d]">
            Professional Experience
          </h2>

          <div className="mb-9">
            <p className="font-bold text-[1.05em] mb-1">
              Business Development Consultant,{" "}
              <span className="italic">Appleseed Inc.</span>
            </p>
            <p className="text-[0.9em] text-[#555] mb-3">
              2022 – present | New York
            </p>
            <ul className="list-none pl-0 mb-9">
              <li className="mb-2 pl-5 relative before:content-['•'] before:absolute before:left-0 text-justify">
                Developed and implemented strategic plans resulting in a 30%
                increase in new business opportunities.
              </li>
              <li className="mb-2 pl-5 relative before:content-['•'] before:absolute before:left-0 text-justify">
                Collaborated with cross-functional teams to drive business
                growth and expansion.
              </li>
              <li className="mb-2 pl-5 relative before:content-['•'] before:absolute before:left-0 text-justify">
                Established and maintained relationships with key partners
                resulting in a 25% increase in sales revenue.
              </li>
              <li className="mb-2 pl-5 relative before:content-['•'] before:absolute before:left-0 text-justify">
                Conducted market research and analysis to identify new market
                opportunities resulting in the successful launch of a new
                product line.
              </li>
            </ul>
          </div>

          <div className="mb-9">
            <p className="font-bold text-[1.05em] mb-1">
              Business Development, <span className="italic">Aexus</span>
            </p>
            <p className="text-[0.9em] text-[#555] mb-3">
              2018 – 2022 | Los Angeles, USA
            </p>
            <ul className="list-none pl-0 mb-9">
              <li className="mb-2 pl-5 relative before:content-['•'] before:absolute before:left-0 text-justify">
                Worked closely with tech and software companies to provide
                expert sales outsourcing services.
              </li>
              <li className="mb-2 pl-5 relative before:content-['•'] before:absolute before:left-0 text-justify">
                Built and managed dedicated sales teams in Europe, the Americas,
                and Asia Pacific.
              </li>
              <li className="mb-2 pl-5 relative before:content-['•'] before:absolute before:left-0 text-justify">
                Contributed to Aexus Sales Outsourcing's proven track record of
                success in acting as an extension to the sales force of over
                500+ vendors of new and innovative software and tech products,
                services, and solutions since the year 2000.
              </li>
            </ul>
          </div>
        </section>

        {/* Skills */}
        <section className="mb-10">
          <h2 className="text-[1.4em] font-bold mb-5 pb-2 border-b-2 border-[#2d2d2d] text-[#2d2d2d]">
            Skills
          </h2>
          <ul className="list-none pl-0">
            <li className="mb-3 pl-5 relative before:content-['•'] before:absolute before:left-0">
              Strategic thinking and problem-solving
            </li>
            <li className="mb-3 pl-5 relative before:content-['•'] before:absolute before:left-0">
              Relationship building and networking
            </li>
            <li className="mb-3 pl-5 relative before:content-['•'] before:absolute before:left-0">
              Creative and innovative thinking.
            </li>
          </ul>
        </section>

        {/* Awards */}
        <section className="mb-10">
          <h2 className="text-[1.4em] font-bold mb-5 pb-2 border-b-2 border-[#2d2d2d] text-[#2d2d2d]">
            Awards
          </h2>
          <div className="mb-4">
            <p>
              <span className="font-bold">Outstanding Business Student Award,</span>
              <br />
              <span className="italic">
                University of Southern California, 2014
              </span>
            </p>
          </div>
          <div>
            <p>
              <span className="font-bold">Dean's List,</span>{" "}
              <span className="italic">
                University of California, Los Angeles, 2015–2016
              </span>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default resume5;
