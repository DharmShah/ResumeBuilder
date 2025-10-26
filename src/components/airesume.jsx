import React, { useState } from "react";

export default function AIResume() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    dob: "",
    education: [{ school: "", start: "", end: "" }],
    skills: [],
    experience: [{ company: "", role: "", duration: "" }],
  });

  const [newSkill, setNewSkill] = useState("");
  const suggestedSkills = ["Python", "JavaScript", "Java", "DBMS", "React", "SQL"];

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleEducationChange = (index, field, value) => {
    const updated = [...formData.education];
    updated[index][field] = value;
    setFormData({ ...formData, education: updated });
  };

  const handleExperienceChange = (index, field, value) => {
    const updated = [...formData.experience];
    updated[index][field] = value;
    setFormData({ ...formData, experience: updated });
  };

  const addSkill = (skill) => {
    if (!formData.skills.includes(skill) && skill.trim() !== "") {
      setFormData({ ...formData, skills: [...formData.skills, skill] });
      setNewSkill("");
    }
  };

  const removeSkill = (skill) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((s) => s !== skill),
    });
  };

  const generateSummary = () => {
    alert("AI-generated resume summary based on provided details!");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
          AI Resume Builder
        </h1>

        {/* STEP 1: Personal Info */}
        {step === 1 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="First Name"
                className="input"
                value={formData.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
              />
              <input
                type="text"
                placeholder="Middle Name"
                className="input"
                value={formData.middleName}
                onChange={(e) => handleChange("middleName", e.target.value)}
              />
              <input
                type="text"
                placeholder="Last Name"
                className="input"
                value={formData.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
              />
            </div>
            <input
              type="date"
              className="input mt-4 w-full"
              value={formData.dob}
              onChange={(e) => handleChange("dob", e.target.value)}
            />
            <button onClick={handleNext} className="btn-primary mt-6">
              Next
            </button>
          </div>
        )}

        {/* STEP 2: Education */}
        {step === 2 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Education</h2>
            {formData.education.map((edu, index) => (
              <div key={index} className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="School/University"
                  className="input"
                  value={edu.school}
                  onChange={(e) => handleEducationChange(index, "school", e.target.value)}
                />
                <input
                  type="date"
                  className="input"
                  value={edu.start}
                  onChange={(e) => handleEducationChange(index, "start", e.target.value)}
                />
                <input
                  type="date"
                  className="input"
                  value={edu.end}
                  onChange={(e) => handleEducationChange(index, "end", e.target.value)}
                />
              </div>
            ))}
            <div className="flex justify-between mt-6">
              <button onClick={handleBack} className="btn-secondary">
                Back
              </button>
              <button onClick={handleNext} className="btn-primary">
                Next
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Skills */}
        {step === 3 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2 mb-4">
              {suggestedSkills.map((skill) => (
                <button
                  key={skill}
                  onClick={() => addSkill(skill)}
                  className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200"
                >
                  {skill}
                </button>
              ))}
            </div>
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                placeholder="Add custom skill"
                className="input flex-grow"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
              />
              <button onClick={() => addSkill(newSkill)} className="btn-primary">
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.skills.map((skill) => (
                <span
                  key={skill}
                  className="bg-blue-600 text-white px-3 py-1 rounded-full flex items-center gap-2"
                >
                  {skill}
                  <button
                    onClick={() => removeSkill(skill)}
                    className="text-xs bg-red-500 px-2 rounded-full"
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
            <div className="flex justify-between mt-6">
              <button onClick={handleBack} className="btn-secondary">
                Back
              </button>
              <button onClick={handleNext} className="btn-primary">
                Next
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Experience */}
        {step === 4 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Experience</h2>
            {formData.experience.map((exp, index) => (
              <div key={index} className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Company"
                  className="input"
                  value={exp.company}
                  onChange={(e) => handleExperienceChange(index, "company", e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Role"
                  className="input"
                  value={exp.role}
                  onChange={(e) => handleExperienceChange(index, "role", e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Duration"
                  className="input"
                  value={exp.duration}
                  onChange={(e) => handleExperienceChange(index, "duration", e.target.value)}
                />
              </div>
            ))}
            <div className="flex justify-between mt-6">
              <button onClick={handleBack} className="btn-secondary">
                Back
              </button>
              <button onClick={handleNext} className="btn-primary">
                Skip
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: Summary */}
        {step === 5 && (
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-4">Generate Resume Summary</h2>
            <button onClick={generateSummary} className="btn-primary">
              Generate with AI
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
