"use client";

import { useState } from "react";
import FileUploader, { PdfFile } from "@/components/ui/FileUploader";
import { generatePagesPerSheetPdf, PagesPerSheet, SheetSize, Orientation, Direction, InnerMargin } from "@/lib/pagesPerSheet";

export default function PagesPerSheetTool() {
  const [files, setFiles] = useState<PdfFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [convertedPdfUrl, setConvertedPdfUrl] = useState<string | null>(null);

  // Layout Controls
  const [pagesPerSheet, setPagesPerSheet] = useState<PagesPerSheet>(4);
  const [sheetSize, setSheetSize] = useState<SheetSize>("a4");
  const [orientation, setOrientation] = useState<Orientation>("portrait");
  const [direction, setDirection] = useState<Direction>("row");
  
  // Margins & Border
  const [innerMargin, setInnerMargin] = useState<InnerMargin>("small");
  const [marginTop, setMarginTop] = useState(20);
  const [marginRight, setMarginRight] = useState(20);
  const [marginBottom, setMarginBottom] = useState(20);
  const [marginLeft, setMarginLeft] = useState(20);
  const [showBorder, setShowBorder] = useState(true);

  const handleFilesChange = (newFiles: PdfFile[]) => {
    setFiles(newFiles);
    setConvertedPdfUrl(null);
  };

  const handleGenerate = async () => {
    if (files.length === 0) return;
    setIsProcessing(true);

    try {
      const rawFiles = files.map(f => f.file);
      
      const blob = await generatePagesPerSheetPdf(rawFiles, {
        pagesPerSheet,
        sheetSize,
        orientation,
        direction,
        margins: { top: marginTop, right: marginRight, bottom: marginBottom, left: marginLeft },
        innerMargin,
        showBorder,
      });

      const url = URL.createObjectURL(blob);
      setConvertedPdfUrl(url);
    } catch (error) {
      console.error("Error generating Pages per Sheet PDF:", error);
      alert("An error occurred while generating the PDF. Ensure files are valid and unencrypted.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <FileUploader
        files={files}
        onFilesChange={handleFilesChange}
        accept="application/pdf, image/png, image/jpeg, image/jpg"
        multiple={true}
        title="Select or drop PDFs & Images here"
        description="Upload files to arrange multiple pages perfectly onto a single sheet."
        iconColor="group-hover:text-brand-400 group-hover:bg-brand-500/10"
      />

      {files.length > 0 && (
        <div className="bg-surface-900/30 rounded-2xl p-6 sm:p-8 border border-white/[0.05] animate-fade-in flex flex-col gap-8">
          
          <div className="pb-6 border-b border-white/10 flex items-center justify-between">
             <div>
               <h3 className="text-lg font-semibold text-white">Document Settings</h3>
               <p className="text-sm text-surface-200">Configure how the pages will be arranged on the sheet.</p>
             </div>
             <div className="bg-brand-500/10 text-brand-400 px-3 py-1 rounded-full text-xs font-semibold ring-1 ring-brand-500/20">
               {files.length} File{files.length !== 1 && "s"} Selected
             </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Grid Assignment Settings */}
            <div className="space-y-6">
              <h4 className="text-sm font-semibold text-brand-400 uppercase tracking-wider">Layout</h4>
              
              <div className="space-y-3">
                <label className="text-sm font-medium text-surface-200">Pages per Sheet</label>
                <div className="grid grid-cols-3 gap-2">
                  {[2, 4, 6, 8, 9, 16].map((num) => (
                    <button
                      key={num}
                      onClick={() => setPagesPerSheet(num as PagesPerSheet)}
                      className={`py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 border ${
                        pagesPerSheet === num
                          ? "bg-brand-500/20 border-brand-500/50 text-brand-300 shadow-[0_0_15px_rgba(233,3,2,0.1)]"
                          : "bg-surface-800/50 border-surface-700 text-surface-200 hover:border-surface-200/30 hover:text-surface-50"
                      }`}
                    >
                      {num} Pages
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <label className="text-sm font-medium text-surface-200">Sheet Size</label>
                  <select
                    value={sheetSize}
                    onChange={(e) => setSheetSize(e.target.value as SheetSize)}
                    className="w-full bg-surface-800 border border-surface-700 text-surface-200 text-sm rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-brand-500/50 transition-all cursor-pointer appearance-none"
                    style={{ backgroundImage: `url('data:image/svg+xml;utf8,<svg fill="none" stroke="%23C6C5C5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>')`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1.2em' }}
                  >
                    <option value="a4">A4 (210 × 297 mm)</option>
                    <option value="letter">US Letter (8.5 × 11 in)</option>
                  </select>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium text-surface-200">Sheet Orientation</label>
                  <div className="flex bg-surface-800/50 rounded-lg p-1 border border-surface-700 h-10">
                    {(["portrait", "landscape"] as const).map((o) => (
                      <button
                        key={o}
                        onClick={() => setOrientation(o)}
                        className={`flex-1 rounded-md text-sm font-medium transition-all capitalize ${
                          orientation === o
                            ? "bg-surface-700 text-white shadow-sm"
                            : "text-surface-200 hover:text-surface-50"
                        }`}
                      >
                        {o}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Formatting & Style */}
            <div className="space-y-6">
              <h4 className="text-sm font-semibold text-brand-400 uppercase tracking-wider">Spacing & Order</h4>

              <div className="space-y-3">
                <label className="text-sm font-medium text-surface-200">Reading Direction</label>
                <div className="flex bg-surface-800/50 rounded-lg p-1 border border-surface-700">
                  <button
                    onClick={() => setDirection("row")}
                    className={`flex-1 py-1.5 px-3 rounded-md text-sm font-medium transition-all ${
                      direction === "row" ? "bg-surface-700 text-white shadow-sm" : "text-surface-200 hover:text-surface-50"
                    }`}
                  >
                    Row by Row
                  </button>
                  <button
                    onClick={() => setDirection("col")}
                    className={`flex-1 py-1.5 px-3 rounded-md text-sm font-medium transition-all ${
                      direction === "col" ? "bg-surface-700 text-white shadow-sm" : "text-surface-200 hover:text-surface-50"
                    }`}
                  >
                    Column by Column
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-3">
                  <label className="text-sm font-medium text-surface-200">Outer Margins (pts)</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input type="number" min="0" max="100" value={marginTop} onChange={(e) => setMarginTop(Number(e.target.value))} placeholder="Top" className="bg-surface-800 border-none text-surface-200 rounded-md px-2 py-1 text-xs text-center focus:ring-1 focus:ring-brand-500 outline-none" title="Top" />
                    <input type="number" min="0" max="100" value={marginBottom} onChange={(e) => setMarginBottom(Number(e.target.value))} placeholder="Bottom" className="bg-surface-800 border-none text-surface-200 rounded-md px-2 py-1 text-xs text-center focus:ring-1 focus:ring-brand-500 outline-none" title="Bottom" />
                    <input type="number" min="0" max="100" value={marginLeft} onChange={(e) => setMarginLeft(Number(e.target.value))} placeholder="Left" className="bg-surface-800 border-none text-surface-200 rounded-md px-2 py-1 text-xs text-center focus:ring-1 focus:ring-brand-500 outline-none" title="Left" />
                    <input type="number" min="0" max="100" value={marginRight} onChange={(e) => setMarginRight(Number(e.target.value))} placeholder="Right" className="bg-surface-800 border-none text-surface-200 rounded-md px-2 py-1 text-xs text-center focus:ring-1 focus:ring-brand-500 outline-none" title="Right" />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium text-surface-200">Inner Spacing</label>
                  <div className="flex bg-surface-800/50 rounded-lg p-1 border border-surface-700 flex-col gap-1 h-[68px]">
                    <div className="flex w-full h-full gap-1">
                      {(["small", "medium", "large"] as const).map((s) => (
                        <button
                          key={s}
                          onClick={() => setInnerMargin(s)}
                          className={`flex-1 rounded-md text-xs font-medium transition-all capitalize ${
                            innerMargin === s
                              ? "bg-surface-700 text-white shadow-sm"
                              : "text-surface-200 hover:text-surface-50"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Show Border Toggle */}
              <div className="pt-2">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center">
                    <input
                      type="checkbox"
                      checked={showBorder}
                      onChange={(e) => setShowBorder(e.target.checked)}
                      className="sr-only"
                    />
                    <div className={`w-11 h-6 bg-surface-700 rounded-full transition-colors duration-300 ${showBorder ? "bg-brand-500" : ""}`}></div>
                    <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 ${showBorder ? "translate-x-5" : "translate-x-0"}`}></div>
                  </div>
                  <span className="text-sm font-medium text-surface-200 group-hover:text-surface-50 transition-colors">
                    Draw border around pages
                  </span>
                </label>
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
            download="pages-per-sheet.pdf"
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
                ? "bg-surface-700 cursor-not-allowed text-surface-200"
                : "bg-gradient-to-r from-brand-500 to-rose-600 hover:-translate-y-0.5 shadow-[0_4px_15px_rgba(233,3,2,0.3)] hover:shadow-[0_6px_25px_rgba(233,3,2,0.45)]"
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
