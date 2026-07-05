"use client";

import { useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import FileUploader, { PdfFile } from "@/components/ui/FileUploader";

// Next.js requires setting the workerSrc for pdf.js to function correctly on the client
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

interface PageImage {
  pageNumber: number;
  dataUrl: string;
}

export default function PdfToImageTool() {
  const [files, setFiles] = useState<PdfFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [images, setImages] = useState<PageImage[]>([]);
  const [imageFormat, setImageFormat] = useState<"image/jpeg" | "image/png">("image/jpeg");

  const handleFilesChange = (newFiles: PdfFile[]) => {
    setFiles(newFiles);
    setImages([]);
  };

  const extractImages = async () => {
    if (files.length === 0) return;
    setIsProcessing(true);
    setImages([]);

    try {
      const file = files[0].file;
      const fileArrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: fileArrayBuffer }).promise;
      const numPages = pdf.numPages;

      const extractedImages: PageImage[] = [];

      for (let i = 1; i <= numPages; i++) {
        const page = await pdf.getPage(i);
        // Increase scale for better image quality
        const viewport = page.getViewport({ scale: 2.0 });

        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        if (!context) throw new Error("Could not create canvas context");

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({
          canvasContext: context,
          viewport: viewport,
        }).promise;

        const dataUrl = canvas.toDataURL(imageFormat, 1.0);
        extractedImages.push({
          pageNumber: i,
          dataUrl,
        });
      }

      setImages(extractedImages);
    } catch (error) {
      console.error("Error extracting images:", error);
      alert("An error occurred while converting the PDF to images.");
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadAll = async () => {
    if (images.length === 0) return;
    const zip = new JSZip();
    const extension = imageFormat === "image/jpeg" ? "jpg" : "png";

    images.forEach((img) => {
      // dataUrl looks like "data:image/jpeg;base64,..."
      const base64Data = img.dataUrl.split(",")[1];
      zip.file(`page-${img.pageNumber}.${extension}`, base64Data, { base64: true });
    });

    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, "extracted-images.zip");
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
        description="Upload a single PDF file to convert its pages into images."
        iconColor="group-hover:text-brand-400 group-hover:bg-brand-500/10"
      />

      {files.length > 0 && images.length === 0 && (
        <div className="bg-surface-900/30 rounded-2xl p-6 sm:p-8 border border-white/[0.05] animate-fade-in flex flex-col gap-6">
          <div className="pb-6 border-b border-white/10 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white">Conversion Settings</h3>
              <p className="text-sm text-surface-200">Choose the output image format.</p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <label className="text-sm font-medium text-surface-200">
              Image Format
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="format"
                  value="image/jpeg"
                  checked={imageFormat === "image/jpeg"}
                  onChange={() => setImageFormat("image/jpeg")}
                  className="w-4 h-4 text-brand-500 bg-surface-800 border-surface-700 focus:ring-brand-500/50"
                />
                <span className="text-surface-50">JPEG (Smaller file size)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="format"
                  value="image/png"
                  checked={imageFormat === "image/png"}
                  onChange={() => setImageFormat("image/png")}
                  className="w-4 h-4 text-brand-500 bg-surface-800 border-surface-700 focus:ring-brand-500/50"
                />
                <span className="text-surface-50">PNG (Higher quality, transparent background)</span>
              </label>
            </div>
          </div>
        </div>
      )}

      {images.length > 0 && (
        <div className="bg-surface-900/30 rounded-2xl p-6 sm:p-8 border border-white/[0.05] animate-fade-in flex flex-col gap-6">
          <div className="pb-6 border-b border-white/10 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white">Extracted Images</h3>
              <p className="text-sm text-surface-200">{images.length} pages converted successfully.</p>
            </div>
            <button
              onClick={downloadAll}
              className="inline-flex items-center justify-center px-4 py-2 rounded-xl font-medium text-white bg-emerald-500 hover:bg-emerald-400 transition-all shadow-[0_4px_15px_rgba(16,185,129,0.3)] hover:-translate-y-0.5"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download All (ZIP)
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
            {images.map((img) => (
              <div key={img.pageNumber} className="relative group bg-surface-800 rounded-xl overflow-hidden border border-surface-700 aspect-[1/1.4] flex flex-col items-center">
                <img src={img.dataUrl} alt={`Page ${img.pageNumber}`} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <a
                    href={img.dataUrl}
                    download={`page-${img.pageNumber}.${imageFormat === "image/jpeg" ? "jpg" : "png"}`}
                    className="p-2 bg-white/20 hover:bg-white/30 rounded-full text-white backdrop-blur-sm transition-colors"
                    title={`Download Page ${img.pageNumber}`}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                  </a>
                </div>
                <div className="absolute bottom-2 left-2 bg-black/80 px-2 py-1 rounded-md text-xs font-medium text-white">
                  Page {img.pageNumber}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      {!images.length && (
        <div className="flex justify-end gap-4 mt-2">
          <button
            onClick={extractImages}
            disabled={files.length === 0 || isProcessing}
            className={`inline-flex items-center justify-center px-6 py-3 rounded-xl font-medium text-white transition-all duration-300 ${
              files.length === 0 || isProcessing
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
                Converting...
              </>
            ) : (
              <>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
                Convert to Images
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
