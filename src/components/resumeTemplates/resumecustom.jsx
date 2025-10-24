import React, { useState, useRef } from "react";
import GridLayout from "react-grid-layout";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

export default function ResumeCustom() {
  const resumeRef = useRef();
  
  const [fields, setFields] = useState([
    {
      id: "1",
      text: "Your Name",
      textColor: "#000000",
      bgColor: "#ffffff",
      fontSize: 16,
      x: 0,
      y: 0,
      w: 4,
      h: 1,
    },
  ]);

  const addField = () => {
    const newField = {
      id: Date.now().toString(),
      text: "New Field",
      textColor: "#000000",
      bgColor: "#ffffff",
      fontSize: 14,
      x: 0,
      y: Infinity, // place at the bottom
      w: 4,
      h: 1,
    };
    setFields([...fields, newField]);
  };

  const removeField = (id) => {
    setFields(fields.filter((f) => f.id !== id));
  };

  const updateField = (id, key, value) => {
    setFields(fields.map(f => f.id === id ? { ...f, [key]: value } : f));
  };

  const handleDownload = () => {
    const input = resumeRef.current;
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "pt", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("Custom_Resume.pdf");
    });
  };

  const layout = fields.map((f, index) => ({
    i: f.id,
    x: f.x,
    y: f.y,
    w: f.w,
    h: f.h,
  }));

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 p-4 border-r overflow-y-auto">
        <h2 className="text-lg font-bold mb-4">Edit Fields</h2>
        <button
          onClick={addField}
          className="mb-4 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Add Field
        </button>

        {fields.map((field) => (
          <div key={field.id} className="mb-4 p-2 border rounded">
            <label className="block mb-1">Text:</label>
            <input
              type="text"
              value={field.text}
              onChange={(e) => updateField(field.id, "text", e.target.value)}
              className="border px-1 py-1 w-full mb-1 rounded"
            />

            <label className="block mb-1">Text Color:</label>
            <input
              type="color"
              value={field.textColor}
              onChange={(e) =>
                updateField(field.id, "textColor", e.target.value)
              }
              className="w-full mb-1"
            />

            <label className="block mb-1">Background Color:</label>
            <input
              type="color"
              value={field.bgColor}
              onChange={(e) =>
                updateField(field.id, "bgColor", e.target.value)
              }
              className="w-full mb-1"
            />

            <label className="block mb-1">Font Size:</label>
            <input
              type="number"
              value={field.fontSize}
              onChange={(e) =>
                updateField(field.id, "fontSize", Number(e.target.value))
              }
              min={8}
              max={48}
              className="w-full mb-1 border px-1 py-1 rounded"
            />

            <button
              onClick={() => removeField(field.id)}
              className="mt-2 px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Resume Preview */}
      <div className="flex-1 p-6 overflow-y-auto bg-gray-100">
        <div
          ref={resumeRef}
          className="w-[8.5in] mx-auto border p-4 bg-white"
        >
          <GridLayout
            layout={layout}
            cols={12}
            rowHeight={30}
            width={800}
            onLayoutChange={(newLayout) => {
              const updatedFields = fields.map((f) => {
                const l = newLayout.find((item) => item.i === f.id);
                return { ...f, x: l.x, y: l.y, w: l.w, h: l.h };
              });
              setFields(updatedFields);
            }}
            draggableHandle=".drag-handle"
          >
            {fields.map((field) => (
              <div
                key={field.id}
                className="border p-1 drag-handle"
                style={{
                  backgroundColor: field.bgColor,
                  color: field.textColor,
                  fontSize: `${field.fontSize}px`,
                }}
              >
                {field.text}
              </div>
            ))}
          </GridLayout>
        </div>

        <div className="flex justify-center mt-4">
          <button
            onClick={handleDownload}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Download Resume
          </button>
        </div>
      </div>
    </div>
  );
}
