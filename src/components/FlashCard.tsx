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
        className={`relative w-full h-64 transition-transform duration-500 transform-style-3d ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        <div className="absolute w-full h-full backface-hidden bg-white rounded-xl shadow-lg p-6 flex items-center justify-center">
          <p className="text-xl font-medium text-center">{front}</p>
        </div>
        <div className="absolute w-full h-full backface-hidden bg-indigo-50 rounded-xl shadow-lg p-6 flex items-center justify-center rotate-y-180">
          <p className="text-xl font-medium text-center">{back}</p>
        </div>
      </div>
    </div>
  );
};

export default FlashCard;