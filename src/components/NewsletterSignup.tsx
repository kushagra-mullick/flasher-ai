import React, { useState } from 'react';
import { Mail } from 'lucide-react';

const NewsletterSignup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle the email subscription
    setIsSubmitted(true);
    setEmail('');
  };

  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Stay Updated
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Get the latest study tips, feature updates, and special offers
          </p>
        </div>
        <div className="mt-8 max-w-md mx-auto">
          <form onSubmit={handleSubmit} className="mt-3 sm:flex">
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full rounded-md border-gray-300 py-3 text-base placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:flex-1"
              placeholder="Enter your email"
            />
            <button
              type="submit"
              className="mt-3 w-full rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:flex-shrink-0"
            >
              Subscribe
            </button>
          </form>
          {isSubmitted && (
            <p className="mt-3 text-sm text-green-600">
              Thanks for subscribing! Check your email for a welcome message.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsletterSignup;