import React, { useState } from 'react';
import { Brain, Plus, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';
import FlashCard from './components/FlashCard';
import AddCardModal from './components/AddCardModal';
import { Card } from './types';

function App() {
  const [cards, setCards] = useState<Card[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isStudyMode, setIsStudyMode] = useState(false);

  const addCard = (front: string, back: string) => {
    setCards([...cards, { front, back, id: Date.now() }]);
    setIsModalOpen(false);
  };

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  const prevCard = () => {
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Brain className="w-10 h-10 text-indigo-600" />
            <h1 className="text-4xl font-bold text-gray-800">AI Flashcards</h1>
          </div>
          <p className="text-gray-600">Enhance your learning with smart flashcards</p>
        </header>

        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between mb-8">
            <button
              onClick={() => setIsStudyMode(!isStudyMode)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              {isStudyMode ? 'Edit Mode' : 'Study Mode'}
            </button>
            {!isStudyMode && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Card
              </button>
            )}
          </div>

          {cards.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-lg">
              <p className="text-gray-600 mb-4">No flashcards yet!</p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors inline-flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Create your first card
              </button>
            </div>
          ) : isStudyMode ? (
            <div className="relative">
              <FlashCard
                front={cards[currentIndex].front}
                back={cards[currentIndex].back}
              />
              <div className="flex justify-center items-center gap-4 mt-6">
                <button
                  onClick={prevCard}
                  className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <span className="text-gray-600">
                  {currentIndex + 1} / {cards.length}
                </span>
                <button
                  onClick={nextCard}
                  className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>
          ) : (
            <div className="grid gap-4">
              {cards.map((card, index) => (
                <div
                  key={card.id}
                  className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium">Front: {card.front}</p>
                    <p className="text-gray-600">Back: {card.back}</p>
                  </div>
                  <button
                    onClick={() => {
                      const newCards = [...cards];
                      newCards.splice(index, 1);
                      setCards(newCards);
                    }}
                    className="text-red-600 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <AddCardModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={addCard}
      />
    </div>
  );
}

export default App;