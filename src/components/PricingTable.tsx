import React from 'react';
import { X, Check } from 'lucide-react';

interface PricingTableProps {
  isOpen: boolean;
  onClose: () => void;
}

const PricingTable: React.FC<PricingTableProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Choose Your Plan</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Free Plan */}
          <div className="border rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900">Free</h3>
            <p className="text-gray-500 mt-2">Perfect for getting started</p>
            <div className="mt-4">
              <span className="text-4xl font-bold">€0</span>
              <span className="text-gray-500">/month</span>
            </div>
            <ul className="mt-6 space-y-4">
              <li className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-2" />
                <span>Up to 50 flashcards</span>
              </li>
              <li className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-2" />
                <span>Basic AI assistance</span>
              </li>
              <li className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-2" />
                <span>Study progress tracking</span>
              </li>
            </ul>
            <button className="mt-8 w-full bg-indigo-600 text-white rounded-lg py-2 hover:bg-indigo-700 transition-colors">
              Get Started
            </button>
          </div>

          {/* Premium Plan */}
          <div className="border rounded-lg p-6 bg-gradient-to-br from-indigo-50 to-purple-50">
            <div className="absolute top-4 right-4 bg-indigo-600 text-white px-3 py-1 rounded-full text-sm">
              Popular
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Premium</h3>
            <p className="text-gray-500 mt-2">For serious learners</p>
            <div className="mt-4">
              <span className="text-4xl font-bold">€10</span>
              <span className="text-gray-500">/month</span>
            </div>
            <ul className="mt-6 space-y-4">
              <li className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-2" />
                <span>Unlimited flashcards</span>
              </li>
              <li className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-2" />
                <span>Advanced AI features</span>
              </li>
              <li className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-2" />
                <span>Priority support</span>
              </li>
              <li className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-2" />
                <span>Custom study plans</span>
              </li>
              <li className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-2" />
                <span>Export & sharing</span>
              </li>
            </ul>
            <button className="mt-8 w-full bg-indigo-600 text-white rounded-lg py-2 hover:bg-indigo-700 transition-colors">
              Upgrade Now
            </button>
          </div>
        </div>

        <div className="mt-8 text-center text-gray-500">
          <p>Need a custom plan for your school or organization?</p>
          <button className="text-indigo-600 hover:text-indigo-700 font-medium mt-2">
            Contact us for special pricing
          </button>
        </div>
      </div>
    </div>
  );
};

export default PricingTable;