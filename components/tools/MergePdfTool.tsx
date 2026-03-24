"use client";

import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import FileUploader, { PdfFile } from "@/components/ui/FileUploader";

export default function MergePdfTool() {
  const [files, setFiles] = useState<PdfFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [mergedPdfUrl, setMergedPdfUrl] = useState<string | null>(null);

  const handleFilesChange = (newFiles: PdfFile[]) => {
    setFiles(newFiles);
    setMergedPdfUrl(null); // Reset output if files change
  };

  const handleMerge = async () => {
    if (files.length < 2) return;
    setIsProcessing(true);

    try {
      const mergedPdf = await PDFDocument.create();

      for (const item of files) {
        const fileBuffer = await item.file.arrayBuffer();
        const pdfDoc = await PDFDocument.load(fileBuffer);
        const copiedPages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      const pdfBytes = await mergedPdf.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setMergedPdfUrl(url);
    } catch (error) {
      console.error("Error merging PDFs:", error);
      alert("An error occurred while merging the PDFs. Ensure they are valid PDF files.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <FileUploader
        files={files}
        onFilesChange={handleFilesChange}
        accept="application/pdf"
        multiple={true}
        title="Select or drop PDFs here"
        description="Add two or more files to merge them."
        iconColor="group-hover:text-brand-400 group-hover:bg-brand-500/10"
      />

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-end gap-4 mt-2">
        {mergedPdfUrl ? (
          <a
            href={mergedPdfUrl}
            download="merged-document.pdf"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-medium text-white transition-all duration-300 bg-emerald-500 hover:bg-emerald-400 shadow-[0_4px_15px_rgba(16,185,129,0.3)] hover:shadow-[0_6px_25px_rgba(16,185,129,0.45)] hover:-translate-y-0.5"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download Merged PDF
          </a>
        ) : (
          <button
            onClick={handleMerge}
            disabled={files.length < 2 || isProcessing}
            className={`inline-flex items-center justify-center px-6 py-3 rounded-xl font-medium text-white transition-all duration-300 ${
              files.length < 2 || isProcessing
                ? "bg-surface-700 cursor-not-allowed text-surface-200"
                : "bg-gradient-to-r from-brand-500 to-red-700 hover:-translate-y-0.5 shadow-[0_4px_15px_rgba(233,3,2,0.3)] hover:shadow-[0_6px_25px_rgba(233,3,2,0.45)]"
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
                  <rect x="2" y="7" width="8" height="14" rx="1" />
                  <rect x="14" y="3" width="8" height="14" rx="1" />
                  <path d="M10 14h4" />
                </svg>
                Merge {files.length > 0 ? files.length : ""} PDFs
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
