import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Loader, CheckCircle, AlertCircle } from 'lucide-react';
import { Card } from '../types';
import { aiService } from '../services/ai';
import { useDeckStore } from '../stores/useDeckStore';

interface TextToFlashcardsProps {
  onCardsGenerated: (cards: Card[]) => void;
}

export const TextToFlashcards: React.FC<TextToFlashcardsProps> = ({ onCardsGenerated }) => {
  const [inputText, setInputText] = useState('');
  const [topic, setTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const createDeck = useDeckStore(state => state.createDeck);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputText.trim()) {
      setError('Please enter some text content');
      return;
    }

    setIsGenerating(true);
    setError(null);
    setSuccess(null);
    
    try {
      const cards = await aiService.generateFlashcards(inputText, {
        style: 'detailed',
        topicFilter: topic.trim() || undefined
      });
      
      if (cards.length > 0) {
        onCardsGenerated(cards);
        
        // Create a new deck with the generated cards
        const deckTitle = topic.trim() ? topic : 'Text Flashcards';
        await createDeck(
          deckTitle,
          `Flashcards generated from text on ${new Date().toLocaleDateString()}`
        );
        
        setSuccess(`Successfully generated ${cards.length} flashcards!`);
        setInputText('');
        setTopic('');
      } else {
        setError('No flashcards could be generated from the provided text. Please try with different content.');
      }
    } catch (err) {
      setError('Error generating flashcards. Please try again.');
      console.error('Flashcard generation error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          Create Flashcards from Text
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="topic" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Topic (Optional)
            </label>
            <input
              id="topic"
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder="e.g., Spanish Vocabulary, Math Formulas"
            />
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Specify a topic to help the AI focus on relevant content
            </p>
          </div>

          <div>
            <label htmlFor="inputText" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Text Content
            </label>
            <textarea
              id="inputText"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder="Paste or type the text content you want to convert to flashcards..."
              rows={10}
              required
            />
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Enter paragraphs, notes, or any text you want to learn
            </p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 rounded-lg flex items-center"
            >
              <AlertCircle className="w-5 h-5 mr-2" />
              {error}
            </motion.div>
          )}

          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-green-50 dark:bg-green-900/10 text-green-600 dark:text-green-400 rounded-lg flex items-center"
            >
              <CheckCircle className="w-5 h-5 mr-2" />
              {success}
            </motion.div>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isGenerating}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {isGenerating ? (
                <>
                  <Loader className="w-5 h-5 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                'Generate Flashcards'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};