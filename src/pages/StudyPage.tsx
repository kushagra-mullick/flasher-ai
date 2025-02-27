import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Clock, BarChart2, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import FlashCard from '../components/FlashCard';

const StudyPage: React.FC = () => {
  // Mock data for demonstration
  const mockDecks = [
    {
      id: 1,
      title: 'Spanish Vocabulary',
      progress: 65,
      dueCards: 12,
      totalCards: 120,
    },
    {
      id: 2,
      title: 'JavaScript Basics',
      progress: 40,
      dueCards: 18,
      totalCards: 95,
    },
    {
      id: 3,
      title: 'World History',
      progress: 25,
      dueCards: 24,
      totalCards: 75,
    },
  ];

  const mockCards = [
    { id: 1, front: 'What is the capital of France?', back: 'Paris' },
    { id: 2, front: 'What is the largest planet in our solar system?', back: 'Jupiter' },
    { id: 3, front: 'What is the chemical symbol for gold?', back: 'Au' },
    { id: 4, front: 'Who wrote "Romeo and Juliet"?', back: 'William Shakespeare' },
    { id: 5, front: 'What is the square root of 144?', back: '12' },
  ];

  const [selectedDeck, setSelectedDeck] = useState<number | null>(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [studyMode, setStudyMode] = useState<'review' | 'learn' | 'test'>('review');

  const handleNextCard = () => {
    setCurrentCardIndex((prev) => (prev + 1) % mockCards.length);
  };

  const handlePrevCard = () => {
    setCurrentCardIndex((prev) => (prev - 1 + mockCards.length) % mockCards.length);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Study Dashboard
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Track your progress and continue your learning journey.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center text-indigo-600 dark:text-indigo-400 mb-4">
            <BookOpen className="w-6 h-6 mr-2" />
            <h2 className="text-xl font-semibold">Today's Cards</h2>
          </div>
          <p className="text-4xl font-bold text-gray-900 dark:text-white">42</p>
          <p className="text-gray-600 dark:text-gray-400">cards due for review</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center text-green-600 dark:text-green-400 mb-4">
            <Clock className="w-6 h-6 mr-2" />
            <h2 className="text-xl font-semibold">Study Time</h2>
          </div>
          <p className="text-4xl font-bold text-gray-900 dark:text-white">2.5h</p>
          <p className="text-gray-600 dark:text-gray-400">this week</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center text-purple-600 dark:text-purple-400 mb-4">
            <Calendar className="w-6 h-6 mr-2" />
            <h2 className="text-xl font-semibold">Streak</h2>
          </div>
          <p className="text-4xl font-bold text-gray-900 dark:text-white">7</p>
          <p className="text-gray-600 dark:text-gray-400">days in a row</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Your Decks
            </h2>
            <div className="space-y-4">
              {mockDecks.map((deck) => (
                <motion.div
                  key={deck.id}
                  whileHover={{ scale: 1.02 }}
                  className={`p-4 rounded-lg cursor-pointer ${
                    selectedDeck === deck.id
                      ? 'bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800'
                      : 'bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => setSelectedDeck(deck.id)}
                >
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                    {deck.title}
                  </h3>
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                    <span>{deck.dueCards} cards due</span>
                    <span>{deck.totalCards} total</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                    <div
                      className="bg-indigo-600 h-2.5 rounded-full"
                      style={{ width: `${deck.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-right text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {deck.progress}% complete
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="mt-6">
              <button className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg">
                Create New Deck
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mt-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Study Statistics
              </h2>
              <BarChart2 className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-400">Accuracy</span>
                  <span className="font-medium text-gray-900 dark:text-white">85%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                  <div
                    className="bg-green-500 h-2.5 rounded-full"
                    style={{ width: '85%' }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-400">Retention</span>
                  <span className="font-medium text-gray-900 dark:text-white">72%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                  <div
                    className="bg-blue-500 h-2.5 rounded-full"
                    style={{ width: '72%' }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-400">Consistency</span>
                  <span className="font-medium text-gray-900 dark:text-white">90%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                  <div
                    className="bg-purple-500 h-2.5 rounded-full"
                    style={{ width: '90%' }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Study Session
              </h2>
              <div className="flex space-x-2">
                <button
                  onClick={() => setStudyMode('review')}
                  className={`px-3 py-1 text-sm rounded-md ${
                    studyMode === 'review'
                      ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  Review
                </button>
                <button
                  onClick={() => setStudyMode('learn')}
                  className={`px-3 py-1 text-sm rounded-md ${
                    studyMode === 'learn'
                      ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  Learn
                </button>
                <button
                  onClick={() => setStudyMode('test')}
                  className={`px-3 py-1 text-sm rounded-md ${
                    studyMode === 'test'
                      ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  Test
                </button>
              </div>
            </div>

            {selectedDeck ? (
              <div>
                <div className="mb-6">
                  <FlashCard
                    front={mockCards[currentCardIndex].front}
                    back={mockCards[currentCardIndex].back}
                  />
                </div>

                <div className="flex justify-between items-center">
                  <button
                    onClick={handlePrevCard}
                    className="flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
                  >
                    <ChevronLeft className="w-5 h-5 mr-1" />
                    Previous
                  </button>
                  <div className="text-gray-600 dark:text-gray-400">
                    {currentCardIndex + 1} / {mockCards.length}
                  </div>
                  <button
                    onClick={handleNextCard}
                    className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                  >
                    Next
                    <ChevronRight className="w-5 h-5 ml-1" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <BookOpen className="w-16 h-16 text-gray-300 dark:text-gray-600 mb-4" />
                <p className="text-gray-600 dark:text-gray-400 text-center">
                  Select a deck from the left to start studying
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyPage;