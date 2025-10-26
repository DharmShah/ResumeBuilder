import React, { useState, useEffect } from "react";
import { Trash2, Plus, Download, Upload, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export default function ResumeBuilder() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    dob: "",
    linkedin: "",
    github: "",
    portfolio: "",
    profileImage: null,
    profileImagePreview: null,
    summary: "",
    education: [{ school: "", degree: "", field: "", startYear: "", endYear: "" }],
    experience: [{ company: "", position: "", startDate: "", endDate: "", description: "" }],
    skills: "",
    languages: "",
    certifications: "",
  });

  const [errors, setErrors] = useState({});

  // ✅ Prefill when editing
  useEffect(() => {
    const saved =
      location.state?.formData ||
      JSON.parse(localStorage.getItem("resumeData") || "{}");
    if (saved && Object.keys(saved).length > 0) {
      setFormData((prev) => ({
        ...prev,
        ...saved,
        education: saved.education?.length ? saved.education : prev.education,
        experience: saved.experience?.length ? saved.experience : prev.experience,
      }));
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const handleArrayChange = (index, e, section) => {
    const updated = [...formData[section]];
    updated[index][e.target.name] = e.target.value;
    setFormData({ ...formData, [section]: updated });
  };

  const addSection = (section) => {
    const blank =
      section === "education"
        ? { school: "", degree: "", field: "", startYear: "", endYear: "" }
        : { company: "", position: "", startDate: "", endDate: "", description: "" };
    setFormData({ ...formData, [section]: [...formData[section], blank] });
  };

  const removeItem = (index, section) => {
    if (formData[section].length > 1) {
      const updated = formData[section].filter((_, i) => i !== index);
      setFormData({ ...formData, [section]: updated });
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () =>
        setFormData({
          ...formData,
          profileImage: file,
          profileImagePreview: reader.result,
        });
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () =>
    setFormData({ ...formData, profileImage: null, profileImagePreview: null });

  const validateForm = () => {
    const newErrors = {};
    const required = [
      "fullName",
      "email",
      "phone",
      "address",
      "dob",
      "linkedin",
      "github",
      "summary",
      "skills",
      "languages",
    ];
    required.forEach((field) => {
      if (!formData[field].trim()) newErrors[field] = "Required";
    });
    formData.education.forEach((edu, i) =>
      ["school", "degree", "field", "startYear", "endYear"].forEach((f) => {
        if (!edu[f].trim()) newErrors[`edu-${i}-${f}`] = "Required";
      })
    );
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      localStorage.setItem("resumeData", JSON.stringify(formData));
      if (id) navigate(`/resume${id}`, { state: { formData } });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 to-slate-950 py-10 px-4 text-white">
      <div className="max-w-5xl mx-auto space-y-10">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-2">Resume Builder</h1>
          <p className="text-slate-400">Create a professional resume in minutes</p>
        </div>

        {/* PERSONAL INFO */}
        <section className="bg-slate-900/40 backdrop-blur rounded-2xl border border-white/10 p-8">
          <h2 className="text-xl font-semibold mb-6 border-b border-slate-700 pb-2">
            Personal Information
          </h2>

          {formData.profileImagePreview ? (
            <div className="flex items-center gap-4 mb-4">
              <img
                src={formData.profileImagePreview}
                alt="Profile"
                className="w-20 h-20 object-cover rounded-md"
              />
              <button
                onClick={removeImage}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-3 py-2 rounded text-sm"
              >
                <X size={14} /> Remove
              </button>
            </div>
          ) : (
            <label className="flex items-center gap-3 cursor-pointer bg-blue-600/20 hover:bg-blue-600/30 border border-blue-400/40 px-4 py-3 rounded-md mb-4 text-blue-300 text-sm font-medium w-fit">
              <Upload size={16} /> Upload Photo (Optional)
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
          )}

          <div className="grid md:grid-cols-2 gap-4">
            {[
              "fullName",
              "email",
              "phone",
              "address",
              "dob",
              "linkedin",
              "github",
              "portfolio",
            ].map((field) => (
              <div key={field}>
                <input
                  type="text"
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  placeholder={field.replace(/([A-Z])/g, " $1").toUpperCase()}
                  className={`w-full bg-slate-800/60 border ${
                    errors[field] ? "border-red-500" : "border-slate-600"
                  } rounded-md px-3 py-2 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-blue-500`}
                />
                {errors[field] && (
                  <p className="text-xs text-red-400 mt-1">{errors[field]}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* SUMMARY */}
        <section className="bg-slate-900/40 backdrop-blur rounded-2xl border border-white/10 p-8">
          <h2 className="text-xl font-semibold mb-4 border-b border-slate-700 pb-2">
            Professional Summary
          </h2>
          <textarea
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            placeholder="Write a brief summary about yourself..."
            className={`w-full bg-slate-800/60 border ${
              errors.summary ? "border-red-500" : "border-slate-600"
            } rounded-md px-3 py-2 text-sm text-white placeholder-slate-400 h-32 focus:outline-none focus:border-purple-500`}
          />
          {errors.summary && (
            <p className="text-xs text-red-400 mt-1">{errors.summary}</p>
          )}
        </section>

        {/* EDUCATION */}
        <section className="bg-slate-900/40 backdrop-blur rounded-2xl border border-white/10 p-8">
          <h2 className="text-xl font-semibold mb-4 border-b border-slate-700 pb-2">
            Education
          </h2>
          {formData.education.map((edu, i) => (
            <div key={i} className="space-y-3 border-b border-slate-700 pb-4 mb-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  name="school"
                  placeholder="School / University"
                  value={edu.school}
                  onChange={(e) => handleArrayChange(i, e, "education")}
                  className="bg-slate-800/60 border border-slate-600 rounded-md px-3 py-2 text-sm text-white placeholder-slate-400"
                />
                <input
                  name="degree"
                  placeholder="Degree"
                  value={edu.degree}
                  onChange={(e) => handleArrayChange(i, e, "education")}
                  className="bg-slate-800/60 border border-slate-600 rounded-md px-3 py-2 text-sm text-white placeholder-slate-400"
                />
              </div>
              <input
                name="field"
                placeholder="Field of Study"
                value={edu.field}
                onChange={(e) => handleArrayChange(i, e, "education")}
                className="w-full bg-slate-800/60 border border-slate-600 rounded-md px-3 py-2 text-sm text-white placeholder-slate-400"
              />
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  name="startYear"
                  placeholder="Start Year"
                  value={edu.startYear}
                  onChange={(e) => handleArrayChange(i, e, "education")}
                  className="bg-slate-800/60 border border-slate-600 rounded-md px-3 py-2 text-sm text-white placeholder-slate-400"
                />
                <input
                  name="endYear"
                  placeholder="End Year"
                  value={edu.endYear}
                  onChange={(e) => handleArrayChange(i, e, "education")}
                  className="bg-slate-800/60 border border-slate-600 rounded-md px-3 py-2 text-sm text-white placeholder-slate-400"
                />
              </div>
              {formData.education.length > 1 && (
                <button
                  onClick={() => removeItem(i, "education")}
                  className="flex items-center gap-1 text-red-400 text-sm mt-2 hover:text-red-500"
                >
                  <Trash2 size={14} /> Remove
                </button>
              )}
            </div>
          ))}
          <button
            onClick={() => addSection("education")}
            className="flex items-center gap-2 text-green-400 text-sm hover:text-green-300"
          >
            <Plus size={14} /> Add Education
          </button>
        </section>

        {/* EXPERIENCE ✅ */}
        <section className="bg-slate-900/40 backdrop-blur rounded-2xl border border-white/10 p-8">
          <h2 className="text-xl font-semibold mb-4 border-b border-slate-700 pb-2">
            Experience
          </h2>
          {formData.experience.map((exp, i) => (
            <div key={i} className="space-y-3 border-b border-slate-700 pb-4 mb-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  name="company"
                  placeholder="Company Name"
                  value={exp.company}
                  onChange={(e) => handleArrayChange(i, e, "experience")}
                  className="bg-slate-800/60 border border-slate-600 rounded-md px-3 py-2 text-sm text-white placeholder-slate-400"
                />
                <input
                  name="position"
                  placeholder="Job Position"
                  value={exp.position}
                  onChange={(e) => handleArrayChange(i, e, "experience")}
                  className="bg-slate-800/60 border border-slate-600 rounded-md px-3 py-2 text-sm text-white placeholder-slate-400"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  name="startDate"
                  placeholder="Start Date"
                  value={exp.startDate}
                  onChange={(e) => handleArrayChange(i, e, "experience")}
                  className="bg-slate-800/60 border border-slate-600 rounded-md px-3 py-2 text-sm text-white placeholder-slate-400"
                />
                <input
                  name="endDate"
                  placeholder="End Date"
                  value={exp.endDate}
                  onChange={(e) => handleArrayChange(i, e, "experience")}
                  className="bg-slate-800/60 border border-slate-600 rounded-md px-3 py-2 text-sm text-white placeholder-slate-400"
                />
              </div>
              <textarea
                name="description"
                placeholder="Describe your role and key achievements..."
                value={exp.description}
                onChange={(e) => handleArrayChange(i, e, "experience")}
                className="w-full bg-slate-800/60 border border-slate-600 rounded-md px-3 py-2 text-sm text-white placeholder-slate-400 h-24"
              />
              {formData.experience.length > 1 && (
                <button
                  onClick={() => removeItem(i, "experience")}
                  className="flex items-center gap-1 text-red-400 text-sm mt-2 hover:text-red-500"
                >
                  <Trash2 size={14} /> Remove
                </button>
              )}
            </div>
          ))}
          <button
            onClick={() => addSection("experience")}
            className="flex items-center gap-2 text-orange-400 text-sm hover:text-orange-300"
          >
            <Plus size={14} /> Add Experience
          </button>
        </section>

        {/* SKILLS / LANGUAGES / CERTIFICATIONS */}
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { label: "Skills", name: "skills" },
            { label: "Languages", name: "languages" },
            { label: "Certifications", name: "certifications" },
          ].map((section) => (
            <div
              key={section.name}
              className="bg-slate-900/40 backdrop-blur rounded-2xl border border-white/10 p-6"
            >
              <h3 className="text-lg font-semibold mb-3">{section.label}</h3>
              <textarea
                name={section.name}
                value={formData[section.name]}
                onChange={handleChange}
                placeholder={`e.g. ${
                  section.name === "skills"
                    ? "React, JavaScript"
                    : section.name === "languages"
                    ? "English, Spanish"
                    : "AWS Certified"
                }`}
                className={`w-full bg-slate-800/60 border ${
                  errors[section.name] ? "border-red-500" : "border-slate-600"
                } rounded-md px-3 py-2 text-sm text-white placeholder-slate-400 h-32`}
              />
              {errors[section.name] && (
                <p className="text-xs text-red-400 mt-1">
                  {errors[section.name]}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* SUBMIT */}
        <div className="text-center">
          <button
            onClick={handleSubmit}
            className="flex items-center gap-2 mx-auto bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold px-6 py-3 rounded-md shadow-md transition-transform hover:scale-105"
          >
            <Download size={18} /> Generate Resume
          </button>
        </div>
      </div>
    </div>
  );
}
