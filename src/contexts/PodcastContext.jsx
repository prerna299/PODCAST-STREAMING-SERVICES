import { createContext, useState, useContext } from 'react';
import { podcastData } from '../assets/podcastData';

// Create podcast context
const PodcastContext = createContext(null);

export const usePodcast = () => useContext(PodcastContext);

export const PodcastProvider = ({ children }) => {
  const [podcasts, setPodcasts] = useState(podcastData);
  const [currentPodcast, setCurrentPodcast] = useState(null);
  const [currentEpisode, setCurrentEpisode] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [favorites, setFavorites] = useState([]);

  // Get a specific podcast by ID
  const getPodcast = (id) => {
    return podcasts.find(podcast => podcast.id === parseInt(id));
  };

  // Get a specific episode by podcast ID and episode ID
  const getEpisode = (podcastId, episodeId) => {
    const podcast = getPodcast(podcastId);
    if (!podcast) return null;
    return podcast.episodes.find(episode => episode.id === parseInt(episodeId));
  };

  // Add a new podcast (CRUD - Create)
  const addPodcast = (newPodcast) => {
    const podcastWithId = {
      ...newPodcast,
      id: Math.max(...podcasts.map(p => p.id)) + 1,
      episodes: []
    };
    setPodcasts([...podcasts, podcastWithId]);
    return podcastWithId;
  };

  // Update an existing podcast (CRUD - Update)
  const updatePodcast = (id, updatedData) => {
    setPodcasts(podcasts.map(podcast => 
      podcast.id === parseInt(id) ? { ...podcast, ...updatedData } : podcast
    ));
  };

  // Delete a podcast (CRUD - Delete)
  const deletePodcast = (id) => {
    setPodcasts(podcasts.filter(podcast => podcast.id !== parseInt(id)));
    if (currentPodcast && currentPodcast.id === parseInt(id)) {
      setCurrentPodcast(null);
      setCurrentEpisode(null);
      setIsPlaying(false);
    }
  };

  // Add an episode to a podcast
  const addEpisode = (podcastId, newEpisode) => {
    setPodcasts(podcasts.map(podcast => {
      if (podcast.id === parseInt(podcastId)) {
        const episodeWithId = {
          ...newEpisode,
          id: podcast.episodes.length > 0 
            ? Math.max(...podcast.episodes.map(e => e.id)) + 1 
            : podcast.id * 100 + 1
        };
        return {
          ...podcast,
          episodes: [...podcast.episodes, episodeWithId]
        };
      }
      return podcast;
    }));
  };

  // Update an episode
  const updateEpisode = (podcastId, episodeId, updatedData) => {
    setPodcasts(podcasts.map(podcast => {
      if (podcast.id === parseInt(podcastId)) {
        return {
          ...podcast,
          episodes: podcast.episodes.map(episode => 
            episode.id === parseInt(episodeId) ? { ...episode, ...updatedData } : episode
          )
        };
      }
      return podcast;
    }));
  };

  // Delete an episode
  const deleteEpisode = (podcastId, episodeId) => {
    setPodcasts(podcasts.map(podcast => {
      if (podcast.id === parseInt(podcastId)) {
        return {
          ...podcast,
          episodes: podcast.episodes.filter(episode => episode.id !== parseInt(episodeId))
        };
      }
      return podcast;
    }));
    
    if (currentEpisode && currentEpisode.id === parseInt(episodeId)) {
      setCurrentEpisode(null);
      setIsPlaying(false);
    }
  };

  // Play an episode
  const playEpisode = (podcastId, episodeId) => {
    const podcast = getPodcast(podcastId);
    const episode = getEpisode(podcastId, episodeId);
    
    if (podcast && episode) {
      setCurrentPodcast(podcast);
      setCurrentEpisode(episode);
      setIsPlaying(true);
    }
  };

  // Toggle play/pause
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // Toggle favorite status for a podcast
  const toggleFavorite = (podcastId) => {
    if (favorites.includes(podcastId)) {
      setFavorites(favorites.filter(id => id !== podcastId));
    } else {
      setFavorites([...favorites, podcastId]);
    }
  };

  // Get favorite podcasts
  const getFavorites = () => {
    return podcasts.filter(podcast => favorites.includes(podcast.id));
  };

  const value = {
    podcasts,
    currentPodcast,
    currentEpisode,
    isPlaying,
    favorites,
    getPodcast,
    getEpisode,
    addPodcast,
    updatePodcast,
    deletePodcast,
    addEpisode,
    updateEpisode,
    deleteEpisode,
    playEpisode,
    togglePlayPause,
    toggleFavorite,
    getFavorites
  };

  return (
    <PodcastContext.Provider value={value}>
      {children}
    </PodcastContext.Provider>
  );
};