import { useState } from 'react';
import { usePodcast } from '../contexts/PodcastContext';
import PodcastCard from '../components/PodcastCard';

const BrowsePage = () => {
  const { podcasts } = usePodcast();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('title');
  
  // Get unique categories
  const categories = ['All', ...new Set(podcasts.map(podcast => podcast.category))];
  
  // Filter podcasts by category
  const filteredPodcasts = selectedCategory === 'All' 
    ? podcasts 
    : podcasts.filter(podcast => podcast.category === selectedCategory);
  
  // Sort podcasts
  const sortedPodcasts = [...filteredPodcasts].sort((a, b) => {
    if (sortBy === 'title') {
      return a.title.localeCompare(b.title);
    } else if (sortBy === 'episodes') {
      return b.episodes.length - a.episodes.length;
    } else {
      return 0;
    }
  });
  
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Browse Podcasts</h1>
        
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 space-y-4 md:space-y-0">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  selectedCategory === category
                    ? 'bg-purple-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          
          {/* Sort Options */}
          <div className="flex items-center">
            <label htmlFor="sort" className="text-gray-700 mr-2">Sort by:</label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-gray-300 text-gray-700 rounded-lg focus:ring-purple-500 focus:border-purple-500 py-2 px-3"
            >
              <option value="title">Title (A-Z)</option>
              <option value="episodes">Most Episodes</option>
            </select>
          </div>
        </div>
        
        {/* Podcasts Grid */}
        {sortedPodcasts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No podcasts found for the selected category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedPodcasts.map(podcast => (
              <PodcastCard key={podcast.id} podcast={podcast} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowsePage;