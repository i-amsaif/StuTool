"use client";

import { useState } from "react";
import FileUploader, { PdfFile } from "@/components/ui/FileUploader";
import { compressPdf, CompressionLevel } from "@/lib/compressPdf";

function formatBytes(bytes: number, decimals = 2) {
  if (!+bytes) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

const COMPRESSION_TIERS = [
  {
    level: "low" as CompressionLevel,
    title: "Low Compression",
    desc: "High visual quality, smaller file size reduction.",
  },
  {
    level: "medium" as CompressionLevel,
    title: "Medium Compression",
    desc: "Good quality, balanced file size reduction.",
  },
  {
    level: "high" as CompressionLevel,
    title: "High Compression",
    desc: "Lower quality, maximum file size reduction.",
  },
];

export default function CompressPdfTool() {
  const [files, setFiles] = useState<PdfFile[]>([]);
  const [compressionLevel, setCompressionLevel] = useState<CompressionLevel>("medium");
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [compressedPdfUrl, setCompressedPdfUrl] = useState<string | null>(null);
  const [compressedSize, setCompressedSize] = useState<number | null>(null);

  const handleFilesChange = (newFiles: PdfFile[]) => {
    setFiles(newFiles);
    setCompressedPdfUrl(null);
    setCompressedSize(null);
  };

  const handleCompress = async () => {
    if (files.length === 0) return;
    setIsProcessing(true);

    try {
      const file = files[0].file;
      const blob = await compressPdf(file, compressionLevel);
      
      const url = URL.createObjectURL(blob);
      setCompressedPdfUrl(url);
      setCompressedSize(blob.size);
    } catch (error) {
      console.error("Error compressing PDF:", error);
      alert("An error occurred while compressing the PDF. Some encrypted or malformed files cannot be compressed locally.");
    } finally {
      setIsProcessing(false);
    }
  };

  const originalSize = files[0]?.file.size || 0;
  const savingsPercent = compressedSize ? Math.round((1 - (compressedSize / originalSize)) * 100) : 0;

  return (
    <div className="flex flex-col gap-8">
      <FileUploader
        files={files}
        onFilesChange={handleFilesChange}
        accept="application/pdf"
        multiple={false}
        maxFiles={1}
        title="Select or drop a PDF here"
        description="Upload a PDF to reduce its file size locally in your browser."
        iconColor="group-hover:text-brand-400 group-hover:bg-brand-500/10"
      />

      {files.length > 0 && (
        <div className="bg-surface-900/30 rounded-2xl p-6 sm:p-8 border border-white/[0.05] animate-fade-in flex flex-col gap-6">
          <div className="pb-6 border-b border-white/10 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white">Compression Settings</h3>
              <p className="text-sm text-brand-400/80 mt-1">Note: Compression reduces image quality to decrease file size.</p>
            </div>
            <div className="bg-surface-800 text-surface-200 px-3 py-1.5 rounded-lg text-sm font-semibold ring-1 ring-white/10">
              Original: {formatBytes(originalSize)}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {COMPRESSION_TIERS.map((tier) => (
              <button
                key={tier.level}
                onClick={() => setCompressionLevel(tier.level)}
                className={`flex flex-col text-left p-4 rounded-xl border transition-all duration-300 ${
                  compressionLevel === tier.level
                    ? "bg-brand-500/10 border-brand-500/50 shadow-[0_0_15px_rgba(233,3,2,0.1)]"
                    : "bg-surface-800/50 border-surface-700 hover:border-surface-200/30 hover:bg-surface-800"
                }`}
              >
                <div className="flex items-center justify-between mb-2 w-full">
                  <span className={`font-semibold ${compressionLevel === tier.level ? "text-brand-400" : "text-surface-50"}`}>
                    {tier.title}
                  </span>
                  <div className={`shrink-0 w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    compressionLevel === tier.level ? "border-brand-400" : "border-surface-200/50"
                  }`}>
                    {compressionLevel === tier.level && <div className="w-2 h-2 rounded-full bg-brand-400" />}
                  </div>
                </div>
                <p className="text-xs text-surface-200 leading-relaxed">{tier.desc}</p>
              </button>
            ))}
          </div>
          
          {compressedPdfUrl && compressedSize && (
            <div className="mt-2 flex items-center justify-center p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 animate-slide-up">
              <svg className="w-5 h-5 mr-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-center sm:text-left">
                 <span className="font-medium">Compression Complete!</span>
                 <span className="text-sm opacity-90 hidden sm:inline">•</span>
                 <span className="text-sm opacity-90">New size: <strong>{formatBytes(compressedSize)}</strong></span>
                 {savingsPercent > 0 && <span className="inline-flex mt-1 sm:mt-0 items-center justify-center text-xs font-bold bg-emerald-500/20 px-2 py-0.5 rounded sm:ml-2">-{savingsPercent}% smaller</span>}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-end gap-4 mt-2">
        {compressedPdfUrl ? (
          <a
            href={compressedPdfUrl}
            download="compressed.pdf"
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
            onClick={handleCompress}
            disabled={files.length === 0 || isProcessing}
            className={`inline-flex items-center justify-center px-6 py-3 rounded-xl font-medium text-white transition-all duration-300 ${
              files.length === 0 || isProcessing
                ? "bg-surface-700 cursor-not-allowed text-surface-200"
                : "bg-gradient-to-r from-brand-500 to-red-500 hover:-translate-y-0.5 shadow-[0_4px_15px_rgba(233,3,2,0.3)] hover:shadow-[0_6px_25px_rgba(233,3,2,0.45)]"
            }`}
          >
            {isProcessing ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Compressing...
              </>
            ) : (
              <>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
                Compress PDF
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
