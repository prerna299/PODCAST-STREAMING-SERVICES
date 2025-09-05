import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePodcast } from '../contexts/PodcastContext';
import { useAuth } from '../contexts/AuthContext';
import EpisodeItem from '../components/EpisodeItem';

const PodcastDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getPodcast, toggleFavorite, favorites, playEpisode } = usePodcast();
  const { currentUser } = useAuth();
  const [podcast, setPodcast] = useState(null);
  const [showShareOptions, setShowShareOptions] = useState(false);
  
  useEffect(() => {
    const podcastData = getPodcast(id);
    if (podcastData) {
      setPodcast(podcastData);
    } else {
      navigate('/not-found');
    }
  }, [id, getPodcast, navigate]);
  
  if (!podcast) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }
  
  const isFavorite = favorites.includes(podcast.id);
  
  const handlePlay = () => {
    if (podcast.episodes.length > 0) {
      playEpisode(podcast.id, podcast.episodes[0].id);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-6">
        <div className="mb-8">
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center text-purple-700 hover:text-purple-900 font-medium"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-1">
              <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
            </svg>
            Back
          </button>
        </div>
        
        {/* Podcast Header */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="md:flex">
            <div className="md:flex-shrink-0 md:w-1/3 lg:w-1/4">
              <img 
                className="h-full w-full object-cover" 
                src={podcast.coverImage} 
                alt={`${podcast.title} cover`}
              />
            </div>
            <div className="p-8 w-full md:w-2/3 lg:w-3/4">
              <div className="flex justify-between items-start">
                <div>
                  <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full">{podcast.category}</span>
                  <h1 className="text-3xl font-bold text-gray-900 mt-2">{podcast.title}</h1>
                  <p className="text-gray-600 mt-1">Hosted by {podcast.host}</p>
                </div>
                
                <div className="flex space-x-2">
                  <button 
                    onClick={() => toggleFavorite(podcast.id)} 
                    className={`p-2 rounded-full ${isFavorite ? 'bg-red-50 text-red-500' : 'bg-gray-100 text-gray-500'} hover:bg-opacity-80`}
                    aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 24 24" 
                      fill={isFavorite ? "currentColor" : "none"}
                      stroke="currentColor"
                      className="w-5 h-5"
                      strokeWidth={isFavorite ? "0" : "2"}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg>
                  </button>
                  <div className="relative">
                    <button 
                      onClick={() => setShowShareOptions(!showShareOptions)}
                      className="p-2 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200"
                      aria-label="Share podcast"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                        <path d="M13 4.5a2.5 2.5 0 11.702 1.737L6.97 9.604a2.518 2.518 0 010 .792l6.733 3.367a2.5 2.5 0 11-.671 1.341l-6.733-3.367a2.5 2.5 0 110-3.475l6.733-3.366A2.52 2.52 0 0113 4.5z" />
                      </svg>
                    </button>
                    {showShareOptions && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                        <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Copy Link</button>
                        <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Share on Twitter</button>
                        <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Share on Facebook</button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <p className="mt-4 text-gray-700">{podcast.description}</p>
              
              <div className="mt-6 flex space-x-3">
                <button 
                  onClick={handlePlay}
                  disabled={podcast.episodes.length === 0}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2">
                    <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                  </svg>
                  Play Latest Episode
                </button>
                
                {currentUser && (
                  <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg flex items-center font-medium">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2">
                      <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clipRule="evenodd" />
                    </svg>
                    Subscribe
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Episodes List */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Episodes</h2>
            
            {podcast.episodes.length === 0 ? (
              <p className="text-gray-600 py-4">No episodes available yet.</p>
            ) : (
              <div className="divide-y divide-gray-200">
                {podcast.episodes.map(episode => (
                  <EpisodeItem 
                    key={episode.id} 
                    episode={episode} 
                    podcastId={podcast.id}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PodcastDetailPage;