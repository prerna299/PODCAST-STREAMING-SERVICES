import { useState, useRef, useEffect } from 'react';
import { usePodcast } from '../contexts/PodcastContext';

const AudioPlayer = () => {
  const { currentPodcast, currentEpisode, isPlaying, togglePlayPause } = usePodcast();
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.75);
  const audioRef = useRef(null);
  
  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying, currentEpisode]);
  
  useEffect(() => {
    // Reset player state when changing episodes
    if (currentEpisode) {
      setCurrentTime(0);
      setDuration(0);
      
      if (isPlaying) {
        audioRef.current?.play();
      }
    }
  }, [currentEpisode]);
  
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };
  
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };
  
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };
  
  const handleSeek = (e) => {
    const seekTime = parseFloat(e.target.value);
    setCurrentTime(seekTime);
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime;
    }
  };
  
  const formatTime = (timeInSeconds) => {
    if (isNaN(timeInSeconds)) return '0:00';
    
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  
  if (!currentPodcast || !currentEpisode) {
    return null;
  }
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="container mx-auto px-4 py-2">
        <div className="flex flex-col md:flex-row items-center">
          {/* Episode Info */}
          <div className="flex items-center w-full md:w-1/4 mb-3 md:mb-0">
            <img 
              src={currentPodcast.coverImage}
              alt={currentPodcast.title}
              className="w-12 h-12 rounded object-cover mr-3"
            />
            <div className="overflow-hidden">
              <h4 className="font-medium text-gray-900 text-sm truncate">{currentEpisode.title}</h4>
              <p className="text-xs text-gray-600 truncate">{currentPodcast.title}</p>
            </div>
          </div>
          
          {/* Controls and Progress */}
          <div className="w-full md:w-2/4 flex flex-col items-center">
            <div className="flex items-center space-x-4 mb-2">
              <button 
                className="text-gray-500 hover:text-gray-700 p-1"
                aria-label="Skip backwards 15 seconds"
                onClick={() => {
                  if (audioRef.current) {
                    audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 15);
                  }
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M9.53 2.47a.75.75 0 010 1.06L4.81 8.25H15a6.75 6.75 0 010 13.5h-3a.75.75 0 010-1.5h3a5.25 5.25 0 100-10.5H4.81l4.72 4.72a.75.75 0 11-1.06 1.06l-6-6a.75.75 0 010-1.06l6-6a.75.75 0 011.06 0z" clipRule="evenodd" />
                </svg>
              </button>
              
              <button 
                className="bg-purple-600 text-white rounded-full p-2.5 hover:bg-purple-700 flex items-center justify-center"
                onClick={togglePlayPause}
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="currentColor" 
                  className="w-6 h-6"
                >
                  {isPlaying ? (
                    <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0A.75.75 0 0115 4.5h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H15a.75.75 0 01-.75-.75V5.25z" clipRule="evenodd" />
                  ) : (
                    <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                  )}
                </svg>
              </button>
              
              <button 
                className="text-gray-500 hover:text-gray-700 p-1"
                aria-label="Skip forward 15 seconds"
                onClick={() => {
                  if (audioRef.current) {
                    audioRef.current.currentTime = Math.min(audioRef.current.duration, audioRef.current.currentTime + 15);
                  }
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M14.47 2.47a.75.75 0 011.06 0l6 6a.75.75 0 010 1.06l-6 6a.75.75 0 11-1.06-1.06l4.72-4.72H9a5.25 5.25 0 100 10.5h3a.75.75 0 010 1.5H9a6.75 6.75 0 010-13.5h10.19l-4.72-4.72a.75.75 0 010-1.06z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            
            <div className="w-full flex items-center space-x-3">
              <span className="text-xs text-gray-500 w-10 text-right">{formatTime(currentTime)}</span>
              <input
                type="range"
                min="0"
                max={duration || 100}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                aria-label="Seek slider"
              />
              <span className="text-xs text-gray-500 w-10">{formatTime(duration)}</span>
            </div>
          </div>
          
          {/* Volume Control */}
          <div className="w-full md:w-1/4 flex justify-end items-center mt-2 md:mt-0">
            <button 
              className="text-gray-500 hover:text-gray-700 p-1 mr-2"
              aria-label={volume === 0 ? "Unmute" : "Mute"}
              onClick={() => {
                const newVolume = volume === 0 ? 0.5 : 0;
                setVolume(newVolume);
                if (audioRef.current) {
                  audioRef.current.volume = newVolume;
                }
              }}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                className="w-5 h-5"
              >
                {volume === 0 ? (
                  <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06zM18.584 5.106a.75.75 0 011.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 11-1.06-1.06 8.25 8.25 0 000-11.668.75.75 0 010-1.06z" />
                ) : volume < 0.3 ? (
                  <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06zM10.25 8.5v7c0 .138.112.25.25.25h1.5a.25.25 0 00.25-.25v-7a.25.25 0 00-.25-.25h-1.5a.25.25 0 00-.25.25z" />
                ) : (
                  <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06zM18.584 5.106a.75.75 0 011.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 11-1.06-1.06 8.25 8.25 0 000-11.668.75.75 0 010-1.06z" />
                )}
              </svg>
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-24 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
              aria-label="Volume slider"
            />
          </div>
        </div>
      </div>
      
      {/* Audio element */}
      <audio
        ref={audioRef}
        src={currentEpisode.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => togglePlayPause()}
        hidden
      />
    </div>
  );
};

export default AudioPlayer;