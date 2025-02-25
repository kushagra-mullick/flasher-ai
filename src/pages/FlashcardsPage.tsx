import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, Table, Code } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import { Card } from '../types';
import FlashCard from '../components/FlashCard';

const FlashcardsPage = () => {
  const location = useLocation();
  const [cards] = useState<Card[]>(location.state?.cards || []);
  const [currentIndex, setCurrentIndex] = useState(0);

  const exportAsPDF = () => {
    const doc = new jsPDF();
    let y = 20;

    doc.setFontSize(20);
    doc.text('Flashcards', 20, y);
    y += 20;

    cards.forEach((card, index) => {
      if (y > 250) {
        doc.addPage();
        y = 20;
      }

      doc.setFontSize(14);
      doc.text(`Card ${index + 1}`, 20, y);
      y += 10;

      doc.setFontSize(12);
      doc.text(`Q: ${card.front}`, 20, y);
      y += 10;
      doc.text(`A: ${card.back}`, 20, y);
      y += 20;
    });

    doc.save('flashcards.pdf');
  };

  const exportAsCSV = () => {
    const csvContent = cards
      .map(card => `"${card.front}","${card.back}"`)
      .join('\n');
    const blob = new Blob([`Front,Back\n${csvContent}`], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'flashcards.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const exportAsJSON = () => {
    const jsonContent = JSON.stringify(cards, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'flashcards.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Your Flashcards
          </h1>
          <div className="flex space-x-4">
            <ExportButton
              icon={<FileText className="w-4 h-4" />}
              label="PDF"
              onClick={exportAsPDF}
            />
            <ExportButton
              icon={<Table className="w-4 h-4" />}
              label="CSV"
              onClick={exportAsCSV}
            />
            <ExportButton
              icon={<Code className="w-4 h-4" />}
              label="JSON"
              onClick={exportAsJSON}
            />
          </div>
        </div>

        {cards.length > 0 ? (
          <div className="space-y-8">
            <FlashCard
              front={cards[currentIndex].front}
              back={cards[currentIndex].back}
            />
            <div className="flex justify-center items-center space-x-4">
              <button
                onClick={() => setCurrentIndex((prev) => 
                  prev === 0 ? cards.length - 1 : prev - 1
                )}
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
              >
                Previous
              </button>
              <span className="text-gray-600 dark:text-gray-300">
                {currentIndex + 1} / {cards.length}
              </span>
              <button
                onClick={() => setCurrentIndex((prev) => 
                  prev === cards.length - 1 ? 0 : prev + 1
                )}
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
              >
                Next
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-300">
              No flashcards available. Upload a PDF to get started!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const ExportButton = ({ icon, label, onClick }: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all"
  >
    {icon}
    <span>{label}</span>
  </motion.button>
);

export default FlashcardsPage;