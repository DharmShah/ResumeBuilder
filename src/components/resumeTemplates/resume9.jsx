import React, { useState, useRef } from "react";
import GridLayout from "react-grid-layout";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

export default function ResumeCustom() {
  const resumeRef = useRef();

  const [showGrid, setShowGrid] = useState(true);
  const [fields, setFields] = useState([
    {
      id: "1",
      type: "text",
      text: "Your Name",
      textColor: "#000000",
      bgColor: "#ffffff",
      fontSize: 24,
      x: 0,
      y: 0,
      w: 12,
      h: 1,
    },
  ]);

  const [selectedField, setSelectedField] = useState(null);

  const addField = (type = "text", icon = null) => {
    const maxY =
      fields.length > 0 ? Math.max(...fields.map((f) => f.y + f.h)) : 0;

    let newField;
    if (type === "hr") {
      newField = {
        id: Date.now().toString(),
        type: "hr",
        x: 0,
        y: maxY + 1,
        w: 12,
        h: 0.2,
      };
    } else {
      newField = {
        id: Date.now().toString(),
        type: "text",
        text: icon ? `${icon} Add text` : "New Field",
        textColor: "#000000",
        bgColor: "#ffffff",
        fontSize: 14,
        x: 0,
        y: maxY + 1,
        w: 6,
        h: 1,
      };
    }

    setFields((prev) => [...prev, newField]);
    setSelectedField(newField.id);
  };

  const removeField = (id) => {
    setFields((fields) => fields.filter((f) => f.id !== id));
    if (selectedField === id) setSelectedField(null);
  };

  const updateField = (id, key, value) => {
    setFields((fields) =>
      fields.map((f) => (f.id === id ? { ...f, [key]: value } : f))
    );
  };

  const handleDownload = async () => {
    const input = resumeRef.current;

    // Temporarily hide grid and borders
    setShowGrid(false);
    const editableDivs = input.querySelectorAll(".editable-block");
    editableDivs.forEach((div) => div.classList.add("no-edit-style"));

    await html2canvas(input, { scale: 2, backgroundColor: "#ffffff" }).then(
      (canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "pt", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("Custom_Resume.pdf");
      }
    );

    // Restore grid and edit borders
    setShowGrid(true);
    editableDivs.forEach((div) => div.classList.remove("no-edit-style"));
  };

  const layout = fields.map((f) => ({
    i: f.id,
    x: f.x,
    y: f.y,
    w: f.w,
    h: f.h,
  }));

  const selected = fields.find((f) => f.id === selectedField);

  return (
    <>
      <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800">
        {/* Sidebar */}
        <aside className="w-72 border-r bg-white/70 backdrop-blur-lg shadow-md p-5 overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">
            🎨 Add Elements
          </h2>

          <div className="space-y-2">
            <button
              onClick={() => addField("text")}
              className="w-full py-2 rounded-md font-medium bg-emerald-500 text-white hover:bg-emerald-600 transition-all"
            >
              ➕ Add Text
            </button>
            <button
              onClick={() => addField("text", "📧")}
              className="w-full py-2 rounded-md font-medium bg-blue-500 text-white hover:bg-blue-600 transition-all"
            >
              📧 Add Email
            </button>
            <button
              onClick={() => addField("text", "📞")}
              className="w-full py-2 rounded-md font-medium bg-blue-500 text-white hover:bg-blue-600 transition-all"
            >
              📞 Add Phone
            </button>
            <button
              onClick={() => addField("text", "🐙 GitHub")}
              className="w-full py-2 rounded-md font-medium bg-gray-800 text-white hover:bg-gray-900 transition-all"
            >
              🐙 Add GitHub
            </button>
            <button
              onClick={() => addField("text", "🔗 LinkedIn")}
              className="w-full py-2 rounded-md font-medium bg-blue-700 text-white hover:bg-blue-800 transition-all"
            >
              🔗 Add LinkedIn
            </button>
            <button
              onClick={() => addField("hr")}
              className="w-full py-2 rounded-md font-medium bg-slate-400 text-white hover:bg-slate-500 transition-all"
            >
              ➖ Add Divider
            </button>
          </div>

          {/* Style Editor */}
          {selected && (
            <div className="mt-6 border-t pt-4">
              <h3 className="text-lg font-semibold mb-2 text-gray-700">
                🧩 Edit Style
              </h3>

              <label className="block mb-2 text-sm text-gray-600">
                Font Size ({selected.fontSize}px)
              </label>
              <input
                type="range"
                min="10"
                max="48"
                value={selected.fontSize}
                onChange={(e) =>
                  updateField(selected.id, "fontSize", Number(e.target.value))
                }
                className="w-full mb-3"
              />

              <label className="block mb-2 text-sm text-gray-600">
                Text Color
              </label>
              <input
                type="color"
                value={selected.textColor}
                onChange={(e) =>
                  updateField(selected.id, "textColor", e.target.value)
                }
                className="w-full mb-3 h-8 cursor-pointer"
              />

              <label className="block mb-2 text-sm text-gray-600">
                Background Color
              </label>
              <input
                type="color"
                value={selected.bgColor}
                onChange={(e) =>
                  updateField(selected.id, "bgColor", e.target.value)
                }
                className="w-full mb-3 h-8 cursor-pointer"
              />

              <button
                onClick={() => removeField(selected.id)}
                className="w-full mt-2 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition-all"
              >
                🗑️ Delete Element
              </button>
            </div>
          )}
        </aside>

        {/* Resume Canvas */}
        <main className="flex-1 flex flex-col items-center py-6 overflow-y-auto">
          <div
            ref={resumeRef}
            className={`relative w-[8.5in] min-h-[11in] bg-white shadow-lg border border-gray-200 p-6 rounded-md ${
              showGrid ? "bg-grid" : ""
            }`}
          >
            <GridLayout
              layout={layout}
              cols={12}
              rowHeight={30}
              width={800}
              margin={[8, 8]}
              containerPadding={[8, 8]}
              isBounded={true}
              preventCollision={false}
              compactType={null}
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
                  className={`editable-block drag-handle relative group cursor-move p-2 transition-all duration-150 ${
                    selectedField === field.id
                      ? "ring-2 ring-blue-400 border border-blue-400 rounded-md"
                      : "border border-transparent"
                  }`}
                  style={{
                    backgroundColor: field.bgColor,
                    color: field.textColor,
                    fontSize: `${field.fontSize || 14}px`,
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedField(field.id);
                  }}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeField(field.id);
                    }}
                    className="absolute top-1 right-1 text-red-500 hover:text-red-700 bg-white rounded-full w-6 h-6 flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                    title="Delete"
                  >
                    ✕
                  </button>

                  {field.type === "hr" ? (
                    <hr className="w-full border-t border-gray-400" />
                  ) : (
                    <div
                      contentEditable
                      suppressContentEditableWarning
                      className="w-full text-center outline-none"
                      onBlur={(e) =>
                        updateField(field.id, "text", e.currentTarget.textContent)
                      }
                      dangerouslySetInnerHTML={{ __html: field.text }}
                    />
                  )}
                </div>
              ))}
            </GridLayout>
          </div>
        </main>
      </div>

      {/* Download Button */}
      <div className="flex justify-center py-4 bg-gray-50 border-t">
        <button
          onClick={handleDownload}
          className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200"
        >
          📄 Download Resume
        </button>
      </div>

      {/* Custom styles */}
      <style jsx>{`
        .no-edit-style {
          border: none !important;
          box-shadow: none !important;
          ring-width: 0 !important;
        }
        .bg-grid {
          background-image: linear-gradient(
              to right,
              rgba(0, 0, 0, 0.05) 1px,
              transparent 1px
            ),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px);
          background-size: 25px 25px;
        }
      `}</style>
    </>
  );
}
