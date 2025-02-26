import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Loader } from 'lucide-react';
import { PDFUploader } from './PDFUploader';
import { TextSelector } from './TextSelector';
import { aiService } from '../services/ai';
import { Card } from '../types';
import { useDeckStore } from '../stores/useDeckStore';

interface PDFToFlashcardsProps {
  onCardsGenerated: (cards: Card[]) => void;
}

export const PDFToFlashcards: React.FC<PDFToFlashcardsProps> = ({ onCardsGenerated }) => {
  const [extractedPages, setExtractedPages] = useState<string[]>([]);
  const [showTextSelector, setShowTextSelector] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedCards, setGeneratedCards] = useState<Card[]>([]);
  const createDeck = useDeckStore(state => state.createDeck);

  const handleTextExtracted = (pages: string[]) => {
    setExtractedPages(pages);
    setShowTextSelector(true);
    setError(null);
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
    setShowTextSelector(false);
  };

  const handleTextSelected = async (selectedTexts: string[]) => {
    setIsGenerating(true);
    setShowTextSelector(false);
    try {
      const cards: Card[] = [];
      for (const text of selectedTexts) {
        const newCards = await aiService.generateFlashcards(text, {
          style: 'detailed',
        });
        cards.push(...newCards);
      }
      setGeneratedCards(cards);
      onCardsGenerated(cards);

      // Create a new deck with the generated cards
      if (cards.length > 0) {
        await createDeck(
          'PDF Flashcards',
          `Flashcards generated from PDF on ${new Date().toLocaleDateString()}`
        );
      }
    } catch (err) {
      setError('Error generating flashcards. Please try again.');
      console.error('Flashcard generation error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleExport = () => {
    const csvContent = generatedCards
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

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          Create Flashcards from PDF
        </h2>

        {!showTextSelector && !isGenerating && (
          <PDFUploader
            onTextExtracted={handleTextExtracted}
            onError={handleError}
          />
        )}

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4 p-4 bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 rounded-lg"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {isGenerating && (
          <div className="mt-8 text-center">
            <Loader className="w-12 h-12 text-indigo-600 animate-spin mx-auto" />
            <p className="mt-4 text-gray-600 dark:text-gray-300">
              Generating flashcards from your PDF...
            </p>
          </div>
        )}

        {generatedCards.length > 0 && !isGenerating && (
          <div className="mt-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Generated Flashcards
              </h3>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleExport}
                className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                <Download className="w-4 h-4" />
                <span>Export CSV</span>
              </motion.button>
            </div>
            <div className="space-y-4">
              {generatedCards.map((card, index) => (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4"
                >
                  <p className="font-medium text-gray-900 dark:text-white mb-2">
                    {card.front}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">{card.back}</p>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {showTextSelector && (
          <TextSelector
            pages={extractedPages}
            onSelect={handleTextSelected}
            onClose={() => setShowTextSelector(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};