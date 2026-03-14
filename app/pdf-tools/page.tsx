"use client";

import { useState } from "react";
import Link from "next/link";
import MergePdfTool from "@/components/tools/MergePdfTool";
import ImageToPdfTool from "@/components/tools/ImageToPdfTool";

const tools = [
  {
    id: "merge-pdf",
    title: "Merge PDF",
    description: "Combine multiple PDF files into one single document.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="8" height="14" rx="1" />
        <rect x="14" y="3" width="8" height="14" rx="1" />
        <path d="M10 14h4" />
      </svg>
    ),
    gradient: "from-rose-500 to-pink-500",
    shadow: "shadow-rose-500/20",
    instructions: "Drag and drop two or more PDF files below. They will be merged in the order they appear.",
  },

  {
    id: "image-to-pdf",
    title: "Image to PDF",
    description: "Adjust orientation and margins. Convert your images to PDFs in seconds.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
    ),
    gradient: "from-blue-500 to-cyan-500",
    shadow: "shadow-blue-500/20",
    instructions: "Select JPG, PNG, or other image files to combine them into a single PDF document.",
  },
  {
    id: "pages-per-sheet",
    title: "Pages per Sheet",
    description: "Print multiple pages on a single sheet of paper to save resources.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <line x1="12" y1="3" x2="12" y2="21" />
        <line x1="3" y1="12" x2="21" y2="12" />
      </svg>
    ),
    gradient: "from-emerald-500 to-teal-500",
    shadow: "shadow-emerald-500/20",
    instructions: "Upload a PDF document to condense multiple pages onto a single sheet.",
  },
];

export default function PdfToolsPage() {
  const [activeToolId, setActiveToolId] = useState<string | null>(null);

  const activeTool = tools.find((t) => t.id === activeToolId);

  return (
    <div className="flex flex-col items-center">
      {/* Header */}
      <section className="w-full flex flex-col items-center pt-20 pb-16 px-4 sm:px-6">
        <h1 className="animate-fade-in opacity-0 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
          <span className="text-gradient">PDF</span> Tools
        </h1>
        <p className="animate-fade-in opacity-0 animate-delay-100 mt-4 text-center text-lg text-slate-400 max-w-xl">
          Select a tool below to quickly edit, merge, or convert your PDF files directly in your browser.
        </p>
      </section>

      {/* Tools Grid */}
      <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 mb-8" id="pdf-tools-grid">
        <div className="grid sm:grid-cols-2 gap-6">
          {tools.map((tool, i) => {
            const isActive = activeToolId === tool.id;
            return (
              <button
                key={tool.id}
                onClick={() => setActiveToolId(tool.id)}
                className={`glass-card rounded-2xl p-8 text-left group transition-all duration-300 ${
                  isActive
                    ? `ring-2 ring-offset-2 ring-offset-[#0f172a] ring-sky-500 bg-white/[0.08]`
                    : "hover:bg-white/[0.06] hover:-translate-y-1"
                }`}
                style={!isActive ? { animation: `slide-up 0.5s ease-out ${(i + 2) * 100}ms forwards`, opacity: 0 } : {}}
              >
                <div className="flex items-start gap-5">
                  <div
                    className={`shrink-0 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${tool.gradient} ${tool.shadow} shadow-lg text-white transition-transform duration-300 group-hover:scale-110`}
                  >
                    {tool.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {tool.title}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      {tool.description}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Active Tool Panel */}
      {activeTool && (
        <section className="w-full max-w-4xl mx-auto px-4 sm:px-6 pb-24 animate-slide-up" id="active-tool-panel">
          <div className="glass-card rounded-3xl p-8 sm:p-10 border border-white/[0.1] shadow-2xl relative overflow-hidden">
            
            {/* Subtle background glow based on active tool */}
            <div className={`absolute -top-32 -right-32 w-64 h-64 rounded-full bg-gradient-to-br ${activeTool.gradient} blur-[100px] opacity-20 pointer-events-none`} />

            <div className="relative z-10 flex flex-col gap-6">
              {/* Panel Header */}
              <div className="flex items-center gap-4 border-b border-white/10 pb-6">
                <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${activeTool.gradient} shadow-lg text-white`}>
                  {activeTool.icon}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{activeTool.title}</h2>
                  <p className="text-sm text-slate-300 mt-1">{activeTool.instructions}</p>
                </div>
              </div>

              {/* Dynamic Tool Component */}
              {activeTool.id === "merge-pdf" ? (
                <MergePdfTool />
              ) : activeTool.id === "image-to-pdf" ? (
                <ImageToPdfTool />
              ) : (
                <>
                  {/* Static Placeholder for other tools */}
                  <div className="mt-4 border-2 border-dashed border-slate-600 hover:border-brand-400 rounded-2xl p-12 text-center transition-colors duration-300 bg-slate-900/50 flex flex-col items-center justify-center group cursor-pointer">
                    <div className="h-16 w-16 rounded-full bg-slate-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 group-hover:text-brand-400 transition-colors">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="17 8 12 3 7 8" />
                        <line x1="12" y1="3" x2="12" y2="15" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">Drag and drop files here</h3>
                    <p className="text-sm text-slate-400">or click to browse your files</p>
                  </div>

                  {/* Action Buttons Placeholder */}
                  <div className="mt-4 flex flex-col sm:flex-row justify-end gap-4">
                    <button className="btn-secondary gap-2" disabled>
                       <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                      Download Output
                    </button>
                    <button className="btn-primary gap-2">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Process Files
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
