import { PDFDocument } from "pdf-lib";

export type Orientation = "portrait" | "landscape";
export type PageSize = "a4" | "letter";
export type Margin = "none" | "small" | "large";

export interface PdfOptions {
  orientation: Orientation;
  pageSize: PageSize;
  margin: Margin;
  merge: boolean;
}

const PAGE_SIZES = {
  a4: { width: 595.28, height: 841.89 },
  letter: { width: 612.28, height: 790.87 },
};

const MARGINS = {
  none: 0,
  small: 20,
  large: 40,
};

export async function generatePdf(files: File[], options: PdfOptions): Promise<Blob[]> {
  const { orientation, pageSize, margin, merge } = options;
  
  const baseSize = PAGE_SIZES[pageSize];
  let pageWidth = baseSize.width;
  let pageHeight = baseSize.height;

  if (orientation === "landscape") {
    pageWidth = baseSize.height;
    pageHeight = baseSize.width;
  }

  const marginPts = MARGINS[margin];
  const availableWidth = pageWidth - marginPts * 2;
  const availableHeight = pageHeight - marginPts * 2;

  if (merge) {
    const pdfDoc = await PDFDocument.create();
    await addImagesToPdf(pdfDoc, files, pageWidth, pageHeight, availableWidth, availableHeight, marginPts);
    const pdfBytes = await pdfDoc.save();
    return [new Blob([new Uint8Array(pdfBytes)], { type: "application/pdf" })];
  } else {
    const blobs: Blob[] = [];
    for (const file of files) {
      const pdfDoc = await PDFDocument.create();
      await addImagesToPdf(pdfDoc, [file], pageWidth, pageHeight, availableWidth, availableHeight, marginPts);
      const pdfBytes = await pdfDoc.save();
      blobs.push(new Blob([new Uint8Array(pdfBytes)], { type: "application/pdf" }));
    }
    return blobs;
  }
}

async function addImagesToPdf(
  pdfDoc: PDFDocument, 
  files: File[], 
  pageWidth: number, 
  pageHeight: number, 
  availableWidth: number, 
  availableHeight: number, 
  marginPts: number
) {
  for (const file of files) {
    const fileBuffer = await file.arrayBuffer();
    const imgType = file.type;
    let image;

    if (imgType === "image/jpeg" || imgType === "image/jpg") {
      image = await pdfDoc.embedJpg(fileBuffer);
    } else if (imgType === "image/png") {
      image = await pdfDoc.embedPng(fileBuffer);
    } else {
      throw new Error(`Unsupported image format for file: ${file.name}`);
    }

    const imgDims = image.scale(1);
    
    // Calculate scaling factor to fit within available space without stretching
    const scaleX = availableWidth / imgDims.width;
    const scaleY = availableHeight / imgDims.height;
    const scale = Math.min(scaleX, scaleY); 

    const finalWidth = imgDims.width * scale;
    const finalHeight = imgDims.height * scale;

    // Center the image
    const x = marginPts + (availableWidth - finalWidth) / 2;
    const y = marginPts + (availableHeight - finalHeight) / 2;

    const page = pdfDoc.addPage([pageWidth, pageHeight]);
    
    page.drawImage(image, {
      x,
      y,
      width: finalWidth,
      height: finalHeight,
    });
  }
}
