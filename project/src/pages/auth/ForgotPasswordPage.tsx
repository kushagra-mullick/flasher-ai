import React from 'react';
import { motion } from 'framer-motion';
import ForgotPasswordForm from '../../components/auth/ForgotPasswordForm';
import { Brain } from 'lucide-react';

const ForgotPasswordPage: React.FC = () => {
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
          Reset your password
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          We'll send you instructions to reset your password
        </p>
      </motion.div>

      <ForgotPasswordForm />
    </div>
  );
};

export default ForgotPasswordPage;