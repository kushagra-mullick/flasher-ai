import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

interface TextSelectorProps {
  pages: string[];
  onSelect: (selectedTexts: string[]) => void;
  onClose: () => void;
}

export const TextSelector: React.FC<TextSelectorProps> = ({ pages, onSelect, onClose }) => {
  const [selectedPages, setSelectedPages] = useState<number[]>([]);

  const togglePage = (index: number) => {
    setSelectedPages(prev => 
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const handleConfirm = () => {
    const selectedTexts = selectedPages.map(index => pages[index]);
    onSelect(selectedTexts);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-4xl max-h-[80vh] overflow-hidden"
      >
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Select Content to Convert
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {pages.map((page, index) => (
            <div
              key={index}
              className="mb-6 last:mb-0"
            >
              <label className="flex items-start space-x-4 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedPages.includes(index)}
                  onChange={() => togglePage(index)}
                  className="mt-1 h-5 w-5 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
                />
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-white mb-2">
                    Page {index + 1}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
                    {page}
                  </p>
                </div>
              </label>
            </div>
          ))}
        </div>

        <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={selectedPages.length === 0}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            <Check className="w-4 h-4" />
            <span>Generate Flashcards</span>
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};