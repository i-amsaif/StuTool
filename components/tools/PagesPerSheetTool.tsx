"use client";

import { useState, useEffect } from "react";
import { PDFDocument } from "pdf-lib";
import FileUploader, { PdfFile } from "@/components/ui/FileUploader";
import { generateNUpPdf, PagesPerSheet, Orientation, Spacing } from "@/lib/pdfNUp";

export default function PagesPerSheetTool() {
  const [files, setFiles] = useState<PdfFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [convertedPdfUrl, setConvertedPdfUrl] = useState<string | null>(null);
  const [pageCount, setPageCount] = useState<number | null>(null);

  // Form Controls
  const [pagesPerSheet, setPagesPerSheet] = useState<PagesPerSheet>(4);
  const [orientation, setOrientation] = useState<Orientation>("portrait");
  const [spacing, setSpacing] = useState<Spacing>("small");

  useEffect(() => {
    if (files.length > 0) {
      extractPageCount(files[0].file);
    } else {
      setPageCount(null);
    }
  }, [files]);

  const extractPageCount = async (file: File) => {
    try {
      const buffer = await file.arrayBuffer();
      const pdf = await PDFDocument.load(buffer, { ignoreEncryption: true });
      setPageCount(pdf.getPageCount());
    } catch (e) {
      console.error("Could not read PDF for page count", e);
    }
  };

  const handleFilesChange = (newFiles: PdfFile[]) => {
    setFiles(newFiles);
    setConvertedPdfUrl(null);
  };

  const handleGenerate = async () => {
    if (files.length === 0) return;
    setIsProcessing(true);

    try {
      const fileBuffer = await files[0].file.arrayBuffer();
      
      const newPdfBytes = await generateNUpPdf(fileBuffer, {
        pagesPerSheet,
        orientation,
        spacing,
      });

      const blob = new Blob([new Uint8Array(newPdfBytes)], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setConvertedPdfUrl(url);
    } catch (error) {
      console.error("Error generating N-Up PDF:", error);
      alert("An error occurred while generating the PDF. Ensure it is a valid, unencrypted PDF file.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <FileUploader
        files={files}
        onFilesChange={handleFilesChange}
        accept="application/pdf"
        multiple={false}
        maxFiles={1}
        title="Select or drop a PDF here"
        description="Upload a single PDF file to place multiple pages onto a single sheet."
        iconColor="group-hover:text-emerald-400 group-hover:bg-emerald-500/10"
      />

      {files.length > 0 && (
        <div className="bg-slate-900/30 rounded-2xl p-6 sm:p-8 border border-white/[0.05] animate-fade-in">
          
          <div className="mb-6 pb-6 border-b border-white/10 flex items-center justify-between">
             <div>
               <h3 className="text-lg font-semibold text-white">Document Settings</h3>
               <p className="text-sm text-slate-400">Configure how the pages will be arranged on the sheet.</p>
             </div>
             {pageCount && (
               <div className="bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-xs font-semibold ring-1 ring-emerald-500/20">
                 {pageCount} Page{pageCount !== 1 && "s"} Total
               </div>
             )}
          </div>

          <div className="grid sm:grid-cols-2 gap-8">
            {/* Pages Per Sheet */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-slate-300">Pages per Sheet</label>
              <div className="grid grid-cols-3 gap-2">
                {[2, 4, 6, 8, 9, 16].map((num) => (
                  <button
                    key={num}
                    onClick={() => setPagesPerSheet(num as PagesPerSheet)}
                    className={`py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 border ${
                      pagesPerSheet === num
                        ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.1)]"
                        : "bg-slate-800/50 border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-200"
                    }`}
                  >
                    {num} Pages
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              {/* Orientation */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-slate-300">Sheet Orientation</label>
                <div className="flex bg-slate-800/50 rounded-lg p-1 border border-slate-700">
                  {(["portrait", "landscape"] as const).map((o) => (
                    <button
                      key={o}
                      onClick={() => setOrientation(o)}
                      className={`flex-1 py-1.5 px-3 rounded-md text-sm font-medium transition-all capitalize ${
                        orientation === o
                          ? "bg-slate-700 text-white shadow-sm"
                          : "text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      {o}
                    </button>
                  ))}
                </div>
              </div>

              {/* Spacing */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-slate-300">Inner Spacing</label>
                <div className="flex bg-slate-800/50 rounded-lg p-1 border border-slate-700">
                  {(["none", "small", "medium"] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => setSpacing(s)}
                      className={`flex-1 py-1.5 px-3 rounded-md text-sm font-medium transition-all capitalize ${
                        spacing === s
                          ? "bg-slate-700 text-white shadow-sm"
                          : "text-slate-400 hover:text-slate-200"
                      }`}
                    >
                       {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-end gap-4 mt-2">
        {convertedPdfUrl ? (
          <a
            href={convertedPdfUrl}
            download="multipage-sheet.pdf"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-medium text-white transition-all duration-300 bg-emerald-500 hover:bg-emerald-400 shadow-[0_4px_15px_rgba(16,185,129,0.3)] hover:shadow-[0_6px_25px_rgba(16,185,129,0.45)] hover:-translate-y-0.5"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download PDF
          </a>
        ) : (
          <button
            onClick={handleGenerate}
            disabled={files.length === 0 || isProcessing}
            className={`inline-flex items-center justify-center px-6 py-3 rounded-xl font-medium text-white transition-all duration-300 ${
              files.length === 0 || isProcessing
                ? "bg-slate-700 cursor-not-allowed text-slate-400"
                : "bg-gradient-to-r from-emerald-500 to-teal-500 hover:-translate-y-0.5 shadow-[0_4px_15px_rgba(16,185,129,0.3)] hover:shadow-[0_6px_25px_rgba(16,185,129,0.45)]"
            }`}
          >
            {isProcessing ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              <>
                 <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
                Generate PDF
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
