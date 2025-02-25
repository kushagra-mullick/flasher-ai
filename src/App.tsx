import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import UploadPage from './pages/UploadPage';
import FlashcardsPage from './pages/FlashcardsPage';
import NewsletterPage from './pages/NewsletterPage';
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
          <Navigation />
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/flashcards" element={<FlashcardsPage />} />
            <Route path="/newsletter" element={<NewsletterPage />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;