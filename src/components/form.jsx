import React, { useState } from "react";
import { Trash2, Plus, Download, Upload, X } from "lucide-react";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function ResumeBuilder() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "", email: "", phone: "", address: "", dob: "", linkedin: "", github: "", portfolio: "",
    profileImage: null, profileImagePreview: null, summary: "",
    education: [{ school: "", degree: "", field: "", startYear: "", endYear: "" }],
    experience: [{ company: "", position: "", startDate: "", endDate: "", description: "" }],
    skills: "", languages: "", certifications: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setFormData({ ...formData, profileImage: file, profileImagePreview: reader.result });
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => setFormData({ ...formData, profileImage: null, profileImagePreview: null });

  const handleArrayChange = (index, e, section) => {
    const updated = [...formData[section]];
    updated[index][e.target.name] = e.target.value;
    setFormData({ ...formData, [section]: updated });
  };

  const addSection = (section) => {
    const blankItem = section === "education" ? { school: "", degree: "", field: "", startYear: "", endYear: "" } : { company: "", position: "", startDate: "", endDate: "", description: "" };
    setFormData({ ...formData, [section]: [...formData[section], blankItem] });
  };

  const removeItem = (index, section) => {
    if (formData[section].length > 1) {
      const updated = formData[section].filter((_, i) => i !== index);
      setFormData({ ...formData, [section]: updated });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = ["fullName", "email", "phone", "address", "dob", "linkedin", "github", "summary", "skills", "languages"];
    requiredFields.forEach(field => { if (!formData[field].trim()) newErrors[field] = `${field.replace(/([A-Z])/g, " $1")} is required`; });

    formData.education.forEach((edu, index) => {
      ["school", "degree", "field", "startYear", "endYear"].forEach(field => {
        if (!edu[field].trim()) newErrors[`edu-${index}-${field}`] = "Required";
      });
    });

    formData.experience.forEach((exp, index) => {
      const hasData = exp.company.trim() || exp.position.trim() || exp.startDate.trim() || exp.endDate.trim() || exp.description.trim();
      if (hasData) {
        ["company", "position", "startDate", "endDate", "description"].forEach(field => {
          if (!exp[field].trim()) newErrors[`exp-${index}-${field}`] = "Required";
        });
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log("Resume Data:", formData);
      alert("Resume saved successfully!");
      navigate("/userResume")
    } else {
      const missingFields = Object.keys(errors).map(key => {
        if (key.startsWith("edu-")) return "Education: " + key.split("-")[2];
        if (key.startsWith("exp-")) return "Experience: " + key.split("-")[2];
        return key.replace(/([A-Z])/g, " $1");
      });
      alert("Please fill in the following required fields:\n\n" + missingFields.join("\n"));
    }
  };

  const inputStyle = (errorKey) => ({ padding: "12px 16px", borderRadius: "8px", background: "rgba(255,255,255,0.1)", border: `1px solid ${errors[errorKey] ? "#ef4444" : "rgba(255,255,255,0.2)"}`, color: "white", fontSize: "14px", outline: "none", width: "100%", boxSizing: "border-box" });

  const smallInputStyle = (errorKey) => ({ padding: "10px 12px", borderRadius: "6px", background: "rgba(255,255,255,0.1)", border: `1px solid ${errors[errorKey] ? "#ef4444" : "rgba(255,255,255,0.2)"}`, color: "white", fontSize: "13px", outline: "none", boxSizing: "border-box" });

  const sectionStyle = { background: "rgba(255,255,255,0.05)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "16px", padding: "32px", marginBottom: "24px" };
  const headerStyle = { fontSize: "24px", fontWeight: "bold", color: "white", marginBottom: "20px", display: "flex", alignItems: "center", gap: "12px" };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)", padding: "40px 20px" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h1 style={{ fontSize: "48px", fontWeight: "bold", color: "white", margin: "0 0 10px 0" }}>Resume Builder</h1>
          <p style={{ fontSize: "18px", color: "#94a3b8", margin: 0 }}>Create a professional resume in minutes</p>
        </div>

        {/* PERSONAL INFO */}
        <div style={sectionStyle}>
          <h2 style={headerStyle}>
            <div style={{ width: "4px", height: "28px", background: "linear-gradient(to bottom, #06b6d4, #3b82f6)", borderRadius: "2px" }}></div>
            Personal Information
          </h2>

          {formData.profileImagePreview ? (
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
              <img src={formData.profileImagePreview} alt="Profile" style={{ width: "80px", height: "80px", borderRadius: "8px", objectFit: "cover" }} />
              <button onClick={removeImage} style={{ background: "#ef4444", border: "none", borderRadius: "6px", color: "white", padding: "8px 16px", cursor: "pointer", fontSize: "13px", fontWeight: "500", display: "flex", alignItems: "center", gap: "6px" }}>
                <X size={14} /> Remove
              </button>
            </div>
          ) : (
            <label style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer", padding: "12px 16px", background: "rgba(59, 130, 246, 0.2)", border: "1px solid rgba(59, 130, 246, 0.5)", borderRadius: "8px", color: "#93c5fd", fontWeight: "500", fontSize: "13px", marginBottom: "24px" }}>
              <Upload size={16} /> Upload Photo (Optional)
              <input type="file" accept="image/jpeg,image/png" onChange={handleImageUpload} style={{ display: "none" }} />
            </label>
          )}

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }}>
            {["fullName", "email", "phone", "address", "dob", "linkedin", "github", "portfolio"].map((field) => (
              <div key={field}>
                <input type="text" name={field} placeholder={field.replace(/([A-Z])/g, " $1").toUpperCase()} value={formData[field]} onChange={handleChange} style={inputStyle(field)} onFocus={(e) => { if (!errors[field]) e.target.style.borderColor = "#06b6d4"; }} onBlur={(e) => { if (!errors[field]) e.target.style.borderColor = "rgba(255,255,255,0.2)"; }} />
                {errors[field] && <span style={{ fontSize: "12px", color: "#ef4444", marginTop: "4px", display: "block" }}>{errors[field]}</span>}
                {field === "portfolio" && !errors[field] && <span style={{ fontSize: "11px", color: "#94a3b8", marginTop: "2px", display: "block" }}>Optional</span>}
              </div>
            ))}
          </div>
        </div>

        {/* SUMMARY */}
        <div style={sectionStyle}>
          <h2 style={headerStyle}>
            <div style={{ width: "4px", height: "28px", background: "linear-gradient(to bottom, #a855f7, #ec4899)", borderRadius: "2px" }}></div>
            Professional Summary
          </h2>
          <textarea name="summary" placeholder="Write a brief summary about yourself..." value={formData.summary} onChange={handleChange} style={{ ...inputStyle("summary"), minHeight: "100px", resize: "vertical", fontFamily: "inherit" }} onFocus={(e) => { if (!errors.summary) e.target.style.borderColor = "#a855f7"; }} onBlur={(e) => { if (!errors.summary) e.target.style.borderColor = "rgba(255,255,255,0.2)"; }} />
          {errors.summary && <span style={{ fontSize: "12px", color: "#ef4444", marginTop: "4px", display: "block" }}>{errors.summary}</span>}
        </div>

        {/* EDUCATION */}
        <div style={sectionStyle}>
          <h2 style={headerStyle}>
            <div style={{ width: "4px", height: "28px", background: "linear-gradient(to bottom, #10b981, #34d399)", borderRadius: "2px" }}></div>
            Education <span style={{ fontSize: "14px", color: "#6ee7b7", fontWeight: "400" }}>(Required)</span>
          </h2>
          {formData.education.map((edu, index) => (
            <div key={index} style={{ padding: "16px", borderRadius: "8px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", marginBottom: "16px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
                {["school", "degree"].map(field => (
                  <div key={field}>
                    <input type="text" name={field} className="w-full" placeholder={field === "school" ? "School/University" : "Degree (e.g., B.S.)"} value={edu[field]} onChange={(e) => handleArrayChange(index, e, "education")} style={smallInputStyle(`edu-${index}-${field}`)} />
                    {errors[`edu-${index}-${field}`] && <span style={{ fontSize: "10px", color: "#ef4444", marginTop: "2px", display: "block" }}>Required</span>}
                  </div>
                ))}
              </div>
              <div style={{ marginBottom: "12px" }}>
                <input type="text" name="field" placeholder="Field of Study" value={edu.field} onChange={(e) => handleArrayChange(index, e, "education")} style={{ ...smallInputStyle(`edu-${index}-field`), width: "100%" }} />
                {errors[`edu-${index}-field`] && <span style={{ fontSize: "10px", color: "#ef4444", marginTop: "2px", display: "block" }}>Required</span>}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
                {["startYear", "endYear"].map(field => (
                  <div key={field}>
                    <input type="text" name={field} className="w-full" placeholder={field === "startYear" ? "Start Year" : "End Year"} value={edu[field]} onChange={(e) => handleArrayChange(index, e, "education")} style={smallInputStyle(`edu-${index}-${field}`)} />
                    {errors[`edu-${index}-${field}`] && <span style={{ fontSize: "10px", color: "#ef4444", marginTop: "2px", display: "block" }}>Required</span>}
                  </div>
                ))}
              </div>
              {formData.education.length > 1 && <button onClick={() => removeItem(index, "education")} style={{ background: "none", border: "none", color: "#f87171", cursor: "pointer", fontSize: "13px", fontWeight: "500", display: "flex", alignItems: "center", gap: "6px", marginTop: "8px" }}><Trash2 size={14} /> Remove</button>}
            </div>
          ))}
          <button onClick={() => addSection("education")} style={{ background: "rgba(16, 185, 129, 0.2)", border: "1px solid rgba(16, 185, 129, 0.5)", borderRadius: "8px", color: "#6ee7b7", padding: "10px 16px", cursor: "pointer", fontWeight: "600", fontSize: "13px", display: "flex", alignItems: "center", gap: "8px" }}><Plus size={16} /> Add Education</button>
        </div>

        {/* EXPERIENCE */}
        <div style={sectionStyle}>
          <h2 style={headerStyle}>
            <div style={{ width: "4px", height: "28px", background: "linear-gradient(to bottom, #f97316, #ef4444)", borderRadius: "2px" }}></div>
            Experience <span style={{ fontSize: "14px", color: "#fdba74", fontWeight: "400" }}>(Optional)</span>
          </h2>
          {formData.experience.map((exp, index) => (
            <div key={index} style={{ padding: "16px", borderRadius: "8px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", marginBottom: "16px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
                {["company", "position"].map(field => (
                  <div key={field}>
                    <input type="text" name={field} className="w-full" placeholder={field === "company" ? "Company" : "Job Position"} value={exp[field]} onChange={(e) => handleArrayChange(index, e, "experience")} style={smallInputStyle(`exp-${index}-${field}`)} />
                    {errors[`exp-${index}-${field}`] && <span style={{ fontSize: "10px", color: "#ef4444", marginTop: "2px", display: "block" }}>Required</span>}
                  </div>
                ))}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
                {["startDate", "endDate"].map(field => (
                  <div key={field}>
                    <input type="text" name={field} className="w-full" placeholder={field === "startDate" ? "Start Date" : "End Date"} value={exp[field]} onChange={(e) => handleArrayChange(index, e, "experience")} style={smallInputStyle(`exp-${index}-${field}`)} />
                    {errors[`exp-${index}-${field}`] && <span style={{ fontSize: "10px", color: "#ef4444", marginTop: "2px", display: "block" }}>Required</span>}
                  </div>
                ))}
              </div>
              <div style={{ marginBottom: "12px" }}>
                <textarea name="description" placeholder="Describe your role, achievements..." value={exp.description} onChange={(e) => handleArrayChange(index, e, "experience")} style={{ ...smallInputStyle(`exp-${index}-description`), width: "100%", minHeight: "80px", resize: "vertical", fontFamily: "inherit" }} />
                {errors[`exp-${index}-description`] && <span style={{ fontSize: "10px", color: "#ef4444", marginTop: "2px", display: "block" }}>Required</span>}
              </div>
              {formData.experience.length > 1 && <button onClick={() => removeItem(index, "experience")} style={{ background: "none", border: "none", color: "#f87171", cursor: "pointer", fontSize: "13px", fontWeight: "500", display: "flex", alignItems: "center", gap: "6px" }}><Trash2 size={14} /> Remove</button>}
            </div>
          ))}
          <button onClick={() => addSection("experience")} style={{ background: "rgba(249, 115, 22, 0.2)", border: "1px solid rgba(249, 115, 22, 0.5)", borderRadius: "8px", color: "#fdba74", padding: "10px 16px", cursor: "pointer", fontWeight: "600", fontSize: "13px", display: "flex", alignItems: "center", gap: "8px" }}><Plus size={16} /> Add Experience</button>
        </div>

        {/* SKILLS / LANGUAGES / CERTIFICATIONS */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px", marginBottom: "32px" }}>
          {[{ label: "Skills", name: "skills", gradient: "linear-gradient(to bottom, #3b82f6, #06b6d4)", req: true }, { label: "Languages", name: "languages", gradient: "linear-gradient(to bottom, #ec4899, #f43f5e)", req: true }, { label: "Certifications", name: "certifications", gradient: "linear-gradient(to bottom, #eab308, #f97316)", req: false }].map((section) => (
            <div key={section.name} style={{ ...sectionStyle, marginBottom: 0 }}>
              <h3 style={{ fontSize: "18px", fontWeight: "bold", color: "white", marginBottom: "16px", display: "flex", alignItems: "center", gap: "10px", margin: 0}}>
                <div style={{ width: "3px", height: "20px", background: section.gradient, borderRadius: "2px" }}></div>
                {section.label} {!section.req && <span style={{ fontSize: "12px", color: "#94a3b8", fontWeight: "400" }}>(Optional)</span>}
              </h3>
              <textarea name={section.name} placeholder={`e.g., ${section.label === "Skills" ? "JavaScript, React, Python" : section.label === "Languages" ? "English, Spanish" : "AWS Certified"}`} value={formData[section.name]} onChange={handleChange} style={{ ...inputStyle(section.name), minHeight: "120px", resize: "vertical", fontFamily: "inherit" }} />
              {errors[section.name] && <span style={{ fontSize: "12px", color: "#ef4444", marginTop: "4px", display: "block" }}>{errors[section.name]}</span>}
            </div>
          ))}
        </div>

        {/* SUBMIT */}
        <div style={{ display: "flex", justifyContent: "center", paddingTop: "16px" }}>
          <button onClick={handleSubmit} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "16px 32px", borderRadius: "8px", background: "linear-gradient(to right, #06b6d4, #3b82f6)", color: "white", fontWeight: "bold", fontSize: "16px", border: "none", cursor: "pointer", boxShadow: "0 4px 15px rgba(6, 182, 212, 0.4)", transition: "all 0.3s" }} onMouseEnter={(e) => { e.target.style.transform = "scale(1.05)"; e.target.style.boxShadow = "0 6px 20px rgba(6, 182, 212, 0.6)"; }} onMouseLeave={(e) => { e.target.style.transform = "scale(1)"; e.target.style.boxShadow = "0 4px 15px rgba(6, 182, 212, 0.4)"; }}><Download size={20} /> Generate Resume</button>
        </div>
      </div>
    </div>
  );
}