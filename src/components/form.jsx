import React, { useState } from "react";

export default function Form() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    linkedin: "",
    portfolio: "",
    summary: "",
    education: [{ school: "", degree: "", field: "", startYear: "", endYear: "" }],
    experience: [{ company: "", position: "", startDate: "", endDate: "", description: "" }],
    skills: "",
    languages: "",
    certifications: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleArrayChange = (index, e, section) => {
    const updated = [...formData[section]];
    updated[index][e.target.name] = e.target.value;
    setFormData({ ...formData, [section]: updated });
  };

  const addSection = (section) => {
    const blankItem =
      section === "education"
        ? { school: "", degree: "", field: "", startYear: "", endYear: "" }
        : { company: "", position: "", startDate: "", endDate: "", description: "" };
    setFormData({ ...formData, [section]: [...formData[section], blankItem] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Resume Data:", formData);
    alert("Resume saved successfully! (Check console for data)");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 py-12 px-6 flex justify-center items-center">
      <div className="max-w-4xl w-full bg-white/20 backdrop-blur-md shadow-xl rounded-2xl p-10 text-white">
        <h2 className="text-4xl font-extrabold mb-10 text-center text-white drop-shadow-md">
          ✨ Create Your Resume
        </h2>

        <form onSubmit={handleSubmit} className="space-y-10">
          {/* PERSONAL INFO */}
          <section>
            <h3 className="text-2xl font-semibold mb-4 text-yellow-200 border-b border-yellow-300 pb-2">
              Personal Information
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {["fullName", "email", "phone", "address", "linkedin", "portfolio"].map((field) => (
                <input
                  key={field}
                  type="text"
                  name={field}
                  placeholder={field.replace(/([A-Z])/g, " $1").toUpperCase()}
                  value={formData[field]}
                  onChange={handleChange}
                  className="p-3 rounded-md bg-white/30 border border-white/40 placeholder-white/70 focus:ring-2 focus:ring-yellow-300 outline-none"
                />
              ))}
            </div>
          </section>

          {/* SUMMARY */}
          <section>
            <h3 className="text-2xl font-semibold mb-4 text-yellow-200 border-b border-yellow-300 pb-2">
              Professional Summary
            </h3>
            <textarea
              name="summary"
              placeholder="Write a short summary about yourself..."
              value={formData.summary}
              onChange={handleChange}
              className="w-full p-3 rounded-md bg-white/30 border border-white/40 placeholder-white/70 focus:ring-2 focus:ring-yellow-300 outline-none"
              rows="4"
            ></textarea>
          </section>

          {/* EDUCATION */}
          <section>
            <h3 className="text-2xl font-semibold mb-4 text-yellow-200 border-b border-yellow-300 pb-2">
              Education
            </h3>
            {formData.education.map((edu, index) => (
              <div key={index} className="grid grid-cols-2 gap-4 mb-4">
                <input type="text" name="school" placeholder="School/University" value={edu.school} onChange={(e) => handleArrayChange(index, e, "education")} className="p-3 rounded-md bg-white/30 border border-white/40 focus:ring-2 focus:ring-blue-300 outline-none" />
                <input type="text" name="degree" placeholder="Degree" value={edu.degree} onChange={(e) => handleArrayChange(index, e, "education")} className="p-3 rounded-md bg-white/30 border border-white/40 focus:ring-2 focus:ring-blue-300 outline-none" />
                <input type="text" name="field" placeholder="Field of Study" value={edu.field} onChange={(e) => handleArrayChange(index, e, "education")} className="p-3 rounded-md bg-white/30 border border-white/40 focus:ring-2 focus:ring-blue-300 outline-none" />
                <div className="flex gap-2">
                  <input type="text" name="startYear" placeholder="Start Year" value={edu.startYear} onChange={(e) => handleArrayChange(index, e, "education")} className="p-3 w-1/2 rounded-md bg-white/30 border border-white/40 focus:ring-2 focus:ring-blue-300 outline-none" />
                  <input type="text" name="endYear" placeholder="End Year" value={edu.endYear} onChange={(e) => handleArrayChange(index, e, "education")} className="p-3 w-1/2 rounded-md bg-white/30 border border-white/40 focus:ring-2 focus:ring-blue-300 outline-none" />
                </div>
              </div>
            ))}
            <button type="button" onClick={() => addSection("education")} className="bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded-md text-white font-semibold">
              + Add Education
            </button>
          </section>

          {/* EXPERIENCE */}
          <section>
            <h3 className="text-2xl font-semibold mb-4 text-yellow-200 border-b border-yellow-300 pb-2">
              Experience
            </h3>
            {formData.experience.map((exp, index) => (
              <div key={index} className="grid grid-cols-2 gap-4 mb-4">
                <input type="text" name="company" placeholder="Company" value={exp.company} onChange={(e) => handleArrayChange(index, e, "experience")} className="p-3 rounded-md bg-white/30 border border-white/40 focus:ring-2 focus:ring-green-300 outline-none" />
                <input type="text" name="position" placeholder="Position" value={exp.position} onChange={(e) => handleArrayChange(index, e, "experience")} className="p-3 rounded-md bg-white/30 border border-white/40 focus:ring-2 focus:ring-green-300 outline-none" />
                <input type="text" name="startDate" placeholder="Start Date" value={exp.startDate} onChange={(e) => handleArrayChange(index, e, "experience")} className="p-3 rounded-md bg-white/30 border border-white/40 focus:ring-2 focus:ring-green-300 outline-none" />
                <input type="text" name="endDate" placeholder="End Date" value={exp.endDate} onChange={(e) => handleArrayChange(index, e, "experience")} className="p-3 rounded-md bg-white/30 border border-white/40 focus:ring-2 focus:ring-green-300 outline-none" />
                <textarea name="description" placeholder="Describe your role or achievements" value={exp.description} onChange={(e) => handleArrayChange(index, e, "experience")} className="col-span-2 p-3 rounded-md bg-white/30 border border-white/40 focus:ring-2 focus:ring-green-300 outline-none" rows="3"></textarea>
              </div>
            ))}
            <button type="button" onClick={() => addSection("experience")} className="bg-green-600 hover:bg-green-700 transition px-4 py-2 rounded-md text-white font-semibold">
              + Add Experience
            </button>
          </section>

          {/* SKILLS / LANGUAGES / CERTIFICATIONS */}
          {[
            { label: "Skills", name: "skills", color: "purple" },
            { label: "Languages", name: "languages", color: "pink" },
            { label: "Certifications", name: "certifications", color: "rose" },
          ].map((section) => (
            <section key={section.name}>
              <h3
                className={`text-2xl font-semibold mb-4 text-${section.color}-200 border-b border-${section.color}-300 pb-2`}
              >
                {section.label}
              </h3>
              <textarea
                name={section.name}
                placeholder={`List your ${section.label.toLowerCase()} here...`}
                value={formData[section.name]}
                onChange={handleChange}
                className="w-full p-3 rounded-md bg-white/30 border border-white/40 placeholder-white/70 focus:ring-2 focus:ring-yellow-300 outline-none"
                rows="3"
              ></textarea>
            </section>
          ))}

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-8 py-3 rounded-lg text-lg font-bold shadow-md transition transform hover:scale-105"
            >
              View Resume 
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
