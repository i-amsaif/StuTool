import { PDFDocument } from "pdf-lib";

/**
 * Parses a string like "1-3, 5, 8-10" into an array of unique standard page numbers (1-indexed).
 * Filters out negative numbers, zero, and strings.
 * @param input raw text string
 * @param maxPages total pages in the document (used to cap parsing overflow)
 * @returns Sorted array of valid page numbers
 */
export function parsePageSelection(input: string, maxPages: number): number[] {
  if (!input.trim()) return [];

  const pages = new Set<number>();
  const tokens = input.split(",").map(t => t.trim());

  for (const token of tokens) {
    if (!token) continue;

    if (token.includes("-")) {
      const parts = token.split("-");
      if (parts.length === 2) {
        let start = parseInt(parts[0], 10);
        let end = parseInt(parts[1], 10);

        if (!isNaN(start) && !isNaN(end) && start > 0 && end >= start) {
          if (start > maxPages) start = maxPages;
          if (end > maxPages) end = maxPages;
          for (let i = start; i <= end; i++) {
            pages.add(i);
          }
        }
      }
    } else {
      let num = parseInt(token, 10);
      if (!isNaN(num) && num > 0) {
        if (num > maxPages) num = maxPages;
        pages.add(num);
      }
    }
  }

  // Sort logically ascending
  return Array.from(pages).sort((a, b) => a - b);
}

/**
 * Extracts specified pages into a new PDF blob.
 * @param file The original PDF File object
 * @param pageNumbers Array of 1-indexed page numbers to extract
 * @returns Downloadable Blob of the new PDF
 */
export async function extractPagesPdf(file: File, pageNumbers: number[]): Promise<Blob> {
  const fileBuffer = await file.arrayBuffer();
  const sourcePdf = await PDFDocument.load(fileBuffer, { ignoreEncryption: true });

  const totalPages = sourcePdf.getPageCount();
  
  // Convert 1-indexed requested pages to 0-indexed indices for pdf-lib
  const validIndices = pageNumbers
    .filter(num => num >= 1 && num <= totalPages)
    .map(num => num - 1);

  if (validIndices.length === 0) {
    throw new Error("No valid pages selected for extraction.");
  }

  const newPdf = await PDFDocument.create();
  
  // Extract pages preserving order
  const copiedPages = await newPdf.copyPages(sourcePdf, validIndices);
  
  for (const copiedPage of copiedPages) {
    newPdf.addPage(copiedPage);
  }

  const pdfBytes = await newPdf.save();
  return new Blob([new Uint8Array(pdfBytes)], { type: "application/pdf" });
}
