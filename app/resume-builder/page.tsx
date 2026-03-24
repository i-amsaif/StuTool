"use client";

import { useState, useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import lzString from "lz-string";
import { initialResumeData, ResumeData } from "@/lib/resumeSchema";
import { fresherResume, experiencedResume } from "@/lib/sampleData";
import ResumeForm from "@/components/resume/ResumeForm";
import ResumePreview from "@/components/resume/ResumePreview";
import { Download, FileJson, Share2, Upload, FileSignature, Edit3, Eye, LayoutTemplate } from "lucide-react";

export default function ResumeBuilderPage() {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const [selectedTemplate, setSelectedTemplate] = useState<string>("minimal");
  const [isMounted, setIsMounted] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"Saved" | "Saving..." | "">("");
  
  // Mobile Tab State
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");
  const [showMobileTemplates, setShowMobileTemplates] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [visibleSections, setVisibleSections] = useState({
    experience: true,
    education: true,
    projects: true,
    skills: true
  });

  const printRef = useRef<HTMLDivElement>(null);
  
  // @ts-ignore
  const handlePrint = useReactToPrint({
    contentRef: printRef,
    content: () => printRef.current,
    documentTitle: resumeData.personal.name ? `${resumeData.personal.name} - Resume` : "Resume",
  });

  useEffect(() => {
    setIsMounted(true);
    
    // 1. Check URL for shareable link
    const params = new URLSearchParams(window.location.search);
    const dataParam = params.get('data');
    if (dataParam) {
      try {
        const decompressed = lzString.decompressFromEncodedURIComponent(dataParam);
        if (decompressed) {
          const parsed = JSON.parse(decompressed);
          setResumeData(parsed);
          window.history.replaceState({}, document.title, window.location.pathname);
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
        setResumeData(JSON.parse(savedSettings));
      }
    } catch (error) {
      console.error("Failed to load resume data from local storage", error);
    }
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    setSaveStatus("Saving...");
    const handler = setTimeout(() => {
      try {
        localStorage.setItem("resumeBuilderData", JSON.stringify(resumeData));
        setSaveStatus("Saved");
        setTimeout(() => setSaveStatus(""), 2000);
      } catch (error) {
        console.error("Failed to save resume data", error);
      }
    }, 500);
    return () => clearTimeout(handler);
  }, [resumeData, isMounted]);

  const handleReset = () => {
    if (confirm("Are you sure you want to reset your resume? This action cannot be undone.")) {
      setResumeData(initialResumeData);
      localStorage.removeItem("resumeBuilderData");
    }
  };

  const loadSample = (type: "fresher" | "experienced") => {
    if (confirm(`Load ${type} sample? This will overwrite your current resume.`)) {
      setResumeData(type === "fresher" ? fresherResume : experiencedResume);
    }
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(resumeData, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `resume-data.json`;
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
        if (parsed && typeof parsed === "object" && "personal" in parsed && "education" in parsed) {
          if (confirm("Importing will overwrite your current resume. Continue?")) {
             setResumeData(parsed);
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
      const compressed = lzString.compressToEncodedURIComponent(JSON.stringify(resumeData));
      const url = `${window.location.origin}${window.location.pathname}?data=${compressed}`;
      await navigator.clipboard.writeText(url);
      alert("Shareable link copied to clipboard! You can send this link to anyone.");
    } catch (e) {
      alert("Failed to copy link. Data might be too large.");
    }
  };

  const updatePersonal = (field: keyof ResumeData["personal"], value: string) => {
    setResumeData((prev) => ({ ...prev, personal: { ...prev.personal, [field]: value } }));
  };

  const updateArrayItem = (section: "education" | "experience" | "projects", id: string, field: string, value: string) => {
    setResumeData((prev) => ({
      ...prev,
      // @ts-ignore
      [section]: prev[section].map((item: any) => item.id === id ? { ...item, [field]: value } : item),
    }));
  };

  const addArrayItem = (section: "education" | "experience" | "projects") => {
    const id = crypto.randomUUID();
    let newItem: any;
    if (section === "education") newItem = { id, school: "", degree: "", startDate: "", endDate: "", description: "" };
    else if (section === "experience") newItem = { id, company: "", position: "", startDate: "", endDate: "", description: "" };
    else newItem = { id, name: "", description: "", link: "" };
    // @ts-ignore
    setResumeData((prev) => ({ ...prev, [section]: [...prev[section], newItem] }));
  };

  const removeArrayItem = (section: "education" | "experience" | "projects", id: string) => {
    // @ts-ignore
    setResumeData((prev) => ({ ...prev, [section]: prev[section].filter((item) => item.id !== id) }));
  };

  const reorderArrayItem = (section: "education" | "experience" | "projects", oldIndex: number, newIndex: number) => {
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

  const toggleVisibility = (section: "experience" | "education" | "projects" | "skills") => {
    setVisibleSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // Filter data for preview
  const displayData: ResumeData = {
    ...resumeData,
    experience: visibleSections.experience ? resumeData.experience : [],
    education: visibleSections.education ? resumeData.education : [],
    projects: visibleSections.projects ? resumeData.projects : [],
    skills: visibleSections.skills ? resumeData.skills : [],
  };

  if (!isMounted) return null;

  return (
    <div className="flex flex-col min-h-[100dvh] bg-surface-950 text-white font-sans overflow-hidden">
      
      {/* --- DESKTOP GLOBAL STICKY HEADER --- */}
      <header className="hidden md:flex sticky top-0 z-50 bg-surface-900/95 backdrop-blur-md border-b border-surface-800 px-6 py-3 justify-between items-center shadow-lg">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold bg-gradient-to-r from-brand-400 to-brand-600 bg-clip-text text-transparent flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-brand-500"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
            Resume Builder
          </h1>
          <div className="flex items-center gap-2 ml-4">
            <button onClick={handleShare} className="flex items-center gap-1.5 text-xs font-medium bg-surface-800 hover:bg-surface-700 text-surface-200 hover:text-white px-2.5 py-1.5 rounded transition-colors"><Share2 size={14}/> Share Link</button>
            <button onClick={handleExport} className="flex items-center gap-1.5 text-xs font-medium bg-surface-800 hover:bg-surface-700 text-surface-200 hover:text-white px-2.5 py-1.5 rounded transition-colors"><FileJson size={14}/> Export</button>
            <button onClick={() => fileInputRef.current?.click()} className="flex items-center gap-1.5 text-xs font-medium bg-surface-800 hover:bg-surface-700 text-surface-200 hover:text-white px-2.5 py-1.5 rounded transition-colors"><Upload size={14}/> Import</button>
            <input type="file" ref={fileInputRef} onChange={handleImport} accept=".json" className="hidden" />
          </div>
          <div className="flex items-center gap-2 ml-2 relative group">
             <button className="flex items-center gap-1.5 text-xs font-medium bg-brand-500/10 hover:bg-brand-500/20 text-brand-300 border border-brand-500/20 px-2.5 py-1.5 rounded transition-colors"><FileSignature size={14}/> Load Sample ▼</button>
             <div className="absolute top-8 left-0 hidden group-hover:flex flex-col bg-surface-800 border border-surface-700 shadow-xl rounded py-1 min-w-[140px] z-50">
               <button onClick={() => loadSample("fresher")} className="text-left px-4 py-2 text-xs hover:bg-surface-700 transition">Fresher</button>
               <button onClick={() => loadSample("experienced")} className="text-left px-4 py-2 text-xs hover:bg-surface-700 transition">Experienced</button>
             </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-xs font-medium text-surface-400 min-w-[60px] text-right mr-2">{saveStatus}</div>
          <div className="flex items-center gap-2 mr-2">
            <label className="text-sm font-medium text-surface-300">Template:</label>
            <select value={selectedTemplate} onChange={(e) => setSelectedTemplate(e.target.value)} className="bg-surface-800 border border-surface-700/50 rounded-lg px-3 py-1.5 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-brand-500/50 cursor-pointer transition-all hover:bg-surface-700">
              <option value="minimal">Minimal</option>
              <option value="modern">Modern</option>
              <option value="classic">Classic</option>
            </select>
          </div>
          <button onClick={handleReset} className="text-sm font-medium text-surface-300 hover:text-red-400 transition-colors px-3 py-1.5 rounded-lg border border-transparent hover:border-red-500/30 hover:bg-red-500/10">Reset</button>
          <button onClick={() => handlePrint()} className="px-4 py-1.5 bg-brand-600 hover:bg-brand-500 text-white text-sm font-medium rounded-lg shadow-lg shadow-brand-500/20 transition-all flex items-center gap-2 active:scale-95"><Download size={16} /> Export PDF</button>
        </div>
      </header>

      {/* --- MOBILE COMPACT HEADER --- */}
      <header className="md:hidden sticky top-0 z-50 bg-surface-900/95 backdrop-blur-md border-b border-surface-800 px-4 py-3 flex justify-between items-center shadow-sm">
        <h1 className="text-lg font-bold bg-gradient-to-r from-brand-400 to-brand-600 bg-clip-text text-transparent">Resume Builder</h1>
        <div className="flex items-center gap-3">
          {saveStatus && <div className="text-[10px] font-bold uppercase tracking-widest text-brand-400 bg-brand-500/10 px-2 py-0.5 rounded-full">{saveStatus}</div>}
          <button onClick={handleReset} className="text-xs font-medium text-red-400">Reset</button>
        </div>
      </header>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="flex flex-col md:flex-row h-[calc(100dvh-53px)] md:h-[calc(100vh-61px)] pb-[64px] md:pb-0 relative">
        
        {/* LEFT: FORM */}
        <div className={`w-full md:w-[45%] lg:w-[40%] bg-surface-900 border-b md:border-b-0 md:border-r border-surface-800 h-full overflow-y-auto custom-scrollbar ${activeTab === 'edit' ? 'block' : 'hidden md:block'}`}>
          <ResumeForm
            data={resumeData}
            updatePersonal={updatePersonal}
            updateArrayItem={updateArrayItem}
            addArrayItem={addArrayItem}
            removeArrayItem={removeArrayItem}
            reorderArrayItem={reorderArrayItem}
            updateSkills={updateSkills}
            visibleSections={visibleSections}
            toggleVisibility={toggleVisibility}
          />
        </div>

        {/* RIGHT: PREVIEW */}
        <div className={`w-full md:w-[55%] lg:w-[60%] h-full overflow-y-auto bg-surface-950 p-0 sm:p-4 md:p-8 flex-col items-center custom-scrollbar ${activeTab === 'preview' ? 'flex' : 'hidden md:flex'}`}>
          <div className="w-full h-full flex justify-center py-4 overflow-visible transform scale-[0.4] sm:scale-[0.55] md:scale-[0.7] lg:scale-[0.9] xl:scale-100 origin-top transition-transform duration-300">
            <ResumePreview ref={printRef} data={displayData} template={selectedTemplate} />
          </div>
        </div>

      </div>

      {/* --- MOBILE BOTTOM NAVIGATION DOCK --- */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 h-[64px] bg-surface-900/95 backdrop-blur-md border-t border-surface-800 flex justify-around items-center z-50 pb-safe">
        
        <button onClick={() => setActiveTab('edit')} className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${activeTab === 'edit' ? 'text-brand-400 bg-surface-800/50' : 'text-surface-400 hover:text-surface-200'}`}>
          <Edit3 size={20} strokeWidth={activeTab === 'edit' ? 2.5 : 2} />
          <span className="text-[10px] font-semibold">Form</span>
        </button>

        <button onClick={() => setActiveTab('preview')} className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${activeTab === 'preview' ? 'text-brand-400 bg-surface-800/50' : 'text-surface-400 hover:text-surface-200'}`}>
          <Eye size={20} strokeWidth={activeTab === 'preview' ? 2.5 : 2} />
          <span className="text-[10px] font-semibold">Preview</span>
        </button>
        
        <div className="relative flex flex-col items-center justify-center w-full h-full">
          <button onClick={() => setShowMobileTemplates(!showMobileTemplates)} className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${showMobileTemplates ? 'text-brand-400 bg-surface-800/50' : 'text-surface-400'}`}>
            <LayoutTemplate size={20} />
            <span className="text-[10px] font-semibold">Layout</span>
          </button>
          
          {showMobileTemplates && (
            <>
              <div className="fixed inset-0 z-40 bg-black/40" onClick={() => setShowMobileTemplates(false)}></div>
              <div className="absolute bottom-[72px] left-1/2 -translate-x-1/2 mb-2 bg-surface-800 border border-surface-700/80 rounded-xl shadow-2xl p-2 flex flex-col gap-1.5 w-[160px] z-50 animate-in fade-in slide-in-from-bottom-4 duration-200">
                <div className="text-[10px] font-bold text-surface-400 px-2 py-1 uppercase tracking-wider">Choose Theme</div>
                {['minimal', 'modern', 'classic'].map(t => (
                  <button key={t} onClick={() => { setSelectedTemplate(t); setShowMobileTemplates(false); }} className={`px-4 py-2.5 text-left text-sm rounded-lg capitalize font-medium transition-colors ${selectedTemplate === t ? 'bg-brand-500 text-white' : 'hover:bg-surface-700 text-surface-200'}`}>
                    {t}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        <button onClick={() => handlePrint()} className="flex flex-col items-center justify-center w-full h-full gap-1 text-surface-400 hover:text-brand-400 transition-colors">
          <Download size={20} />
          <span className="text-[10px] font-semibold">PDF</span>
        </button>

      </div>
      
    </div>
  );
}
