import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FileText, Upload, Loader } from 'lucide-react';
import { motion } from 'framer-motion';
import { extractTextFromPDF } from '../lib/pdf';

interface PDFUploaderProps {
  onTextExtracted: (pages: string[]) => void;
  onError: (error: string) => void;
}

export const PDFUploader: React.FC<PDFUploaderProps> = ({ onTextExtracted, onError }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const onDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setIsProcessing(true);
    try {
      const pages = await extractTextFromPDF(file);
      onTextExtracted(pages);
    } catch (error) {
      onError('Error processing PDF. Please try again.');
      console.error('PDF processing error:', error);
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
              </div>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};