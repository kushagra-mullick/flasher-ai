import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FileText, Upload, Loader, AlertCircle, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { extractTextFromPDF } from '../lib/pdf';

interface PDFUploaderProps {
  onTextExtracted: (pages: string[]) => void;
  onError: (error: string) => void;
}

export const PDFUploader: React.FC<PDFUploaderProps> = ({ onTextExtracted, onError }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadInfo, setUploadInfo] = useState<string | null>(null);

  const onDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    // Check file size (limit to 10MB)
    if (file.size > 10 * 1024 * 1024) {
      const errorMessage = 'File is too large. Maximum size is 10MB.';
      setUploadError(errorMessage);
      onError(errorMessage);
      return;
    }

    setIsProcessing(true);
    setUploadError(null);
    setUploadInfo(`Processing ${file.name}...`);
    
    try {
      const pages = await extractTextFromPDF(file);
      if (pages.length === 0) {
        throw new Error('No text could be extracted from the PDF.');
      }
      
      setUploadInfo(null);
      onTextExtracted(pages);
    } catch (error) {
      console.error('PDF processing error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Error processing PDF. Please try a different file.';
      setUploadError(errorMessage);
      onError(errorMessage);
      setUploadInfo(null);
    } finally {
      setIsProcessing(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    maxFiles: 1,
    multiple: false
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
          isDragActive
            ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/10'
            : 'border-gray-300 dark:border-gray-700 hover:border-indigo-400 dark:hover:border-indigo-600'
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center space-y-4">
          {isProcessing ? (
            <>
              <Loader className="h-12 w-12 text-indigo-500 animate-spin" />
              <p className="text-lg text-indigo-600 dark:text-indigo-400">
                Processing your PDF...
              </p>
            </>
          ) : isDragActive ? (
            <>
              <Upload className="h-12 w-12 text-indigo-500" />
              <p className="text-lg text-indigo-600 dark:text-indigo-400">
                Drop your PDF here...
              </p>
            </>
          ) : (
            <>
              <FileText className="h-12 w-12 text-gray-400 dark:text-gray-600" />
              <div>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Drag & drop your PDF here, or{' '}
                  <span className="text-indigo-600 dark:text-indigo-400 font-medium">
                    browse
                  </span>
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Maximum file size: 10MB
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Supported: Text-based PDFs (not scanned documents)
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {uploadInfo && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/10 text-blue-600 dark:text-blue-400 rounded-lg flex items-center"
        >
          <Info className="w-5 h-5 mr-2" />
          {uploadInfo}
        </motion.div>
      )}

      {uploadError && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 rounded-lg flex items-center"
        >
          <AlertCircle className="w-5 h-5 mr-2" />
          {uploadError}
        </motion.div>
      )}

      <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/10 text-amber-700 dark:text-amber-400 rounded-lg">
        <h3 className="font-medium flex items-center">
          <Info className="w-5 h-5 mr-2" />
          PDF Processing Tips
        </h3>
        <ul className="mt-2 list-disc list-inside text-sm space-y-1">
          <li>Only text-based PDFs are supported (not scanned documents)</li>
          <li>Make sure your PDF is not password-protected</li>
          <li>If you're having issues, try a different PDF file</li>
          <li>For scanned documents, use OCR software first to convert to text</li>
        </ul>
      </div>
    </motion.div>
  );
};