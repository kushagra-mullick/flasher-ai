import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Loader, AlignLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PDFUploader } from '../components/PDFUploader';
import { TextSelector } from '../components/TextSelector';
import { TextToFlashcards } from '../components/TextToFlashcards';
import { aiService } from '../services/ai';
import { Card } from '../types';
import { useDeckStore } from '../stores/useDeckStore';

const UploadPage = () => {
  const [extractedPages, setExtractedPages] = useState<string[]>([]);
  const [showTextSelector, setShowTextSelector] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'pdf' | 'text'>('pdf');
  const navigate = useNavigate();
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

      if (cards.length > 0) {
        await createDeck(
          'PDF Flashcards',
          `Flashcards generated from PDF on ${new Date().toLocaleDateString()}`
        );
        navigate('/flashcards', { state: { cards } });
      }
    } catch (err) {
      setError('Error generating flashcards. Please try again.');
      console.error('Flashcard generation error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCardsGenerated = (cards: Card[]) => {
    navigate('/flashcards', { state: { cards } });
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Create Flashcards
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Convert your content into interactive flashcards
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              type="button"
              onClick={() => setActiveTab('pdf')}
              className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                activeTab === 'pdf'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600'
              }`}
            >
              <FileText className="w-4 h-4 mr-2 inline-block" />
              PDF Upload
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('text')}
              className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                activeTab === 'text'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600'
              }`}
            >
              <AlignLeft className="w-4 h-4 mr-2 inline-block" />
              Text Input
            </button>
          </div>
        </div>

        {activeTab === 'pdf' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            {!showTextSelector && !isGenerating && (
              <PDFUploader
                onTextExtracted={handleTextExtracted}
                onError={handleError}
              />
            )}

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 rounded-lg"
              >
                {error}
              </motion.div>
            )}

            {isGenerating && (
              <div className="text-center py-12">
                <Loader className="w-12 h-12 text-indigo-600 animate-spin mx-auto" />
                <p className="mt-4 text-gray-600 dark:text-gray-300">
                  Generating your flashcards...
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'text' && (
          <TextToFlashcards onCardsGenerated={handleCardsGenerated} />
        )}

        {showTextSelector && (
          <TextSelector
            pages={extractedPages}
            onSelect={handleTextSelected}
            onClose={() => setShowTextSelector(false)}
          />
        )}
      </motion.div>
    </div>
  );
};

export default UploadPage;