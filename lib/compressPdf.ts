import { PDFDocument } from "pdf-lib";
import * as pdfjsLib from "pdfjs-dist";

// Next.js requires setting the workerSrc for pdf.js to function correctly on the client
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export type CompressionLevel = "low" | "medium" | "high";

const QUALITY_MAP: Record<CompressionLevel, number> = {
  low: 0.9,    // Better Quality
  medium: 0.7, // Balanced
  high: 0.5,   // Smaller Size
};

// Scaling the canvas resolution up before drawing to prevent horrible pixelation, 
// then compressing the payload sizes down.
const SCALE_MAP: Record<CompressionLevel, number> = {
  low: 2.0,
  medium: 1.5,
  high: 1.0, 
};

/**
 * Compresses a PDF by rendering its pages to a Canvas, converting to JPEG, 
 * and reconstructing a new PDF.
 */
export async function compressPdf(file: File, level: CompressionLevel): Promise<Blob> {
  const fileArrayBuffer = await file.arrayBuffer();
  
  // Load using pdf.js to render
  const pdf = await pdfjsLib.getDocument({ data: fileArrayBuffer }).promise;
  const numPages = pdf.numPages;

  const newPdf = await PDFDocument.create();
  const quality = QUALITY_MAP[level];
  const scale = SCALE_MAP[level];

  for (let i = 1; i <= numPages; i++) {
    const page = await pdf.getPage(i);
    const viewport = page.getViewport({ scale });

    // Create a canvas for rendering
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Could not create canvas context");

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    // Render the page to the canvas
    const renderContext = {
      canvasContext: context,
      viewport: viewport,
    };
    await page.render(renderContext).promise;

    // Convert canvas to compressed JPEG
    const jpegDataUrl = canvas.toDataURL("image/jpeg", quality);

    // Embed the JPEG into the new pdf-lib document
    const jpegImage = await newPdf.embedJpg(jpegDataUrl);
    
    // Size the new page to perfectly match the original document's aspect ratio
    const originalViewport = page.getViewport({ scale: 1.0 });
    const newPage = newPdf.addPage([originalViewport.width, originalViewport.height]);
    
    newPage.drawImage(jpegImage, {
      x: 0,
      y: 0,
      width: originalViewport.width,
      height: originalViewport.height,
    });
  }

  const pdfBytes = await newPdf.save();
  return new Blob([new Uint8Array(pdfBytes)], { type: "application/pdf" });
}
