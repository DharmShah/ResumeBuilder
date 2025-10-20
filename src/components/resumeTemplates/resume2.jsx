import React from "react";

const Resume2 = () => {
  return (
    <div className="w-[8.5in] mx-auto  border p-[15px] bg-white text-gray-800 font-sans text-[10pt] leading-snug">
      
      {/* Header */}
      <header className="mb-5">
        <h1 className="text-[24pt] font-bold mb-1">Andrew Kim</h1>
        <div className="flex flex-wrap gap-4 text-[10pt] text-gray-600">
          <span>andrew.kim@gmail.com</span>
          <span>• +1 415 555 2671</span>
          <span>• New York City, USA</span>
        </div>
      </header>

      {/* Profile */}
      <section className="mb-4">
        <h2 className="text-[12pt] font-bold text-black text-center bg-gray-100 border-y border-gray-300 py-1 mt-5 mb-2">
          Profile
        </h2>
        <p className="text-[10pt] my-2">
          Experienced finance professional with a successful track record in M&A, valuation and financial modelling. 
          Accomplished finance professional with a proven success record in mergers and acquisitions, valuation, 
          and financial modeling. Dynamic finance professional with a proven track record in mergers and acquisitions, valuation.
        </p>
      </section>

      {/* Work Experience */}
      <section className="mb-4">
        <h2 className="text-[12pt] font-bold text-black text-center bg-gray-100 border-y border-gray-300 py-1 mt-5 mb-2">
          Work Experience
        </h2>

        {/* Job 1 */}
        <div className="flex mb-4 leading-snug">
          <div className="w-1/4 pr-4 text-[9.5pt] text-gray-700 flex-shrink-0">
            2015 Oct – 2017 Jul<br />
            NYC, USA
          </div>
          <div className="w-3/4">
            <p className="font-bold text-[10pt] m-0">Financial Analyst</p>
            <span className="block mb-1 text-[10pt] font-normal">UBS</span>
            <ul className="list-disc list-inside text-[9.5pt] leading-snug">
              <li>Prepared presentations for earnings call & investor relations website</li>
              <li>Performed company valuations in Excel</li>
              <li>Led due diligence for $5 million acquisition, minimizing liabilities and risks</li>
              <li>Built financial models in Excel</li>
            </ul>
          </div>
        </div>

        {/* Job 2 */}
        <div className="flex mb-4 leading-snug">
          <div className="w-1/4 pr-4 text-[9.5pt] text-gray-700 flex-shrink-0">
            2017 Aug<br />
            London, UK
          </div>
          <div className="w-3/4">
            <p className="font-bold text-[10pt] m-0">Senior Financial Analyst</p>
            <span className="block mb-1 text-[10pt] font-normal">JP Morgan</span>
            <ul className="list-disc list-inside text-[9.5pt] leading-snug">
              <li>Analysed financial statements to determine business opportunities</li>
              <li>
                Established forecasting and reporting system, improving financial data accuracy by 15%
              </li>
              <li>
                Led due diligence for $5.2B joint venture, identifying risk factors and forecasting investment viability
              </li>
              <li>Streamlined reporting to maximize efficiency and ensure compliance</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="mb-4">
        <h2 className="text-[12pt] font-bold text-black text-center bg-gray-100 border-y border-gray-300 py-1 mt-5 mb-2">
          Education
        </h2>

        {/* School 1 */}
        <div className="flex mb-4 leading-snug">
          <div className="w-1/4 pr-4 text-[9.5pt] text-gray-700 flex-shrink-0">
            2013 Sep – 2014 Aug<br />
            Harvard, USA
          </div>
          <div className="w-3/4">
            <p className="font-bold text-[10pt] m-0">MSc Finance</p>
            <span className="block mb-1 text-[10pt] font-normal">Harvard Business School</span>
            <ul className="list-disc list-inside text-[9.5pt]">
              <li>Graduated with distinction</li>
            </ul>
          </div>
        </div>

        {/* School 2 */}
        <div className="flex mb-4 leading-snug">
          <div className="w-1/4 pr-4 text-[9.5pt] text-gray-700 flex-shrink-0">
            2010 Sep – 2013 Aug<br />
            London, UK
          </div>
          <div className="w-3/4">
            <p className="font-bold text-[10pt] m-0">BA Economics</p>
            <span className="block mb-1 text-[10pt] font-normal">
              London School of Economics and Political Science
            </span>
            <ul className="list-disc list-inside text-[9.5pt]">
              <li>Thesis (grade: 87/100): Predicting housing prices with big data</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="mb-4">
        <h2 className="text-[12pt] font-bold text-black text-center bg-gray-100 border-y border-gray-300 py-1 mt-5 mb-2">
          Skills
        </h2>

        <div className="flex flex-wrap gap-x-6 gap-y-3 text-[10pt]">
          <div className="w-[48%]">
            <h5 className="font-bold text-[10pt] mb-0.5">Financial Modelling</h5>
            <p className="text-[9.5pt] m-0">Built several large models in Excel</p>
          </div>
          <div className="w-[48%]">
            <h5 className="font-bold text-[10pt] mb-0.5">Investment Analysis</h5>
            <p className="text-[9.5pt] m-0">Prepared and presented investment reports</p>
          </div>
          <div className="w-[48%]">
            <h5 className="font-bold text-[10pt] mb-0.5">Budgeting and Forecasting</h5>
            <p className="text-[9.5pt] m-0">Gathered and analysed data on housing prices</p>
          </div>
          <div className="w-[48%]">
            <h5 className="font-bold text-[10pt] mb-0.5">QlikView, Bloomberg, SAS</h5>
            <p className="text-[9.5pt] m-0">Worked daily with these tools</p>
          </div>
          <div className="w-[48%]">
            <h5 className="font-bold text-[10pt] mb-0.5">Risk Assessment</h5>
            <p className="text-[9.5pt] m-0">Performed risk analysis on several large projects</p>
          </div>
          <div className="w-[48%]">
            <h5 className="font-bold text-[10pt] mb-0.5">Business Valuation</h5>
            <p className="text-[9.5pt] m-0">DCF and use of price multiples</p>
          </div>
        </div>
      </section>

      {/* Certificates */}
      <section>
        <h2 className="text-[12pt] font-bold text-black text-center bg-gray-100 border-y border-gray-300 py-1 mt-5 mb-2">
          Certificates
        </h2>

        <div className="flex justify-between text-[10pt] mt-2">
          <div>
            <h5 className="font-bold mb-0.5">CFA</h5>
            <p className="m-0">Level 1 & 2</p>
          </div>
          <div>
            <h5 className="font-bold mb-0.5">CPA</h5>
            <p className="m-0">Level 1</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Resume2;
