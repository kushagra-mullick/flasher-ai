import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Shield, User, Mail, Loader, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

const SettingsPage: React.FC = () => {
  const { currentUser, verifyEmail } = useAuth();
  const [activeTab, setActiveTab] = useState('account');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSendVerificationEmail = async () => {
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      await verifyEmail();
      setSuccess('Verification email sent. Please check your inbox.');
    } catch (err) {
      setError('Failed to send verification email. Please try again later.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="w-8 h-8 text-indigo-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
      >
        <div className="md:flex">
          <div className="md:w-64 bg-gray-50 dark:bg-gray-900 p-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Settings</h1>
            <nav className="space-y-1">
              <button
                onClick={() => setActiveTab('account')}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'account'
                    ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <User className="w-5 h-5 mr-2" />
                Account
              </button>
              <button
                onClick={() => setActiveTab('security')}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'security'
                    ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <Shield className="w-5 h-5 mr-2" />
                Security
              </button>
              <button
                onClick={() => setActiveTab('notifications')}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'notifications'
                    ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <Bell className="w-5 h-5 mr-2" />
                Notifications
              </button>
            </nav>
          </div>

          <div className="flex-1 p-6">
            {error && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 rounded-lg flex items-center">
                <AlertCircle className="w-5 h-5 mr-2" />
                {error}
              </div>
            )}

            {success && (
              <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/10 text-green-600 dark:text-green-400 rounded-lg flex items-center">
                <CheckCircle className="w-5 h-5 mr-2" />
                {success}
              </div>
            )}

            {activeTab === 'account' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  Account Settings
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email
                    </label>
                    <div className="flex items-center">
                      <div className="flex-1 flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg px-4 py-2">
                        <Mail className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2" />
                        <span className="text-gray-900 dark:text-white">{currentUser.email}</span>
                      </div>
                      {!currentUser.emailVerified && (
                        <button
                          onClick={handleSendVerificationEmail}
                          disabled={isLoading}
                          className="ml-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center"
                        >
                          {isLoading ? (
                            <Loader className="w-4 h-4 animate-spin mr-2" />
                          ) : null}
                          Verify Email
                        </button>
                      )}
                    </div>
                    {!currentUser.emailVerified && (
                      <p className="mt-1 text-sm text-amber-600 dark:text-amber-400">
                        Your email is not verified. Please verify your email to access all features.
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Profile Information
                    </label>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Update your profile information from the profile page.
                    </p>
                    <Link
                      to="/profile"
                      className="inline-flex items-center px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
                    >
                      <User className="w-4 h-4 mr-2" />
                      Go to Profile
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  Security Settings
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Two-Factor Authentication
                    </label>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Add an extra layer of security to your account by enabling two-factor
                      authentication.
                    </p>
                    <Link
                      to="/two-factor-setup"
                      className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                    >
                      <Shield className="w-4 h-4 mr-2" />
                      Set Up 2FA
                    </Link>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Password
                    </label>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Change your password to keep your account secure.
                    </p>
                    <button className="inline-flex items-center px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600">
                      Change Password
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  Notification Settings
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        defaultChecked
                      />
                      <span className="ml-2 text-gray-700 dark:text-gray-300">
                        Email notifications for study reminders
                      </span>
                    </label>
                  </div>

                  <div>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        defaultChecked
                      />
                      <span className="ml-2 text-gray-700 dark:text-gray-300">
                        Email notifications for new features and updates
                      </span>
                    </label>
                  </div>

                  <div>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-gray-700 dark:text-gray-300">
                        Email notifications for marketing and promotions
                      </span>
                    </label>
                  </div>

                  <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                    Save Notification Settings
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SettingsPage;