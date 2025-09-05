import { Link } from 'react-router-dom';
import { usePodcast } from '../contexts/PodcastContext';

const PodcastCard = ({ podcast }) => {
  const { toggleFavorite, favorites, playEpisode } = usePodcast();
  const isFavorite = favorites.includes(podcast.id);
  
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative">
        <img 
          src={podcast.coverImage} 
          alt={`${podcast.title} cover`}
          className="w-full h-48 object-cover"
        />
        <button 
          onClick={(e) => {
            e.preventDefault();
            toggleFavorite(podcast.id);
          }}
          className="absolute top-3 right-3 bg-white bg-opacity-70 rounded-full p-1.5 hover:bg-opacity-100 transition-all duration-200"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill={isFavorite ? "currentColor" : "none"} 
            stroke="currentColor" 
            className={`w-5 h-5 ${isFavorite ? 'text-red-500' : 'text-gray-600'}`}
            strokeWidth={isFavorite ? "0" : "2"}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
        </button>
      </div>
      
      <div className="p-4">
        <Link to={`/podcast/${podcast.id}`}>
          <h3 className="font-semibold text-lg text-gray-800 mb-1 hover:text-purple-700 transition-colors">{podcast.title}</h3>
        </Link>
        <p className="text-sm text-gray-600 mb-2">Hosted by {podcast.host}</p>
        <div className="flex items-center text-xs text-gray-500 mb-3">
          <span className="bg-gray-100 rounded-full px-2 py-1">{podcast.category}</span>
          <span className="ml-2">{podcast.episodes.length} episodes</span>
        </div>
        <p className="text-sm text-gray-700 line-clamp-2">{podcast.description}</p>
      </div>
      
      <div className="px-4 py-3 bg-gray-50 flex justify-between items-center">
        <Link 
          to={`/podcast/${podcast.id}`}
          className="text-purple-700 hover:text-purple-900 text-sm font-medium flex items-center"
        >
          View Details
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 ml-1">
            <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
          </svg>
        </Link>
        <button
          className="flex items-center text-sm font-medium text-gray-700 hover:text-purple-700"
          onClick={(e) => {
            e.preventDefault();
            // Play the first episode of the podcast
            if (podcast.episodes.length > 0) {
              playEpisode(podcast.id, podcast.episodes[0].id);
            }
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-1">
            <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
          </svg>
          Play
        </button>
      </div>
    </div>
  );
};

export default PodcastCard;