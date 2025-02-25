import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Brain, FileText, Download, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const createSectionRef = useRef<HTMLDivElement>(null);

  const scrollToCreate = () => {
    createSectionRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
          Transform Your Learning with AI
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Create, study, and master any subject with AI-powered flashcards
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        <FeatureCard
          icon={<Brain className="w-8 h-8" />}
          title="AI-Powered"
          description="Smart flashcard generation from any content"
        />
        <FeatureCard
          icon={<FileText className="w-8 h-8" />}
          title="PDF Import"
          description="Convert PDFs into flashcards instantly"
        />
        <FeatureCard
          icon={<Download className="w-8 h-8" />}
          title="Export Options"
          description="Download as PDF, CSV, or JSON"
        />
        <FeatureCard
          icon={<Mail className="w-8 h-8" />}
          title="Newsletter"
          description="Weekly study tips and updates"
        />
      </div>

      <div className="flex justify-center space-x-6 mb-32">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToCreate}
          className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Get Started
        </motion.button>
        <Link
          to="/newsletter"
          className="px-8 py-3 bg-white text-indigo-600 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Subscribe
        </Link>
      </div>

      {/* Create Section */}
      <div ref={createSectionRef} className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Create Your Flashcards
        </h2>
        <div className="space-y-6">
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Upload PDF
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Convert your PDF documents into interactive flashcards instantly
            </p>
            <Link
              to="/upload"
              className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <FileText className="w-5 h-5 mr-2" />
              Upload PDF
            </Link>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Create Manually
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Create your own flashcards with our easy-to-use editor
            </p>
            <Link
              to="/flashcards"
              className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Brain className="w-5 h-5 mr-2" />
              Create Cards
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
  >
    <div className="text-indigo-600 dark:text-indigo-400 mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
      {title}
    </h3>
    <p className="text-gray-600 dark:text-gray-300">
      {description}
    </p>
  </motion.div>
);

export default HomePage;