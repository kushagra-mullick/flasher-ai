import React, { useState } from 'react';

interface FlashCardProps {
  front: string;
  back: string;
}

const FlashCard: React.FC<FlashCardProps> = ({ front, back }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="cursor-pointer perspective-1000"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div
        className={`relative w-full h-[400px] transition-transform duration-700 transform-style-3d ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        <div className="absolute w-full h-full backface-hidden bg-gradient-to-b from-gray-900 to-black rounded-2xl shadow-2xl p-8 flex items-center justify-center border border-gray-800">
          <p className="text-2xl font-medium text-center text-white">{front}</p>
        </div>
        <div className="absolute w-full h-full backface-hidden bg-gradient-to-b from-purple-900 to-black rounded-2xl shadow-2xl p-8 flex items-center justify-center rotate-y-180 border border-purple-800">
          <p className="text-2xl font-medium text-center text-white">{back}</p>
        </div>
      </div>
      <p className="text-center mt-6 text-gray-400">Click to flip</p>
    </div>
  );
};

export default FlashCard;