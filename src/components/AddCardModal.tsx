import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface AddCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (front: string, back: string) => void;
  onEdit?: (id: number, front: string, back: string) => void;
  editCard?: { id: number; front: string; back: string } | null;
}

const AddCardModal: React.FC<AddCardModalProps> = ({ 
  isOpen, 
  onClose, 
  onAdd, 
  onEdit,
  editCard 
}) => {
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');

  useEffect(() => {
    if (editCard) {
      setFront(editCard.front);
      setBack(editCard.back);
    } else {
      setFront('');
      setBack('');
    }
  }, [editCard, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (front.trim() && back.trim()) {
      if (editCard && onEdit) {
        onEdit(editCard.id, front.trim(), back.trim());
      } else {
        onAdd(front.trim(), back.trim());
      }
      setFront('');
      setBack('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gradient-to-b from-gray-900 to-black rounded-2xl shadow-2xl w-full max-w-md border border-gray-800">
        <div className="flex justify-between items-center p-6 border-b border-gray-800">
          <h2 className="text-2xl font-semibold text-white">
            {editCard ? 'Edit Flashcard' : 'Add New Flashcard'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-6">
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Front
            </label>
            <textarea
              value={front}
              onChange={(e) => setFront(e.target.value)}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-500 transition-all duration-300"
              rows={3}
              placeholder="Enter the question or term"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Back
            </label>
            <textarea
              value={back}
              onChange={(e) => setBack(e.target.value)}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-500 transition-all duration-300"
              rows={3}
              placeholder="Enter the answer or definition"
              required
            />
          </div>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg shadow-purple-500/20"
            >
              {editCard ? 'Save Changes' : 'Add Card'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCardModal;