import { PDFDocument, PageSizes, degrees } from "pdf-lib";

export type PagesPerSheet = 2 | 4 | 6 | 8 | 9 | 16;
export type Orientation = "portrait" | "landscape";
export type Spacing = "none" | "small" | "medium";

export interface NUpConfig {
  pagesPerSheet: PagesPerSheet;
  orientation: Orientation;
  spacing: Spacing;
}

const SPACING_MAP = {
  none: 0,
  small: 10,
  medium: 20,
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
      return { cols: 2, rows: 2 }; // Default to 4
  }
}

export async function generateNUpPdf(fileBuffer: ArrayBuffer, config: NUpConfig): Promise<Uint8Array> {
  // Load original PDF
  const originalPdf = await PDFDocument.load(fileBuffer);
  const originalPages = originalPdf.getPages();
  const totalOriginalPages = originalPages.length;

  // Create new PDF
  const newPdf = await PDFDocument.create();

  // Figure out sheet dimensions
  // Standard A4 sizes (in points)
  let sheetWidth = PageSizes.A4[0];
  let sheetHeight = PageSizes.A4[1];

  if (config.orientation === "landscape") {
    // Swap width and height for landscape
    sheetWidth = PageSizes.A4[1];
    sheetHeight = PageSizes.A4[0];
  }

  // Determine grid
  const { cols, rows } = getGridDimensions(config.pagesPerSheet, config.orientation);
  const spacingPts = SPACING_MAP[config.spacing];

  // Cell dimensions
  const cellWidth = (sheetWidth - spacingPts * (cols + 1)) / cols;
  const cellHeight = (sheetHeight - spacingPts * (rows + 1)) / rows;

  let currentNewPage = newPdf.addPage([sheetWidth, sheetHeight]);
  let currentOriginalPageIndex = 0;

  // We loop until we placed all original pages
  while (currentOriginalPageIndex < totalOriginalPages) {
    // For each new sheet, fill the grid rows/cols
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (currentOriginalPageIndex >= totalOriginalPages) break;

        // X and Y coordinates on the sheet for the current cell
        const xPos = spacingPts + col * (cellWidth + spacingPts);
        // Y starts at the bottom in pdf-lib, so we calculate from top downwards
        const yPos = sheetHeight - (spacingPts + (row + 1) * cellHeight + row * spacingPts);

        // Embed the original page
        const [embeddedPage] = await newPdf.embedPdf(fileBuffer, [currentOriginalPageIndex]);
        
        // Calculate scaling to perfectly fit inside the cell without morphing
        const originalWidth = embeddedPage.width;
        const originalHeight = embeddedPage.height;
        
        const scaleX = cellWidth / originalWidth;
        const scaleY = cellHeight / originalHeight;
        
        // Use the smaller scale to maintain aspect ratio
        const scale = Math.min(scaleX, scaleY);
        
        const scaledWidth = originalWidth * scale;
        const scaledHeight = originalHeight * scale;

        // Center the scaled page within its grid cell
        const xOffset = xPos + (cellWidth - scaledWidth) / 2;
        const yOffset = yPos + (cellHeight - scaledHeight) / 2;

        currentNewPage.drawPage(embeddedPage, {
          x: xOffset,
          y: yOffset,
          width: scaledWidth,
          height: scaledHeight,
        });

        currentOriginalPageIndex++;
      }
    }

    // Add a new sheet if there are still pages left
    if (currentOriginalPageIndex < totalOriginalPages) {
      currentNewPage = newPdf.addPage([sheetWidth, sheetHeight]);
    }
  }

  return await newPdf.save();
}
