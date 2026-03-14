"use client";

import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import FileUploader, { PdfFile } from "@/components/ui/FileUploader";

export default function ImageToPdfTool() {
  const [files, setFiles] = useState<PdfFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [convertedPdfUrl, setConvertedPdfUrl] = useState<string | null>(null);

  const handleFilesChange = (newFiles: PdfFile[]) => {
    setFiles(newFiles);
    setConvertedPdfUrl(null); // Reset output if files change
  };

  const handleConvert = async () => {
    if (files.length === 0) return;
    setIsProcessing(true);

    try {
      const pdfDoc = await PDFDocument.create();

      for (const item of files) {
        const fileBuffer = await item.file.arrayBuffer();
        const imgType = item.file.type;
        let image;

        if (imgType === "image/jpeg" || imgType === "image/jpg") {
          image = await pdfDoc.embedJpg(fileBuffer);
        } else if (imgType === "image/png") {
          image = await pdfDoc.embedPng(fileBuffer);
        } else {
          throw new Error("Unsupported image format. Please use JPG or PNG.");
        }

        const { width, height } = image.scale(1);
        const page = pdfDoc.addPage([width, height]);
        
        page.drawImage(image, {
          x: 0,
          y: 0,
          width,
          height,
        });
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setConvertedPdfUrl(url);
    } catch (error) {
      console.error("Error converting images to PDF:", error);
      alert("An error occurred while converting the images. Ensure they are valid JPG or PNG files.");
    } finally {
      setIsProcessing(false);
    }
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
        iconColor="group-hover:text-blue-400 group-hover:bg-blue-500/10"
      />

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-end gap-4 mt-2">
        {convertedPdfUrl ? (
          <a
            href={convertedPdfUrl}
            download="converted-document.pdf"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-medium text-white transition-all duration-300 bg-emerald-500 hover:bg-emerald-400 shadow-[0_4px_15px_rgba(16,185,129,0.3)] hover:shadow-[0_6px_25px_rgba(16,185,129,0.45)] hover:-translate-y-0.5"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download Converted PDF
          </a>
        ) : (
          <button
            onClick={handleConvert}
            disabled={files.length === 0 || isProcessing}
            className={`inline-flex items-center justify-center px-6 py-3 rounded-xl font-medium text-white transition-all duration-300 ${
              files.length === 0 || isProcessing
                ? "bg-slate-700 cursor-not-allowed text-slate-400"
                : "bg-gradient-to-r from-blue-500 to-cyan-500 hover:-translate-y-0.5 shadow-[0_4px_15px_rgba(59,130,246,0.3)] hover:shadow-[0_6px_25px_rgba(59,130,246,0.45)]"
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
