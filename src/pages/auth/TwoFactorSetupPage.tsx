import React from 'react';
import { motion } from 'framer-motion';
import TwoFactorSetup from '../../components/auth/TwoFactorSetup';
import { Brain } from 'lucide-react';

const TwoFactorSetupPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="sm:mx-auto sm:w-full sm:max-w-md mb-8"
      >
        <div className="flex justify-center">
          <Brain className="h-12 w-12 text-indigo-600" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          Secure Your Account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Add an extra layer of security with two-factor authentication
        </p>
      </motion.div>

      <TwoFactorSetup />
    </div>
  );
};

export default TwoFactorSetupPage;