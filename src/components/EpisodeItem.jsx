import { usePodcast } from '../contexts/PodcastContext';

const EpisodeItem = ({ episode, podcastId }) => {
  const { playEpisode, currentEpisode, isPlaying, togglePlayPause } = usePodcast();
  const isCurrentEpisode = currentEpisode && currentEpisode.id === episode.id;
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  return (
    <div className={`border-b border-gray-200 py-3 hover:bg-gray-50 transition-colors ${isCurrentEpisode ? 'bg-purple-50' : ''}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button 
            onClick={() => isCurrentEpisode ? togglePlayPause() : playEpisode(podcastId, episode.id)} 
            className={`mr-4 rounded-full p-2.5 flex items-center justify-center ${isCurrentEpisode ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-purple-100'}`}
            aria-label={isCurrentEpisode && isPlaying ? "Pause episode" : "Play episode"}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="currentColor" 
              className="w-5 h-5"
            >
              {isCurrentEpisode && isPlaying ? (
                <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0A.75.75 0 0115 4.5h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H15a.75.75 0 01-.75-.75V5.25z" clipRule="evenodd" />
              ) : (
                <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
              )}
            </svg>
          </button>
          
          <div>
            <h3 className="font-medium text-gray-900">{episode.title}</h3>
            <div className="flex items-center mt-1 text-sm text-gray-500">
              <span>{episode.duration}</span>
              <span className="mx-2">•</span>
              <span>{formatDate(episode.releaseDate)}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button 
            className="text-gray-400 hover:text-gray-600 p-1.5"
            aria-label="Share episode"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
              <path d="M13 4.5a2.5 2.5 0 11.702 1.737L6.97 9.604a2.518 2.518 0 010 .792l6.733 3.367a2.5 2.5 0 11-.671 1.341l-6.733-3.367a2.5 2.5 0 110-3.475l6.733-3.366A2.52 2.52 0 0113 4.5z" />
            </svg>
          </button>
          <button 
            className="text-gray-400 hover:text-gray-600 p-1.5"
            aria-label="Download episode"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
              <path d="M10.75 2.75a.75.75 0 00-1.5 0v8.614L6.295 8.235a.75.75 0 10-1.09 1.03l4.25 4.5a.75.75 0 001.09 0l4.25-4.5a.75.75 0 00-1.09-1.03l-2.955 3.129V2.75z" />
              <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EpisodeItem;