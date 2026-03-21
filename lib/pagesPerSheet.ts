import { PDFDocument, rgb } from "pdf-lib";

export type PagesPerSheet = 2 | 4 | 6 | 8 | 9 | 16;
export type SheetSize = "a4" | "letter";
export type Orientation = "portrait" | "landscape";
export type Direction = "row" | "col";
export type InnerMargin = "small" | "medium" | "large";

export interface Margins {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface NUpConfig {
  pagesPerSheet: PagesPerSheet;
  sheetSize: SheetSize;
  orientation: Orientation;
  direction: Direction;
  margins: Margins;
  innerMargin: InnerMargin;
  showBorder: boolean;
}

const INNER_MARGIN_MAP = {
  small: 10,
  medium: 20,
  large: 30,
};

const PAGE_SIZES = {
  a4: { width: 595.28, height: 841.89 },
  letter: { width: 612.28, height: 790.87 },
};

function getGridDimensions(pagesPerSheet: PagesPerSheet, orientation: Orientation) {
  switch (pagesPerSheet) {
    case 2:
      return orientation === "portrait" ? { cols: 1, rows: 2 } : { cols: 2, rows: 1 };
    case 4:
      return { cols: 2, rows: 2 };
    case 6:
      return orientation === "portrait" ? { cols: 2, rows: 3 } : { cols: 3, rows: 2 };
    case 8:
      return orientation === "portrait" ? { cols: 2, rows: 4 } : { cols: 4, rows: 2 };
    case 9:
      return { cols: 3, rows: 3 };
    case 16:
      return { cols: 4, rows: 4 };
    default:
      return { cols: 2, rows: 2 };
  }
}

export async function generatePagesPerSheetPdf(files: File[], config: NUpConfig): Promise<Blob> {
  const newPdf = await PDFDocument.create();

  // Determine Sheet Dimensions
  const baseSize = PAGE_SIZES[config.sheetSize];
  let sheetWidth = baseSize.width;
  let sheetHeight = baseSize.height;

  if (config.orientation === "landscape") {
    sheetWidth = baseSize.height;
    sheetHeight = baseSize.width;
  }

  // Determine Grid
  const { cols, rows } = getGridDimensions(config.pagesPerSheet, config.orientation);
  const innerSpacingPts = INNER_MARGIN_MAP[config.innerMargin];
  const { top: mt, right: mr, bottom: mb, left: ml } = config.margins;

  // Calculate Cell Dimensions
  const availableWidth = sheetWidth - ml - mr - innerSpacingPts * (cols - 1);
  const availableHeight = sheetHeight - mt - mb - innerSpacingPts * (rows - 1);
  
  const cellWidth = availableWidth / cols;
  const cellHeight = availableHeight / rows;

  const embeddedPages: any[] = [];
  
  for (const file of files) {
    const buffer = await file.arrayBuffer();
    const mime = file.type;

    if (mime === "application/pdf") {
      const srcPdf = await PDFDocument.load(buffer, { ignoreEncryption: true });
      const indices = srcPdf.getPages().map((_, i) => i);
      const copiedPages = await newPdf.embedPdf(srcPdf, indices);
      embeddedPages.push(...copiedPages);
    } else if (mime === "image/jpeg" || mime === "image/jpg") {
      const img = await newPdf.embedJpg(buffer);
      embeddedPages.push(img);
    } else if (mime === "image/png") {
      const img = await newPdf.embedPng(buffer);
      embeddedPages.push(img);
    } else {
      console.warn(`Unsupported file type: ${mime}`);
    }
  }

  const totalPages = embeddedPages.length;
  let currentPageIndex = 0;
  
  while (currentPageIndex < totalPages) {
    const currentNewPage = newPdf.addPage([sheetWidth, sheetHeight]);

    // Fill grid based on direction
    for (let i = 0; i < cols * rows; i++) {
        if (currentPageIndex >= totalPages) break;

        let col, row;
        if (config.direction === "row") {
            row = Math.floor(i / cols);
            col = i % cols;
        } else {
            col = Math.floor(i / rows);
            row = i % rows;
        }

        // Calculate Position (Y goes bottom up in PDF-lib, so we invert it based on top margin)
        const xPos = ml + col * (cellWidth + innerSpacingPts);
        const yPos = sheetHeight - mt - (row + 1) * cellHeight - row * innerSpacingPts;

        const embeddedElement = embeddedPages[currentPageIndex];
        
        let originalWidth = embeddedElement.width;
        let originalHeight = embeddedElement.height;
        
        // Images have scale(1) method to get width/height, embedded PDFs have width/height directly
        if (typeof embeddedElement.scale === 'function') {
            const dims = embeddedElement.scale(1);
            originalWidth = dims.width;
            originalHeight = dims.height;
        }

        const scaleX = cellWidth / originalWidth;
        const scaleY = cellHeight / originalHeight;
        const scale = Math.min(scaleX, scaleY);
        
        const finalWidth = originalWidth * scale;
        const finalHeight = originalHeight * scale;

        const xOffset = xPos + (cellWidth - finalWidth) / 2;
        const yOffset = yPos + (cellHeight - finalHeight) / 2;

        if (embeddedElement.constructor.name.includes("PDFEmbeddedPage")) {
            currentNewPage.drawPage(embeddedElement as any, {
                x: xOffset,
                y: yOffset,
                width: finalWidth,
                height: finalHeight,
            });
        } else {
            currentNewPage.drawImage(embeddedElement as any, {
                x: xOffset,
                y: yOffset,
                width: finalWidth,
                height: finalHeight,
            });
        }

        // Draw Border
        if (config.showBorder) {
            currentNewPage.drawRectangle({
                x: xPos,
                y: yPos,
                width: cellWidth,
                height: cellHeight,
                borderWidth: 0.5,
                borderColor: rgb(0,0,0),
            });
        }

        currentPageIndex++;
    }
  }

  const pdfBytes = await newPdf.save();
  return new Blob([new Uint8Array(pdfBytes)], { type: "application/pdf" });
}
