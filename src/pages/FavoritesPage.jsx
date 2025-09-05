import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { usePodcast } from '../contexts/PodcastContext';
import { useAuth } from '../contexts/AuthContext';
import PodcastCard from '../components/PodcastCard';

const FavoritesPage = () => {
  const { getFavorites, favorites } = usePodcast();
  const { currentUser } = useAuth();
  const favoritePodcasts = getFavorites();
  
  // Check if user is logged in
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6 py-10">
        <div className="text-center max-w-md">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16 mx-auto text-gray-400 mb-4">
            <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
          </svg>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Login Required</h2>
          <p className="text-gray-600 mb-6">Please sign in to view and manage your favorite podcasts.</p>
          <div className="space-x-4">
            <Link to="/login" className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg font-medium">
              Login
            </Link>
            <Link to="/register" className="bg-white border border-purple-600 text-purple-600 hover:bg-purple-50 px-5 py-2 rounded-lg font-medium">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Favorites</h1>
        
        {favoritePodcasts.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-10 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16 mx-auto text-gray-300 mb-4">
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">No favorites yet</h2>
            <p className="text-gray-600 mb-6">Start exploring and add podcasts to your favorites.</p>
            <Link 
              to="/browse" 
              className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg font-medium inline-flex items-center"
            >
              Browse Podcasts
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 ml-1">
                <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favoritePodcasts.map(podcast => (
              <PodcastCard key={podcast.id} podcast={podcast} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;