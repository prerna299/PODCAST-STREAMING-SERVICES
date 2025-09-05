import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-gradient-to-r from-purple-800 to-indigo-900 text-white py-4 px-6 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 mr-2">
            <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
          </svg>
          PodcastHub
        </Link>
        
        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="hover:text-purple-300 transition duration-200">Home</Link>
          <Link to="/browse" className="hover:text-purple-300 transition duration-200">Browse</Link>
          <Link to="/favorites" className="hover:text-purple-300 transition duration-200">Favorites</Link>
          
          {currentUser ? (
            <div className="flex items-center space-x-4">
              <Link to="/dashboard" className="hover:text-purple-300 transition duration-200">Dashboard</Link>
              <div className="relative group">
                <button className="flex items-center space-x-1">
                  <span>{currentUser.name}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                  </svg>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-200 z-10">
                  <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">Profile</Link>
                  <Link to="/settings" className="block px-4 py-2 hover:bg-gray-100">Settings</Link>
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-gray-100">Logout</button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex space-x-4">
              <Link to="/login" className="px-4 py-2 rounded-lg hover:bg-purple-700 transition duration-200">Login</Link>
              <Link to="/register" className="bg-white text-purple-800 px-4 py-2 rounded-lg hover:bg-gray-100 transition duration-200">Sign Up</Link>
            </div>
          )}
        </div>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden text-white focus:outline-none" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"} />
          </svg>
        </button>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 px-6 py-3 bg-purple-900 rounded-lg">
          <div className="flex flex-col space-y-3">
            <Link to="/" className="hover:text-purple-300" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/browse" className="hover:text-purple-300" onClick={() => setIsMenuOpen(false)}>Browse</Link>
            <Link to="/favorites" className="hover:text-purple-300" onClick={() => setIsMenuOpen(false)}>Favorites</Link>
            
            {currentUser ? (
              <>
                <Link to="/dashboard" className="hover:text-purple-300" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
                <Link to="/profile" className="hover:text-purple-300" onClick={() => setIsMenuOpen(false)}>Profile</Link>
                <Link to="/settings" className="hover:text-purple-300" onClick={() => setIsMenuOpen(false)}>Settings</Link>
                <button onClick={handleLogout} className="text-left hover:text-purple-300">Logout</button>
              </>
            ) : (
              <div className="flex flex-col space-y-2">
                <Link to="/login" className="px-4 py-2 rounded-lg hover:bg-purple-700 border border-white text-center" onClick={() => setIsMenuOpen(false)}>Login</Link>
                <Link to="/register" className="bg-white text-purple-800 px-4 py-2 rounded-lg hover:bg-gray-100 text-center" onClick={() => setIsMenuOpen(false)}>Sign Up</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;