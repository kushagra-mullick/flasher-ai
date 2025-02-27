import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, BookOpen, Star, Download, Share2 } from 'lucide-react';

const LibraryPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Mock data for demonstration
  const categories = [
    'All',
    'Mathematics',
    'Science',
    'Languages',
    'History',
    'Computer Science',
    'Medicine',
    'Business',
  ];

  const decks = [
    {
      id: 1,
      title: 'Spanish Vocabulary Basics',
      description: 'Essential Spanish vocabulary for beginners',
      category: 'Languages',
      cardCount: 120,
      rating: 4.8,
      downloads: 1250,
      author: 'Maria Rodriguez',
      image: 'https://images.unsplash.com/photo-1551818255-e6e10975bc17?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    },
    {
      id: 2,
      title: 'Calculus Fundamentals',
      description: 'Key concepts and formulas for calculus',
      category: 'Mathematics',
      cardCount: 85,
      rating: 4.6,
      downloads: 980,
      author: 'Dr. Alan Smith',
      image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    },
    {
      id: 3,
      title: 'Human Anatomy',
      description: 'Comprehensive flashcards on human anatomy',
      category: 'Medicine',
      cardCount: 210,
      rating: 4.9,
      downloads: 1560,
      author: 'Dr. Sarah Johnson',
      image: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    },
    {
      id: 4,
      title: 'JavaScript Fundamentals',
      description: 'Core concepts of JavaScript programming',
      category: 'Computer Science',
      cardCount: 95,
      rating: 4.7,
      downloads: 2100,
      author: 'Alex Chen',
      image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    },
    {
      id: 5,
      title: 'World War II Timeline',
      description: 'Key events and dates from World War II',
      category: 'History',
      cardCount: 75,
      rating: 4.5,
      downloads: 850,
      author: 'Prof. Michael Brown',
      image: 'https://images.unsplash.com/photo-1581591524425-c7e0978865fc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    },
  ];

  const filteredDecks = decks.filter((deck) => {
    const matchesSearch = deck.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deck.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === null || 
      selectedCategory === 'All' || 
      deck.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Flashcard Library
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Explore thousands of flashcard decks created by our community. Find the perfect deck for your learning needs.
        </p>
      </motion.div>

      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
              placeholder="Search for flashcard decks..."
            />
          </div>
          <div className="relative w-full md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter className="h-5 w-5 text-gray-400" />
            </div>
            <select
              value={selectedCategory || 'All'}
              onChange={(e) => setSelectedCategory(e.target.value === 'All' ? null : e.target.value)}
              className="pl-10 w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-800 dark:text-white appearance-none"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredDecks.map((deck) => (
          <motion.div
            key={deck.id}
            whileHover={{ scale: 1.03 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
          >
            <div className="h-48 overflow-hidden">
              <img
                src={deck.image}
                alt={deck.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {deck.title}
                </h3>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
                  {deck.category}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {deck.description}
              </p>
              <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-4">
                <BookOpen className="w-4 h-4 mr-1" />
                <span>{deck.cardCount} cards</span>
                <span className="mx-2">•</span>
                <Star className="w-4 h-4 mr-1 text-yellow-500" />
                <span>{deck.rating}</span>
                <span className="mx-2">•</span>
                <Download className="w-4 h-4 mr-1" />
                <span>{deck.downloads}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  By {deck.author}
                </span>
                <div className="flex space-x-2">
                  <button className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600">
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button className="p-2 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 hover:bg-indigo-200 dark:hover:bg-indigo-800">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredDecks.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">
            No flashcard decks found matching your search criteria.
          </p>
        </div>
      )}
    </div>
  );
};

export default LibraryPage;