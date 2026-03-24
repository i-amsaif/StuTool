"use client";

import { useState, useEffect } from "react";
import { PDFDocument } from "pdf-lib";
import FileUploader, { PdfFile } from "@/components/ui/FileUploader";
import { extractPagesPdf, parsePageSelection } from "@/lib/extractPages";

export default function ExtractPagesTool() {
  const [files, setFiles] = useState<PdfFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [convertedPdfUrl, setConvertedPdfUrl] = useState<string | null>(null);
  
  const [pageCount, setPageCount] = useState<number | null>(null);
  const [pageInput, setPageInput] = useState("");
  const [selectedPages, setSelectedPages] = useState<number[]>([]);
  
  useEffect(() => {
    if (files.length > 0) {
      extractPageCount(files[0].file);
    } else {
      setPageCount(null);
      setPageInput("");
      setSelectedPages([]);
    }
  }, [files]);

  useEffect(() => {
    if (pageCount) {
      setSelectedPages(parsePageSelection(pageInput, pageCount));
    }
  }, [pageInput, pageCount]);

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

  const handleExtract = async () => {
    if (files.length === 0 || selectedPages.length === 0) return;
    setIsProcessing(true);

    try {
      const blob = await extractPagesPdf(files[0].file, selectedPages);
      const url = URL.createObjectURL(blob);
      setConvertedPdfUrl(url);
    } catch (error) {
      console.error("Error extracting pages:", error);
      alert("An error occurred while extracting pages. Ensure the PDF is not encrypted.");
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
        description="Upload a single PDF file to extract specific pages."
        iconColor="group-hover:text-brand-400 group-hover:bg-brand-500/10"
      />

      {files.length > 0 && pageCount !== null && (
        <div className="bg-surface-900/30 rounded-2xl p-6 sm:p-8 border border-white/[0.05] animate-fade-in flex flex-col gap-6">
          <div className="pb-6 border-b border-white/10 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white">Select Pages</h3>
              <p className="text-sm text-surface-200">Enter page numbers or ranges you wish to extract.</p>
            </div>
            <div className="bg-brand-500/10 text-brand-400 px-3 py-1 rounded-full text-xs font-semibold ring-1 ring-brand-500/20">
              {pageCount} Page{pageCount !== 1 && "s"} Total
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <label className="text-sm font-medium text-surface-200">
              Page Selection (e.g., 1-5, 8, 11-13)
            </label>
            <input 
              type="text" 
              value={pageInput}
              onChange={(e) => setPageInput(e.target.value)}
              placeholder={`e.g. 1-${Math.min(5, pageCount)}`} 
              className="bg-surface-800 border border-surface-700 text-surface-50 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all placeholder-surface-200/50"
            />
            
            {/* Chips Display */}
            <div className="mt-2 min-h-[40px]">
              {selectedPages.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {selectedPages.map(num => (
                    <span key={num} className="bg-surface-800 border border-surface-700 text-surface-200 px-3 py-1 rounded-lg text-sm font-medium shadow-sm">
                      Page {num}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-surface-200/50 italic">No valid pages selected yet. Please enter a valid range or number.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-end gap-4 mt-2">
        {convertedPdfUrl ? (
          <a
            href={convertedPdfUrl}
            download="extracted-pages.pdf"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-medium text-white transition-all duration-300 bg-emerald-500 hover:bg-emerald-400 shadow-[0_4px_15px_rgba(16,185,129,0.3)] hover:shadow-[0_6px_25px_rgba(16,185,129,0.45)] hover:-translate-y-0.5"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download Extracted PDF
          </a>
        ) : (
          <button
            onClick={handleExtract}
            disabled={files.length === 0 || selectedPages.length === 0 || isProcessing}
            className={`inline-flex items-center justify-center px-6 py-3 rounded-xl font-medium text-white transition-all duration-300 ${
              files.length === 0 || selectedPages.length === 0 || isProcessing
                ? "bg-surface-700 cursor-not-allowed text-surface-200"
                : "bg-gradient-to-r from-red-800 to-brand-500 hover:-translate-y-0.5 shadow-[0_4px_15px_rgba(233,3,2,0.3)] hover:shadow-[0_6px_25px_rgba(233,3,2,0.45)]"
            }`}
          >
            {isProcessing ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Extracting...
              </>
            ) : (
              <>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
                Extract {selectedPages.length > 0 ? selectedPages.length : ""} Page{selectedPages.length !== 1 ? "s" : ""}
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
