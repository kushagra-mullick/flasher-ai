import React from 'react';
import { Shield, Lock, Eye } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-12">Privacy Policy</h1>
      
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <div className="text-center p-6 bg-white rounded-lg shadow-lg">
          <Shield className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Data Protection</h3>
          <p className="text-gray-600">Your data is encrypted and securely stored on our servers.</p>
        </div>
        
        <div className="text-center p-6 bg-white rounded-lg shadow-lg">
          <Lock className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Secure Access</h3>
          <p className="text-gray-600">We use industry-standard security measures to protect your information.</p>
        </div>
        
        <div className="text-center p-6 bg-white rounded-lg shadow-lg">
          <Eye className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Privacy First</h3>
          <p className="text-gray-600">We never share your personal data with third parties.</p>
        </div>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
          <p className="text-gray-600 mb-4">
            We collect information that you provide directly to us, including:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Account information (email, name)</li>
            <li>Study materials and flashcards you create</li>
            <li>Usage data to improve our services</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
          <p className="text-gray-600 mb-4">
            We use the information we collect to:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Provide and improve our services</li>
            <li>Personalize your learning experience</li>
            <li>Send important updates and notifications</li>
            <li>Analyze and optimize our platform</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
          <p className="text-gray-600 mb-4">
            You have the right to:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Access your personal data</li>
            <li>Request data correction or deletion</li>
            <li>Opt-out of marketing communications</li>
            <li>Export your data</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p className="text-gray-600">
            If you have any questions about our privacy policy or data practices, please contact us at:
            <br />
            <a href="mailto:privacy@flasher.ai" className="text-indigo-600 hover:text-indigo-700">
              privacy@flasher.ai
            </a>
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;