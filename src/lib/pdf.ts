import * as PDFJS from 'pdfjs-dist';

PDFJS.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS.version}/pdf.worker.min.js`;

export async function extractTextFromPDF(file: File): Promise<string[]> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await PDFJS.getDocument({ data: arrayBuffer }).promise;
  const pages: string[] = [];

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items
      .map((item: any) => item.str)
      .join(' ')
      .trim();
    
    // Filter out headers and footers (basic heuristic)
    const lines = pageText.split('\n');
    const contentLines = lines.filter((line, index) => {
      const isHeader = index < 2 && line.length < 100;
      const isFooter = index > lines.length - 3 && line.length < 100;
      return !isHeader && !isFooter;
    });
    
    pages.push(contentLines.join('\n'));
  }

  return pages;
}