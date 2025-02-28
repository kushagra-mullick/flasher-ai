import * as PDFJS from 'pdfjs-dist';

// Set the worker source path correctly
const pdfjsVersion = '4.0.379'; // Use a specific version that we know exists
PDFJS.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsVersion}/build/pdf.worker.min.js`;

export async function extractTextFromPDF(file: File): Promise<string[]> {
  try {
    // Convert the file to an ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    
    // Load the PDF document
    const loadingTask = PDFJS.getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;
    
    console.log(`PDF loaded successfully with ${pdf.numPages} pages`);
    
    const pages: string[] = [];

    // Process each page
    for (let i = 1; i <= pdf.numPages; i++) {
      try {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        
        // Extract text from the page
        const pageText = textContent.items
          .map((item: any) => item.str)
          .join(' ')
          .trim();
        
        // Add non-empty pages to the result
        if (pageText.length > 0) {
          pages.push(pageText);
        }
      } catch (pageError) {
        console.error(`Error extracting text from page ${i}:`, pageError);
        // Continue with other pages even if one fails
        pages.push(`[Error extracting text from page ${i}]`);
      }
    }

    // If no text was extracted from any page, throw an error
    if (pages.length === 0) {
      throw new Error('No text could be extracted from the PDF. The document might be empty, scanned, or protected.');
    }

    return pages;
  } catch (error) {
    console.error('Error extracting text from PDF:', error);
    
    // Provide a more specific error message based on the error type
    if (error instanceof TypeError) {
      throw new Error('Invalid PDF format. Please ensure you are uploading a valid PDF file.');
    } else if (error.message && error.message.includes('password')) {
      throw new Error('This PDF is password-protected. Please upload an unprotected PDF.');
    } else if (error.message && error.message.includes('corrupt')) {
      throw new Error('The PDF file appears to be corrupted. Please try a different file.');
    } else {
      throw new Error('Failed to process PDF. Please try a different file or check if the file is not corrupted or password-protected.');
    }
  }
}