import { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePodcast } from '../contexts/PodcastContext';
import PodcastCard from '../components/PodcastCard';

const HomePage = () => {
  const { podcasts } = usePodcast();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Get featured podcasts (could use rating or other criteria in a real app)
  const featuredPodcasts = podcasts.slice(0, 3);
  
  // Get recent podcasts (could be sorted by release date in a real app)
  const recentPodcasts = [...podcasts].sort(() => 0.5 - Math.random()).slice(0, 4);
  
  // Filter podcasts based on search query
  const filteredPodcasts = podcasts.filter(podcast => 
    podcast.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    podcast.host.toLowerCase().includes(searchQuery.toLowerCase()) ||
    podcast.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    podcast.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Get unique categories
  const categories = [...new Set(podcasts.map(podcast => podcast.category))];
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-800 to-indigo-900 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Discover Your Next Favorite Podcast</h1>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Stream thousands of podcasts on-demand. Find what moves you, entertains you, and keeps you informed.
          </p>
          
          <div className="max-w-2xl mx-auto relative">
            <input 
              type="text" 
              placeholder="Search for podcasts, hosts, or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-3 px-4 rounded-lg text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-purple-800">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-6 py-10">
        {/* Search Results */}
        {searchQuery && (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Search Results for "{searchQuery}"</h2>
            
            {filteredPodcasts.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-lg text-gray-600">No podcasts found. Try a different search term.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredPodcasts.map(podcast => (
                  <PodcastCard key={podcast.id} podcast={podcast} />
                ))}
              </div>
            )}
          </div>
        )}
        
        {/* Featured Section (only show if not searching) */}
        {!searchQuery && (
          <div className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">Featured Podcasts</h2>
              <Link to="/browse" className="text-purple-700 hover:text-purple-900 font-medium flex items-center">
                View All
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 ml-1">
                  <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredPodcasts.map(podcast => (
                <PodcastCard key={podcast.id} podcast={podcast} />
              ))}
            </div>
          </div>
        )}
        
        {/* Recent Podcasts (only show if not searching) */}
        {!searchQuery && (
          <div className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">Recent Episodes</h2>
              <Link to="/browse" className="text-purple-700 hover:text-purple-900 font-medium flex items-center">
                View All
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 ml-1">
                  <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {recentPodcasts.map(podcast => (
                <PodcastCard key={podcast.id} podcast={podcast} />
              ))}
            </div>
          </div>
        )}
        
        {/* Categories Section */}
        {!searchQuery && (
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Browse Categories</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {categories.map(category => (
                <Link 
                  key={category} 
                  to={`/category/${category.toLowerCase()}`}
                  className="bg-white rounded-lg shadow-sm p-6 text-center hover:shadow-md transition-shadow duration-200"
                >
                  <h3 className="text-lg font-medium text-gray-800">{category}</h3>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;