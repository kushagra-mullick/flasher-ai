import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, AlertCircle, Loader, ArrowLeft, Info } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const ForgotPasswordForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { resetPassword, isConfigured } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setIsLoading(true);

    try {
      await resetPassword(email);
      setMessage('Check your email for password reset instructions');
    } catch (err: any) {
      setError(err.message || 'Failed to reset password. Please check if the email is correct.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 text-center">
          Reset Password
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-center mb-6">
          Enter your email and we'll send you instructions to reset your password
        </p>

        {!isConfigured && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-3 bg-amber-50 dark:bg-amber-900/10 text-amber-600 dark:text-amber-400 rounded-lg flex items-center"
          >
            <Info className="w-5 h-5 mr-2" />
            <div>
              <p className="font-medium">Demo Mode</p>
              <p className="text-sm">Firebase authentication is not configured. Set up your environment variables to enable password reset.</p>
            </div>
          </motion.div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-3 bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 rounded-lg flex items-center"
          >
            <AlertCircle className="w-5 h-5 mr-2" />
            {error}
          </motion.div>
        )}

        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-3 bg-green-50 dark:bg-green-900/10 text-green-600 dark:text-green-400 rounded-lg"
          >
            {message}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || !isConfigured}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader className="w-5 h-5 animate-spin" />
            ) : (
              'Send Reset Link'
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link to="/login" className="inline-flex items-center text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;