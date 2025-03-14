import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { FileUp, Loader, X } from 'lucide-react';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';

// Initialize PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

interface PDFImportProps {
  isOpen: boolean;
  onClose: () => void;
  onExtract: (cards: Array<{ front: string; back: string }>) => void;
}

const PDFImport: React.FC<PDFImportProps> = ({ isOpen, onClose, onExtract }) => {
  const [file, setFile] = useState<File | null>(null);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractionProgress, setExtractionProgress] = useState(0);

  if (!isOpen) return null;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFile(file);
    }
  };

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const handleExtract = async () => {
    if (!file) return;

    setIsExtracting(true);
    setExtractionProgress(0);

    try {
      // Simulate AI extraction process
      const totalSteps = 3;
      
      // Step 1: PDF text extraction
      setExtractionProgress(33);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Step 2: AI processing
      setExtractionProgress(66);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Step 3: Flashcard generation
      setExtractionProgress(100);
      await new Promise(resolve => setTimeout(resolve, 500));

      // Example extracted cards (replace with actual AI extraction)
      const extractedCards = [
        {
          front: "What is the main topic of the PDF?",
          back: "Sample extracted content 1"
        },
        {
          front: "Key concept from page 1",
          back: "Sample extracted content 2"
        }
      ];

      onExtract(extractedCards);
      onClose();
    } catch (error) {
      console.error('Error extracting from PDF:', error);
    } finally {
      setIsExtracting(false);
      setExtractionProgress(0);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gradient-to-b from-gray-900 to-black rounded-2xl shadow-2xl w-full max-w-4xl border border-gray-800">
        <div className="flex justify-between items-center p-6 border-b border-gray-800">
          <h2 className="text-2xl font-semibold text-white">Import from PDF</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {!file ? (
            <div className="border-2 border-dashed border-gray-700 rounded-xl p-8 text-center">
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="hidden"
                id="pdf-upload"
              />
              <label
                htmlFor="pdf-upload"
                className="cursor-pointer flex flex-col items-center gap-4"
              >
                <FileUp className="w-12 h-12 text-purple-500" />
                <div>
                  <p className="text-lg font-medium text-white mb-2">
                    Upload your PDF
                  </p>
                  <p className="text-gray-400">
                    Click or drag and drop your file here
                  </p>
                </div>
              </label>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-gray-800 rounded-xl p-4">
                <p className="text-white mb-2">Selected file:</p>
                <p className="text-gray-400">{file.name}</p>
              </div>

              <div className="border border-gray-800 rounded-xl overflow-hidden">
                <Document
                  file={file}
                  onLoadSuccess={onDocumentLoadSuccess}
                  className="mx-auto"
                >
                  <Page
                    pageNumber={currentPage}
                    width={600}
                    className="mx-auto"
                  />
                </Document>
                {numPages && (
                  <div className="flex justify-between items-center p-4 border-t border-gray-800">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage <= 1}
                      className="text-gray-400 hover:text-white disabled:opacity-50 transition-colors"
                    >
                      Previous
                    </button>
                    <span className="text-gray-400">
                      Page {currentPage} of {numPages}
                    </span>
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, numPages))}
                      disabled={currentPage >= numPages}
                      className="text-gray-400 hover:text-white disabled:opacity-50 transition-colors"
                    >
                      Next
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-gray-800 flex justify-between items-center">
          <button
            onClick={() => {
              setFile(null);
              setNumPages(null);
              setCurrentPage(1);
            }}
            className="text-gray-400 hover:text-white transition-colors"
          >
            Clear
          </button>
          <div className="flex items-center gap-4">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleExtract}
              disabled={!file || isExtracting}
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg shadow-purple-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isExtracting ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Extracting ({extractionProgress}%)
                </>
              ) : (
                'Extract Flashcards'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PDFImport;