import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Calendar, Edit, Save, X, Loader } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const ProfilePage: React.FC = () => {
  const { currentUser, updateUserProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (currentUser) {
      setDisplayName(currentUser.displayName || '');
    }
  }, [currentUser]);

  const handleSave = async () => {
    if (!displayName.trim()) {
      setError('Name cannot be empty');
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      await updateUserProfile(displayName);
      setSuccess('Profile updated successfully');
      setIsEditing(false);
    } catch (err) {
      setError('Failed to update profile');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setDisplayName(currentUser?.displayName || '');
    setIsEditing(false);
    setError('');
  };

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="w-8 h-8 text-indigo-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
      >
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-32"></div>
        <div className="px-6 py-8 relative">
          <div className="absolute -top-16 left-6">
            <div className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center overflow-hidden">
              {currentUser.photoURL ? (
                <img
                  src={currentUser.photoURL}
                  alt={currentUser.displayName || 'User'}
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-16 h-16 text-indigo-600 dark:text-indigo-400" />
              )}
            </div>
          </div>

          <div className="mt-16">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {isEditing ? (
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Your name"
                  />
                ) : (
                  currentUser.displayName || 'User'
                )}
              </h1>
              <div>
                {isEditing ? (
                  <div className="flex space-x-2">
                    <button
                      onClick={handleSave}
                      disabled={isLoading}
                      className="flex items-center space-x-1 text-white bg-indigo-600 hover:bg-indigo-700 px-3 py-2 rounded-lg"
                    >
                      {isLoading ? (
                        <Loader className="w-4 h-4 animate-spin" />
                      ) : (
                        <Save className="w-4 h-4" />
                      )}
                      <span>Save</span>
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 px-3 py-2 rounded-lg"
                    >
                      <X className="w-4 h-4" />
                      <span>Cancel</span>
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center space-x-1 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Edit Profile</span>
                  </button>
                )}
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 rounded-lg">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/10 text-green-600 dark:text-green-400 rounded-lg">
                {success}
              </div>
            )}

            <div className="space-y-4">
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <Mail className="w-5 h-5 mr-2" />
                <span>{currentUser.email}</span>
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <Calendar className="w-5 h-5 mr-2" />
                <span>
                  Joined{' '}
                  {currentUser.metadata.creationTime
                    ? new Date(currentUser.metadata.creationTime).toLocaleDateString()
                    : 'Unknown'}
                </span>
              </div>
            </div>

            <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Account Statistics
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Flashcards Created</p>
                  <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">0</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Study Sessions</p>
                  <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">0</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Current Streak</p>
                  <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">0 days</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfilePage;