import React, { useState } from 'react';
import { Brain, Plus, RotateCcw, ChevronLeft, ChevronRight, Pencil } from 'lucide-react';
import FlashCard from './components/FlashCard';
import AddCardModal from './components/AddCardModal';
import { Card } from './types';

function App() {
  const [cards, setCards] = useState<Card[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isStudyMode, setIsStudyMode] = useState(false);
  const [editingCard, setEditingCard] = useState<Card | null>(null);

  const addCard = (front: string, back: string) => {
    setCards([...cards, { front, back, id: Date.now() }]);
    setIsModalOpen(false);
  };

  const editCard = (id: number, front: string, back: string) => {
    setCards(cards.map(card => 
      card.id === id ? { ...card, front, back } : card
    ));
    setIsModalOpen(false);
    setEditingCard(null);
  };

  const handleEditClick = (card: Card) => {
    setEditingCard(card);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingCard(null);
  };

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  const prevCard = () => {
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Brain className="w-12 h-12 text-purple-500" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-transparent bg-clip-text">
              AI Flashcards
            </h1>
          </div>
          <p className="text-gray-400 text-lg">Enhance your learning with intelligent flashcards</p>
        </header>

        <div className="max-w-3xl mx-auto">
          <div className="flex justify-between mb-8">
            <button
              onClick={() => setIsStudyMode(!isStudyMode)}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 flex items-center gap-2 shadow-lg shadow-purple-500/20"
            >
              <RotateCcw className="w-5 h-5" />
              {isStudyMode ? 'Edit Mode' : 'Study Mode'}
            </button>
            {!isStudyMode && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-xl hover:from-orange-600 hover:to-pink-600 transition-all duration-300 flex items-center gap-2 shadow-lg shadow-orange-500/20"
              >
                <Plus className="w-5 h-5" />
                Add Card
              </button>
            )}
          </div>

          {cards.length === 0 ? (
            <div className="text-center py-16 bg-gradient-to-b from-gray-900 to-black rounded-2xl border border-gray-800 shadow-2xl">
              <div className="mb-6">
                <Brain className="w-16 h-16 text-purple-500 mx-auto mb-4" />
                <p className="text-gray-400 text-lg mb-6">Create your first flashcard to begin learning</p>
              </div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 inline-flex items-center gap-2 shadow-lg shadow-purple-500/20"
              >
                <Plus className="w-5 h-5" />
                Create your first card
              </button>
            </div>
          ) : isStudyMode ? (
            <div className="relative">
              <FlashCard
                front={cards[currentIndex].front}
                back={cards[currentIndex].back}
              />
              <div className="flex justify-center items-center gap-6 mt-8">
                <button
                  onClick={prevCard}
                  className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <span className="text-gray-400 text-lg font-medium">
                  {currentIndex + 1} / {cards.length}
                </span>
                <button
                  onClick={nextCard}
                  className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
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
                  className="bg-gradient-to-b from-gray-900 to-black p-6 rounded-xl border border-gray-800 shadow-lg transition-transform duration-300 hover:scale-[1.02]"
                >
                  <div className="space-y-3">
                    <div>
                      <p className="text-gray-400 text-sm mb-1">Front</p>
                      <p className="text-lg">{card.front}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm mb-1">Back</p>
                      <p className="text-lg text-gray-300">{card.back}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-4">
                    <button
                      onClick={() => handleEditClick(card)}
                      className="text-purple-400 hover:text-purple-300 transition-colors text-sm flex items-center gap-1"
                    >
                      <Pencil className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        const newCards = [...cards];
                        newCards.splice(index, 1);
                        setCards(newCards);
                      }}
                      className="text-red-400 hover:text-red-300 transition-colors text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <AddCardModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onAdd={addCard}
        onEdit={editCard}
        editCard={editingCard}
      />
    </div>
  );
}

export default App;