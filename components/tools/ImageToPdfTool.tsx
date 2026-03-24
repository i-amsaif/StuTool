"use client";

import { useState } from "react";
import FileUploader, { PdfFile } from "@/components/ui/FileUploader";
import { generatePdf, Orientation, PageSize, Margin } from "@/lib/imageToPdf";

export default function ImageToPdfTool() {
  const [files, setFiles] = useState<PdfFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [convertedPdfUrls, setConvertedPdfUrls] = useState<{url: string, name: string}[] | null>(null);

  // New states
  const [orientation, setOrientation] = useState<Orientation>("portrait");
  const [pageSize, setPageSize] = useState<PageSize>("a4");
  const [margin, setMargin] = useState<Margin>("none");
  const [merge, setMerge] = useState(true);

  const handleFilesChange = (newFiles: PdfFile[]) => {
    setFiles(newFiles);
    setConvertedPdfUrls(null); // Reset output if files change
  };

  const handleConvert = async () => {
    if (files.length === 0) return;
    setIsProcessing(true);

    try {
      const rawFiles = files.map(f => f.file);
      const blobs = await generatePdf(rawFiles, { orientation, pageSize, margin, merge });
      
      const urls = blobs.map((blob, index) => {
        const url = URL.createObjectURL(blob);
        const name = merge ? "images-to-pdf.pdf" : `converted-image-${index + 1}.pdf`;
        return { url, name };
      });
      
      setConvertedPdfUrls(urls);
    } catch (error) {
      console.error("Error converting images to PDF:", error);
      alert("An error occurred while converting the images. Ensure they are valid JPG or PNG files.");
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadAll = () => {
    if (!convertedPdfUrls) return;
    convertedPdfUrls.forEach((item, index) => {
      // Small timeout to allow multiple downloads within browser restrictions
      setTimeout(() => {
        const a = document.createElement("a");
        a.href = item.url;
        a.download = item.name;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }, index * 200);
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <FileUploader
        files={files}
        onFilesChange={handleFilesChange}
        accept="image/png, image/jpeg, image/jpg"
        multiple={true}
        title="Select or drop images here"
        description="Add JPG or PNG files to convert them to a PDF."
        iconColor="group-hover:text-brand-400 group-hover:bg-brand-500/10"
      />

      {/* Configuration Options */}
      <div className="bg-surface-800/50 border border-surface-700/50 p-6 rounded-2xl flex flex-col gap-6">
        <h3 className="text-lg font-medium text-white flex items-center gap-2">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-400">
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
          </svg>
          PDF Settings
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Orientation */}
          <div className="flex flex-col gap-3">
            <label className="text-sm font-medium text-surface-200">Page Orientation</label>
            <div className="flex gap-3">
              {(["portrait", "landscape"] as const).map((opt) => (
                <button
                  key={opt}
                  onClick={() => setOrientation(opt)}
                  className={`flex-1 py-2 px-4 rounded-xl text-sm font-medium transition-all duration-200 border ${
                    orientation === opt
                      ? "bg-brand-500/20 border-brand-500/50 text-brand-400"
                      : "bg-surface-800 border-surface-700 text-surface-200 hover:bg-surface-700 hover:text-surface-50"
                  }`}
                >
                  {opt.charAt(0).toUpperCase() + opt.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Page Size */}
          <div className="flex flex-col gap-3">
            <label className="text-sm font-medium text-surface-200">Page Size</label>
            <select
              value={pageSize}
              onChange={(e) => setPageSize(e.target.value as PageSize)}
              className="w-full bg-surface-800 border border-surface-700 text-surface-200 text-sm rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500/50 transition-all cursor-pointer appearance-none"
              style={{ backgroundImage: `url('data:image/svg+xml;utf8,<svg fill="none" stroke="%23C6C5C5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>')`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1.2em' }}
            >
              <option value="a4">A4 (210 × 297 mm)</option>
              <option value="letter">US Letter (8.5 × 11 in)</option>
            </select>
          </div>

          {/* Margin */}
          <div className="flex flex-col gap-3">
            <label className="text-sm font-medium text-surface-200">Margin</label>
            <div className="flex gap-2">
              {(["none", "small", "large"] as const).map((opt) => (
                <button
                  key={opt}
                  onClick={() => setMargin(opt)}
                  className={`flex-1 py-2 px-3 rounded-xl text-sm font-medium transition-all duration-200 border ${
                    margin === opt
                      ? "bg-brand-500/20 border-brand-500/50 text-brand-400"
                      : "bg-surface-800 border-surface-700 text-surface-200 hover:bg-surface-700 hover:text-surface-50"
                  }`}
                >
                  {opt.charAt(0).toUpperCase() + opt.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Merge Toggle */}
          <div className="flex flex-col justify-end pb-1">
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative flex items-center justify-center">
                <input
                  type="checkbox"
                  checked={merge}
                  onChange={(e) => setMerge(e.target.checked)}
                  className="sr-only"
                />
                <div className={`w-11 h-6 bg-surface-700 rounded-full transition-colors duration-300 ${merge ? "bg-brand-500" : ""}`}></div>
                <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 ${merge ? "translate-x-5" : "translate-x-0"}`}></div>
              </div>
              <span className="text-sm font-medium text-surface-200 group-hover:text-surface-50 transition-colors">
                Merge all images into one PDF file
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-end gap-4 mt-2">
        {convertedPdfUrls ? (
          <button
            onClick={downloadAll}
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-medium text-white transition-all duration-300 bg-emerald-500 hover:bg-emerald-400 shadow-[0_4px_15px_rgba(16,185,129,0.3)] hover:shadow-[0_6px_25px_rgba(16,185,129,0.45)] hover:-translate-y-0.5"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download {convertedPdfUrls.length > 1 ? `All Outputs (${convertedPdfUrls.length})` : "Converted PDF"}
          </button>
        ) : (
          <button
            onClick={handleConvert}
            disabled={files.length === 0 || isProcessing}
            className={`inline-flex items-center justify-center px-6 py-3 rounded-xl font-medium text-white transition-all duration-300 ${
              files.length === 0 || isProcessing
                ? "bg-surface-700 cursor-not-allowed text-surface-200"
                : "bg-gradient-to-r from-red-600 to-brand-500 hover:-translate-y-0.5 shadow-[0_4px_15px_rgba(233,3,2,0.3)] hover:shadow-[0_6px_25px_rgba(233,3,2,0.45)]"
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
                Convert {files.length > 0 ? files.length : ""} Image{files.length > 1 ? "s" : ""} to PDF
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
