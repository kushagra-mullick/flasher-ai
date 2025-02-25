import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

const NewsletterPage = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert([{ email }]);

      if (error) throw error;

      setStatus('success');
      setMessage('Thanks for subscribing! Check your inbox for updates.');
      setEmail('');
    } catch (error) {
      setStatus('error');
      setMessage('Error subscribing. Please try again.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Mail className="w-16 h-16 text-indigo-600 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Stay Updated with Flasher AI
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Get weekly study tips, AI insights, and feature updates
          </p>
        </motion.div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="you@example.com"
                required
              />
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
            >
              {status === 'loading' ? 'Subscribing...' : 'Subscribe Now'}
            </button>
          </form>

          {status === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 bg-green-50 dark:bg-green-900/10 text-green-600 dark:text-green-400 rounded-lg flex items-center"
            >
              <CheckCircle className="w-5 h-5 mr-2" />
              {message}
            </motion.div>
          )}

          {status === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 rounded-lg"
            >
              {message}
            </motion.div>
          )}

          <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
            <p>By subscribing, you agree to receive our newsletter and marketing emails. You can unsubscribe at any time using the link in the footer of our emails.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsletterPage;