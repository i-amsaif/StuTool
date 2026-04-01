"use client";

import { useState, useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import lzString from "lz-string";
import {
  initialResumeData,
  ResumeData,
  Education,
  DEFAULT_SECTION_ORDER,
} from "@/lib/resumeSchema";
import { fresherResume, experiencedResume } from "@/lib/sampleData";
import ResumeForm from "@/components/resume/ResumeForm";
import ResumePreview from "@/components/resume/ResumePreview";
import {
  Download,
  FileJson,
  Share2,
  Upload,
  FileSignature,
  Edit3,
  Eye,
  LayoutTemplate,
  ZoomIn,
  ZoomOut,
} from "lucide-react";

// --- DATA MIGRATION ---
function migrateResumeData(data: any): ResumeData {
  const migrated = { ...data };

  // Migrate education entries (old format → new Indian format)
  if (migrated.education?.length > 0) {
    migrated.education = migrated.education.map((edu: any) => {
      // Already migrated? (has 'institution' field)
      if (edu.institution !== undefined && edu.level !== undefined) return edu;

      const newEdu: Education = {
        id: edu.id || crypto.randomUUID(),
        level: "Undergraduate",
        institution: edu.school || edu.institution || "",
        board: edu.board || "",
        degree: edu.degree || "",
        marksType: "CGPA",
        marks: edu.marks || "",
        year: edu.year || edu.endDate || edu.startDate || "",
        description: edu.description || "",
      };

      // Extract GPA/percentage from description
      const descText = edu.description || "";
      const gpaMatch = descText.match(
        /(?:GPA|CGPA)[:\s]*(\d+\.?\d*)\s*\/\s*(\d+\.?\d*)/i
      );
      const pctMatch = descText.match(/(\d+\.?\d*)\s*%/);

      if (gpaMatch) {
        const value = parseFloat(gpaMatch[1]);
        newEdu.marks = gpaMatch[1];
        newEdu.marksType = value <= 10 ? "CGPA" : "Percentage";
        newEdu.description = descText
          .replace(/GPA[:\s]*\d+\.?\d*\s*\/\s*\d+\.?\d*\.?\s*/i, "")
          .trim();
      } else if (pctMatch) {
        newEdu.marks = pctMatch[1];
        newEdu.marksType = "Percentage";
        newEdu.description = descText
          .replace(/\d+\.?\d*\s*%\.?\s*/i, "")
          .trim();
      }

      return newEdu;
    });
  }

  // Add missing top-level fields
  if (migrated.careerObjective === undefined) migrated.careerObjective = "";
  if (!migrated.declaration)
    migrated.declaration = {
      enabled: false,
      place: "",
      date: new Date().toISOString().split("T")[0],
    };
  if (
    !migrated.sectionOrder ||
    !Array.isArray(migrated.sectionOrder) ||
    migrated.sectionOrder.length === 0
  )
    migrated.sectionOrder = [...DEFAULT_SECTION_ORDER];

  // Ensure all default sections exist in sectionOrder
  for (const sec of DEFAULT_SECTION_ORDER) {
    if (!migrated.sectionOrder.includes(sec)) {
      migrated.sectionOrder.push(sec);
    }
  }

  return migrated as ResumeData;
}

export default function ResumeBuilderPage() {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const [selectedTemplate, setSelectedTemplate] = useState<string>("minimal");
  const [isMounted, setIsMounted] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"Saved" | "Saving..." | "">("");

  // Mobile Tab State
  const [activeTab, setActiveTab] = useState<"edit" | "preview" | "layout">(
    "edit"
  );

  // Zoom and Scaling State
  const [baseScale, setBaseScale] = useState(1);
  const [userZoom, setUserZoom] = useState(1);
  const [previewHeight, setPreviewHeight] = useState(1122);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewContainerRef = useRef<HTMLDivElement>(null);
  const printRef = useRef<HTMLDivElement>(null);

  const [visibleSections, setVisibleSections] = useState({
    careerObjective: true,
    experience: true,
    education: true,
    projects: true,
    skills: true,
    declaration: true,
  });

  // @ts-ignore
  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: resumeData.personal.name
      ? `${resumeData.personal.name} - Resume`
      : "Resume",
  });

  useEffect(() => {
    setIsMounted(true);

    // 1. Check URL for shareable link
    const params = new URLSearchParams(window.location.search);
    const dataParam = params.get("data");
    if (dataParam) {
      try {
        const decompressed =
          lzString.decompressFromEncodedURIComponent(dataParam);
        if (decompressed) {
          const parsed = JSON.parse(decompressed);
          setResumeData(migrateResumeData(parsed));
          window.history.replaceState(
            {},
            document.title,
            window.location.pathname
          );
          return;
        }
      } catch (e) {
        alert("Invalid shareable link data.");
      }
    }

    // 2. Fallback to LocalStorage
    try {
      const savedSettings = localStorage.getItem("resumeBuilderData");
      if (savedSettings) {
        setResumeData(migrateResumeData(JSON.parse(savedSettings)));
      }
    } catch (error) {
      console.error("Failed to load resume data from local storage", error);
    }
  }, []);

  // Auto-save to localStorage
  useEffect(() => {
    if (!isMounted) return;
    setSaveStatus("Saving...");
    const handler = setTimeout(() => {
      try {
        localStorage.setItem(
          "resumeBuilderData",
          JSON.stringify(resumeData)
        );
        setSaveStatus("Saved");
        setTimeout(() => setSaveStatus(""), 2000);
      } catch (error) {
        console.error("Failed to save resume data", error);
      }
    }, 500);
    return () => clearTimeout(handler);
  }, [resumeData, isMounted]);

  // Smart default: auto-prioritize Projects above Experience when Experience is empty
  useEffect(() => {
    if (!isMounted) return;
    if (
      resumeData.experience.length === 0 &&
      resumeData.projects.length > 0
    ) {
      setResumeData((prev) => {
        const order = [...prev.sectionOrder];
        const projIdx = order.indexOf("projects");
        const expIdx = order.indexOf("experience");
        if (projIdx > -1 && expIdx > -1 && projIdx > expIdx) {
          order[projIdx] = "experience";
          order[expIdx] = "projects";
          return { ...prev, sectionOrder: order };
        }
        return prev;
      });
    }
  }, [resumeData.experience.length, resumeData.projects.length, isMounted]);

  // Scale calculations
  useEffect(() => {
    if (!isMounted) return;
    const updateScale = () => {
      if (previewContainerRef.current) {
        const containerW = previewContainerRef.current.clientWidth;
        const availableW = Math.max(containerW - 16, 200);
        const calculatedScale = availableW / 794;
        setBaseScale(calculatedScale > 1 ? 1 : calculatedScale);
      }
    };
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, [isMounted, activeTab]);

  // Track dynamic height of A4 page
  useEffect(() => {
    if (!isMounted || !printRef.current) return;
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setPreviewHeight(Math.max(entry.target.clientHeight, 1122));
      }
    });
    resizeObserver.observe(printRef.current);
    return () => resizeObserver.disconnect();
  }, [isMounted, resumeData, selectedTemplate, activeTab]);

  const handleReset = () => {
    if (
      confirm(
        "Are you sure you want to reset your resume? This action cannot be undone."
      )
    ) {
      setResumeData(initialResumeData);
      localStorage.removeItem("resumeBuilderData");
    }
  };

  const loadSample = (type: "fresher" | "experienced") => {
    if (
      confirm(
        `Load ${type} sample? This will overwrite your current resume.`
      )
    ) {
      setResumeData(type === "fresher" ? fresherResume : experiencedResume);
    }
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(resumeData, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `resume-${
      resumeData.personal.name
        ? resumeData.personal.name.replace(/\s+/g, "-").toLowerCase()
        : "export"
    }.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (
          parsed &&
          typeof parsed === "object" &&
          "personal" in parsed &&
          "education" in parsed
        ) {
          if (
            confirm("Importing will overwrite your current resume. Continue?")
          ) {
            setResumeData(migrateResumeData(parsed));
          }
        } else {
          alert("Invalid resume JSON structure.");
        }
      } catch (err) {
        alert("Failed to parse JSON file.");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const handleShare = async () => {
    try {
      const compressed = lzString.compressToEncodedURIComponent(
        JSON.stringify(resumeData)
      );
      const url = `${window.location.origin}${window.location.pathname}?data=${compressed}`;
      await navigator.clipboard.writeText(url);
      alert(
        "Shareable link copied to clipboard! You can send this link to anyone."
      );
    } catch (e) {
      alert("Failed to copy link. Data might be too large.");
    }
  };

  const updatePersonal = (
    field: keyof ResumeData["personal"],
    value: string
  ) => {
    setResumeData((prev) => ({
      ...prev,
      personal: { ...prev.personal, [field]: value },
    }));
  };

  const updatePersonalLanguages = (languages: string[]) => {
    setResumeData((prev) => ({
      ...prev,
      personal: { ...prev.personal, languages },
    }));
  };

  const updateCareerObjective = (value: string) => {
    setResumeData((prev) => ({ ...prev, careerObjective: value }));
  };

  const updateDeclaration = (field: keyof ResumeData["declaration"], value: any) => {
    setResumeData((prev) => ({
      ...prev,
      declaration: { ...prev.declaration, [field]: value },
    }));
  };

  const updateArrayItem = (
    section: "education" | "experience" | "projects",
    id: string,
    field: string,
    value: string
  ) => {
    setResumeData((prev) => ({
      ...prev,
      // @ts-ignore
      [section]: prev[section].map((item: any) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    }));
  };

  const addArrayItem = (
    section: "education" | "experience" | "projects"
  ) => {
    const id = crypto.randomUUID();
    let newItem: any;
    if (section === "education")
      newItem = {
        id,
        level: "Undergraduate",
        institution: "",
        board: "",
        degree: "",
        marksType: "CGPA" as const,
        marks: "",
        year: "",
        description: "",
      };
    else if (section === "experience")
      newItem = {
        id,
        company: "",
        position: "",
        startDate: "",
        endDate: "",
        description: "",
      };
    else newItem = { id, name: "", description: "", link: "" };
    // @ts-ignore
    setResumeData((prev) => ({
      ...prev,
      [section]: [...prev[section], newItem],
    }));
  };

  const removeArrayItem = (
    section: "education" | "experience" | "projects",
    id: string
  ) => {
    // @ts-ignore
    setResumeData((prev) => ({
      ...prev,
      [section]: prev[section].filter((item: any) => item.id !== id),
    }));
  };

  const reorderArrayItem = (
    section: "education" | "experience" | "projects",
    oldIndex: number,
    newIndex: number
  ) => {
    setResumeData((prev) => {
      const arr = [...prev[section]];
      const [moved] = arr.splice(oldIndex, 1);
      arr.splice(newIndex, 0, moved);
      return { ...prev, [section]: arr };
    });
  };

  const updateSkills = (skills: string[]) => {
    setResumeData((prev) => ({ ...prev, skills }));
  };

  const toggleVisibility = (
    section:
      | "careerObjective"
      | "experience"
      | "education"
      | "projects"
      | "skills"
      | "declaration"
  ) => {
    setVisibleSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const updateSectionOrder = (newOrder: string[]) => {
    setResumeData((prev) => ({ ...prev, sectionOrder: newOrder }));
  };

  // Smart default: suggest adding 10th + 12th when education level set to Undergraduate/Postgraduate
  const handleEducationLevelChange = (id: string, level: string) => {
    updateArrayItem("education", id, "level", level);

    if (level === "Undergraduate" || level === "Postgraduate") {
      const has10th = resumeData.education.some((e) => e.level === "10th");
      const has12th = resumeData.education.some((e) => e.level === "12th");

      if (!has10th || !has12th) {
        const shouldAdd = confirm(
          "Most Indian resumes include 10th & 12th details.\nAdd them automatically?"
        );
        if (shouldAdd) {
          const newEntries: Education[] = [];
          if (!has12th)
            newEntries.push({
              id: crypto.randomUUID(),
              level: "12th",
              institution: "",
              board: "",
              degree: "",
              marksType: "CGPA",
              marks: "",
              year: "",
              description: "",
            });
          if (!has10th)
            newEntries.push({
              id: crypto.randomUUID(),
              level: "10th",
              institution: "",
              board: "",
              degree: "",
              marksType: "CGPA",
              marks: "",
              year: "",
              description: "",
            });
          setResumeData((prev) => ({
            ...prev,
            education: [...prev.education, ...newEntries],
          }));
        }
      }
    }
  };

  // Filter data for preview based on visibility
  const displayData: ResumeData = {
    ...resumeData,
    careerObjective: visibleSections.careerObjective
      ? resumeData.careerObjective
      : "",
    experience: visibleSections.experience ? resumeData.experience : [],
    education: visibleSections.education ? resumeData.education : [],
    projects: visibleSections.projects ? resumeData.projects : [],
    skills: visibleSections.skills ? resumeData.skills : [],
    declaration: visibleSections.declaration
      ? resumeData.declaration
      : { ...resumeData.declaration, enabled: false },
  };

  if (!isMounted) return null;

  const finalScale = baseScale * userZoom;

  return (
    <div className="flex flex-col min-h-[100dvh] bg-surface-950 text-white font-sans overflow-hidden">
      {/* --- DESKTOP GLOBAL STICKY HEADER --- */}
      <header className="hidden md:flex sticky top-0 z-50 bg-surface-900/95 backdrop-blur-md border-b border-surface-800 px-6 py-3 justify-between items-center shadow-lg">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold bg-gradient-to-r from-brand-400 to-brand-600 bg-clip-text text-transparent flex items-center gap-2">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              className="text-brand-500"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
            Resume Builder
          </h1>
          <div className="flex items-center gap-2 ml-4">
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 text-xs font-medium bg-surface-800 hover:bg-surface-700 text-surface-200 hover:text-white px-2.5 py-1.5 rounded transition-colors"
            >
              <Share2 size={14} /> Share Link
            </button>
            <button
              onClick={handleExport}
              className="flex items-center gap-1.5 text-xs font-medium bg-surface-800 hover:bg-surface-700 text-surface-200 hover:text-white px-2.5 py-1.5 rounded transition-colors"
            >
              <FileJson size={14} /> Export
            </button>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1.5 text-xs font-medium bg-surface-800 hover:bg-surface-700 text-surface-200 hover:text-white px-2.5 py-1.5 rounded transition-colors"
            >
              <Upload size={14} /> Import
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImport}
              accept=".json"
              className="hidden"
            />
          </div>
          <div className="flex items-center gap-2 ml-2 relative group">
            <button className="flex items-center gap-1.5 text-xs font-medium bg-brand-500/10 hover:bg-brand-500/20 text-brand-300 border border-brand-500/20 px-2.5 py-1.5 rounded transition-colors">
              <FileSignature size={14} /> Load Sample ▼
            </button>
            <div className="absolute top-8 left-0 hidden group-hover:flex flex-col bg-surface-800 border border-surface-700 shadow-xl rounded py-1 min-w-[140px] z-50">
              <button
                onClick={() => loadSample("fresher")}
                className="text-left px-4 py-2 text-xs hover:bg-surface-700 transition"
              >
                Fresher
              </button>
              <button
                onClick={() => loadSample("experienced")}
                className="text-left px-4 py-2 text-xs hover:bg-surface-700 transition"
              >
                Experienced
              </button>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-xs font-medium text-surface-400 min-w-[60px] text-right mr-2">
            {saveStatus}
          </div>
          <div className="flex items-center gap-2 mr-2">
            <label className="text-sm font-medium text-surface-300">
              Template:
            </label>
            <select
              value={selectedTemplate}
              onChange={(e) => setSelectedTemplate(e.target.value)}
              className="bg-surface-800 border border-surface-700/50 rounded-lg px-3 py-1.5 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-brand-500/50 cursor-pointer transition-all hover:bg-surface-700"
            >
              <option value="minimal">Minimal</option>
              <option value="modern">Modern</option>
              <option value="classic">Classic</option>
            </select>
          </div>
          <button
            onClick={handleReset}
            className="text-sm font-medium text-surface-300 hover:text-red-400 transition-colors px-3 py-1.5 rounded-lg border border-transparent hover:border-red-500/30 hover:bg-red-500/10"
          >
            Reset
          </button>
          <button
            onClick={() => handlePrint()}
            className="px-4 py-1.5 bg-brand-600 hover:bg-brand-500 text-white text-sm font-medium rounded-lg shadow-lg shadow-brand-500/20 transition-all flex items-center gap-2 active:scale-95"
          >
            <Download size={16} /> Export PDF
          </button>
        </div>
      </header>

      {/* --- MOBILE COMPACT HEADER --- */}
      <header className="md:hidden sticky top-0 z-30 w-full bg-surface-900/95 backdrop-blur-md border-b border-surface-800 px-4 py-2 flex justify-between items-center shadow-sm">
        <h1 className="text-base font-bold bg-gradient-to-r from-brand-400 to-brand-600 bg-clip-text text-transparent">
          Resume Builder
        </h1>
        <div className="flex items-center gap-3">
          {saveStatus && (
            <div className="text-[10px] font-bold uppercase tracking-widest text-brand-400 bg-brand-500/10 px-2 py-0.5 rounded-full">
              {saveStatus}
            </div>
          )}
          <button
            onClick={handleReset}
            className="text-xs font-medium text-red-400"
          >
            Reset
          </button>
        </div>
      </header>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="flex flex-col md:flex-row h-[calc(100dvh-44px)] md:h-[calc(100vh-61px)] pb-[64px] md:pb-0 relative">
        {/* LEFT/MOBILE 1: FORM */}
        <div
          className={`w-full md:w-[45%] lg:w-[40%] bg-surface-900 border-b md:border-b-0 md:border-r border-surface-800 h-full overflow-y-auto custom-scrollbar ${
            activeTab === "edit" ? "block" : "hidden md:block"
          }`}
        >
          <ResumeForm
            data={resumeData}
            updatePersonal={updatePersonal}
            updatePersonalLanguages={updatePersonalLanguages}
            updateCareerObjective={updateCareerObjective}
            updateDeclaration={updateDeclaration}
            updateArrayItem={updateArrayItem}
            addArrayItem={addArrayItem}
            removeArrayItem={removeArrayItem}
            reorderArrayItem={reorderArrayItem}
            updateSkills={updateSkills}
            visibleSections={visibleSections}
            toggleVisibility={toggleVisibility}
            sectionOrder={resumeData.sectionOrder}
            updateSectionOrder={updateSectionOrder}
            onEducationLevelChange={handleEducationLevelChange}
          />
        </div>

        {/* MOBILE 2: LAYOUT TAB */}
        <div
          className={`w-full h-full bg-surface-900 overflow-y-auto p-5 md:hidden custom-scrollbar ${
            activeTab === "layout" ? "block" : "hidden"
          }`}
        >
          <h2 className="text-xl font-bold mb-6 text-white flex items-center gap-2 mt-2">
            <span className="w-8 h-8 rounded-lg bg-brand-500/10 text-brand-400 flex items-center justify-center">
              <LayoutTemplate size={18} />
            </span>
            Choose Theme
          </h2>
          <div className="flex flex-col gap-4">
            {["minimal", "modern", "classic"].map((t) => (
              <div
                key={t}
                onClick={() => setSelectedTemplate(t)}
                className={`p-5 rounded-2xl border-2 cursor-pointer transition-all relative overflow-hidden ${
                  selectedTemplate === t
                    ? "border-brand-500 bg-brand-500/5 shadow-[0_0_20px_rgba(var(--brand-500),0.1)]"
                    : "border-surface-700 bg-surface-800 hover:border-surface-600"
                }`}
              >
                {selectedTemplate === t && (
                  <div className="absolute top-0 right-0 w-16 h-16 bg-brand-500/10 rounded-bl-full"></div>
                )}
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-bold capitalize text-white">
                    {t}
                  </h3>
                  {selectedTemplate === t && (
                    <div className="w-3.5 h-3.5 rounded-full bg-brand-500 flex items-center justify-center shadow-[0_0_10px_rgba(var(--brand-500),0.5)]">
                      <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                    </div>
                  )}
                  {selectedTemplate !== t && (
                    <div className="w-3.5 h-3.5 rounded-full border-2 border-surface-600 outline-none"></div>
                  )}
                </div>
                <p className="text-sm text-surface-400 leading-relaxed max-w-[90%]">
                  {t === "minimal"
                    ? "Clean, simple, and traditional. Perfect for passing strict ATS systems."
                    : t === "modern"
                    ? "Two-column vibrant layout with a splash of color. Great for creatives."
                    : "Professional serif typography designed exclusively for formal and executive roles."}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT/MOBILE 3: PREVIEW */}
        <div
          ref={previewContainerRef}
          className={`w-full md:w-[55%] lg:w-[60%] h-full overflow-y-auto overflow-x-hidden bg-surface-950 px-0 md:px-8 py-2 md:py-8 flex-col custom-scrollbar ${
            activeTab === "preview" ? "flex" : "hidden md:flex"
          }`}
        >
          {/* Mobile Preview Top Actions */}
          {activeTab === "preview" && (
            <div className="md:hidden sticky top-0 z-20 w-full bg-surface-800/90 backdrop-blur-md border-b border-surface-700/80 px-4 py-2 shadow-lg flex items-center justify-between mb-2 flex-shrink-0">
              <span className="text-[11px] font-bold text-surface-200 uppercase tracking-widest flex items-center gap-1.5 border-l-2 border-brand-500 pl-2">
                <Eye size={14} className="text-brand-400" /> Preview
              </span>
              <div className="flex items-center gap-1 bg-surface-900 rounded-lg p-0.5 border border-surface-700">
                <button
                  onClick={() =>
                    setUserZoom((z) => Math.max(0.5, z - 0.2))
                  }
                  className="p-1.5 hover:bg-surface-800 rounded text-surface-300 transition-colors"
                >
                  <ZoomOut size={14} />
                </button>
                <button
                  onClick={() => setUserZoom(1)}
                  className="px-1 text-[11px] font-bold text-brand-400 min-w-[5ch] flex justify-center hover:bg-surface-800 rounded py-1 transition-colors"
                >
                  {(userZoom * 100).toFixed(0)}%
                </button>
                <button
                  onClick={() =>
                    setUserZoom((z) => Math.min(2.5, z + 0.2))
                  }
                  className="p-1.5 hover:bg-surface-800 rounded text-surface-300 transition-colors"
                >
                  <ZoomIn size={14} />
                </button>
              </div>
            </div>
          )}

          {/* Desktop Zoom Actions */}
          <div className="hidden md:flex items-center justify-end w-full max-w-[794px] mx-auto mb-4 flex-shrink-0">
            <div className="flex items-center gap-1 bg-surface-900 rounded-lg p-1 border border-surface-800 shadow-sm">
              <button
                onClick={() =>
                  setUserZoom((z) => Math.max(0.5, z - 0.2))
                }
                className="p-1.5 hover:bg-surface-800 rounded text-surface-400 hover:text-white transition-colors"
              >
                <ZoomOut size={16} />
              </button>
              <button
                onClick={() => setUserZoom(1)}
                className="px-3 text-xs font-bold text-brand-400 min-w-[5ch] flex justify-center hover:bg-surface-800 rounded py-1.5 transition-colors"
              >
                {(userZoom * 100).toFixed(0)}%
              </button>
              <button
                onClick={() =>
                  setUserZoom((z) => Math.min(2.5, z + 0.2))
                }
                className="p-1.5 hover:bg-surface-800 rounded text-surface-400 hover:text-white transition-colors"
              >
                <ZoomIn size={16} />
              </button>
            </div>
          </div>

          {/* Outer Centering Flex Container */}
          <div className="flex justify-center w-full flex-shrink-0">
            <div
              className="relative"
              style={{
                width: `${794 * finalScale}px`,
                height: `${previewHeight * finalScale}px`,
              }}
            >
              <div
                className="absolute top-0 left-0 bg-white text-black shadow-[0_0_50px_rgba(0,0,0,0.5)] rounded-sm print:shadow-none print:border-none print:rounded-none print:bg-transparent overflow-hidden"
                style={{
                  transform: `scale(${finalScale})`,
                  transformOrigin: "top left",
                  width: "794px",
                  minHeight: "1122px",
                }}
              >
                <div ref={printRef} className="w-full h-full">
                  <ResumePreview
                    data={displayData}
                    template={selectedTemplate}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="h-[40px] w-full shrink-0"></div>
        </div>
      </div>

      {/* --- MOBILE BOTTOM NAVIGATION DOCK --- */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 h-[64px] bg-surface-900/95 backdrop-blur-md border-t border-surface-800 flex justify-around items-center z-50 pb-safe shadow-[0_-10px_30px_-10px_rgba(0,0,0,0.6)]">
        <button
          onClick={() => setActiveTab("edit")}
          className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${
            activeTab === "edit"
              ? "text-brand-400 bg-surface-800/50"
              : "text-surface-400 hover:text-surface-200"
          }`}
        >
          <Edit3
            size={20}
            strokeWidth={activeTab === "edit" ? 2.5 : 2}
          />
          <span className="text-[10px] font-semibold">Form</span>
        </button>

        <button
          onClick={() => setActiveTab("layout")}
          className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${
            activeTab === "layout"
              ? "text-brand-400 bg-surface-800/50"
              : "text-surface-400 hover:text-surface-200"
          }`}
        >
          <LayoutTemplate
            size={20}
            strokeWidth={activeTab === "layout" ? 2.5 : 2}
          />
          <span className="text-[10px] font-semibold">Layout</span>
        </button>

        <button
          onClick={() => {
            setActiveTab("preview");
            setUserZoom(1);
          }}
          className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${
            activeTab === "preview"
              ? "text-brand-400 bg-surface-800/50"
              : "text-surface-400 hover:text-surface-200"
          }`}
        >
          <Eye
            size={20}
            strokeWidth={activeTab === "preview" ? 2.5 : 2}
          />
          <span className="text-[10px] font-semibold">Preview</span>
        </button>

        <button
          onClick={() => handlePrint()}
          className="flex flex-col items-center justify-center w-full h-full gap-1 text-surface-400 hover:text-brand-400 transition-colors"
        >
          <Download size={20} />
          <span className="text-[10px] font-semibold">PDF</span>
        </button>
      </div>
    </div>
  );
}
