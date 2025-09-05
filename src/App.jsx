import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { PodcastProvider } from './contexts/PodcastContext';
import Header from './components/Header';
import Footer from './components/Footer';
import AudioPlayer from './components/AudioPlayer';
import HomePage from './pages/HomePage';
import BrowsePage from './pages/BrowsePage';
import PodcastDetailPage from './pages/PodcastDetailPage';
import FavoritesPage from './pages/FavoritesPage';
import DashboardPage from './pages/DashboardPage';
import { Login, Register } from './pages/AuthPages';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <AuthProvider>
      <PodcastProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <Header />
            
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/browse" element={<BrowsePage />} />
                <Route path="/podcast/:id" element={<PodcastDetailPage />} />
                <Route path="/favorites" element={<FavoritesPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
            
            <Footer />
            <AudioPlayer />
          </div>
        </Router>
      </PodcastProvider>
    </AuthProvider>
  );
}

export default App;