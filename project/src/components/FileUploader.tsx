import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, File } from 'lucide-react';
import { motion } from 'framer-motion';

interface FileUploaderProps {
  onFileAccepted: (file: File) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFileAccepted }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileAccepted(acceptedFiles[0]);
    }
  }, [onFileAccepted]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/plain': ['.txt'],
      'application/pdf': ['.pdf'],
      'image/*': ['.png', '.jpg', '.jpeg']
    },
    maxFiles: 1,
    multiple: false
  });

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="w-full"
    >
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragActive
            ? 'border-indigo-500 bg-indigo-50'
            : 'border-gray-300 hover:border-indigo-400'
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center space-y-4">
          {isDragActive ? (
            <>
              <Upload className="h-12 w-12 text-indigo-500" />
              <p className="text-lg text-indigo-600">Drop your file here...</p>
            </>
          ) : (
            <>
              <File className="h-12 w-12 text-gray-400" />
              <div>
                <p className="text-lg text-gray-600">
                  Drag & drop your file here, or{' '}
                  <span className="text-indigo-600 font-medium">browse</span>
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Supports TXT, PDF, PNG, and JPG files
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default FileUploader;