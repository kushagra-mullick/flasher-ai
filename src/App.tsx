import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import UploadPage from './pages/UploadPage';
import FlashcardsPage from './pages/FlashcardsPage';
import NewsletterPage from './pages/NewsletterPage';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import TwoFactorSetupPage from './pages/auth/TwoFactorSetupPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import LibraryPage from './pages/LibraryPage';
import StudyPage from './pages/StudyPage';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Auth routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            
            {/* Main layout with header and footer */}
            <Route element={<Layout />}>
              {/* Public routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/newsletter" element={<NewsletterPage />} />
              
              {/* Protected routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/upload" element={<UploadPage />} />
                <Route path="/flashcards" element={<FlashcardsPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/two-factor-setup" element={<TwoFactorSetupPage />} />
                <Route path="/library" element={<LibraryPage />} />
                <Route path="/study" element={<StudyPage />} />
              </Route>
              
              {/* Redirect */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;