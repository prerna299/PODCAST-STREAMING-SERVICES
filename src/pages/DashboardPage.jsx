import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { usePodcast } from '../contexts/PodcastContext';
import { useAuth } from '../contexts/AuthContext';

const DashboardPage = () => {
  const { currentUser } = useAuth();
  const { podcasts, addPodcast, updatePodcast, deletePodcast, addEpisode } = usePodcast();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('podcasts');
  const [isAddingPodcast, setIsAddingPodcast] = useState(false);
  const [isAddingEpisode, setIsAddingEpisode] = useState(false);
  const [selectedPodcast, setSelectedPodcast] = useState(null);
  
  // Form states
  const [podcastForm, setPodcastForm] = useState({
    title: '',
    host: '',
    description: '',
    category: '',
    coverImage: ''
  });
  
  const [episodeForm, setEpisodeForm] = useState({
    title: '',
    duration: '',
    releaseDate: new Date().toISOString().split('T')[0],
    audioUrl: ''
  });
  
  // Redirect if not logged in
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  
  // Handle podcast form changes
  const handlePodcastFormChange = (e) => {
    const { name, value } = e.target;
    setPodcastForm(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle episode form changes
  const handleEpisodeFormChange = (e) => {
    const { name, value } = e.target;
    setEpisodeForm(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Submit podcast form
  const handlePodcastSubmit = (e) => {
    e.preventDefault();
    
    if (selectedPodcast) {
      // Update existing podcast
      updatePodcast(selectedPodcast.id, podcastForm);
    } else {
      // Add new podcast
      addPodcast(podcastForm);
    }
    
    setIsAddingPodcast(false);
    setSelectedPodcast(null);
    setPodcastForm({
      title: '',
      host: '',
      description: '',
      category: '',
      coverImage: ''
    });
  };
  
  // Submit episode form
  const handleEpisodeSubmit = (e) => {
    e.preventDefault();
    
    if (selectedPodcast) {
      addEpisode(selectedPodcast.id, episodeForm);
    }
    
    setIsAddingEpisode(false);
    setEpisodeForm({
      title: '',
      duration: '',
      releaseDate: new Date().toISOString().split('T')[0],
      audioUrl: ''
    });
  };
  
  // Edit a podcast
  const handleEditPodcast = (podcast) => {
    setSelectedPodcast(podcast);
    setPodcastForm({
      title: podcast.title,
      host: podcast.host,
      description: podcast.description,
      category: podcast.category,
      coverImage: podcast.coverImage
    });
    setIsAddingPodcast(true);
  };
  
  // Add episode to a podcast
  const handleAddEpisode = (podcast) => {
    setSelectedPodcast(podcast);
    setIsAddingEpisode(true);
  };
  
  // Cancel forms
  const handleCancel = () => {
    setIsAddingPodcast(false);
    setIsAddingEpisode(false);
    setSelectedPodcast(null);
    setPodcastForm({
      title: '',
      host: '',
      description: '',
      category: '',
      coverImage: ''
    });
    setEpisodeForm({
      title: '',
      duration: '',
      releaseDate: new Date().toISOString().split('T')[0],
      audioUrl: ''
    });
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
        
        {/* Dashboard Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`px-4 py-2 font-medium ${activeTab === 'podcasts' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('podcasts')}
          >
            Your Podcasts
          </button>
          <button
            className={`px-4 py-2 font-medium ${activeTab === 'analytics' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('analytics')}
          >
            Analytics
          </button>
          <button
            className={`px-4 py-2 font-medium ${activeTab === 'settings' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('settings')}
          >
            Settings
          </button>
        </div>
        
        {/* Podcasts Tab */}
        {activeTab === 'podcasts' && (
          <div>
            {isAddingPodcast ? (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">
                  {selectedPodcast ? 'Edit Podcast' : 'Add New Podcast'}
                </h2>
                <form onSubmit={handlePodcastSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                      <input
                        type="text"
                        name="title"
                        value={podcastForm.title}
                        onChange={handlePodcastFormChange}
                        required
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Host</label>
                      <input
                        type="text"
                        name="host"
                        value={podcastForm.host}
                        onChange={handlePodcastFormChange}
                        required
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                      <select
                        name="category"
                        value={podcastForm.category}
                        onChange={handlePodcastFormChange}
                        required
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        <option value="">Select a category</option>
                        <option value="Technology">Technology</option>
                        <option value="Business">Business</option>
                        <option value="Science">Science</option>
                        <option value="Health">Health</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Education">Education</option>
                        <option value="Sports">Sports</option>
                        <option value="News">News</option>
                        <option value="Crime">Crime</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image URL</label>
                      <input
                        type="url"
                        name="coverImage"
                        value={podcastForm.coverImage}
                        onChange={handlePodcastFormChange}
                        required
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                      <textarea
                        name="description"
                        value={podcastForm.description}
                        onChange={handlePodcastFormChange}
                        required
                        rows="4"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                    >
                      {selectedPodcast ? 'Update Podcast' : 'Add Podcast'}
                    </button>
                  </div>
                </form>
              </div>
            ) : isAddingEpisode ? (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">
                  Add Episode to "{selectedPodcast?.title}"
                </h2>
                <form onSubmit={handleEpisodeSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                      <input
                        type="text"
                        name="title"
                        value={episodeForm.title}
                        onChange={handleEpisodeFormChange}
                        required
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Duration (MM:SS)</label>
                      <input
                        type="text"
                        name="duration"
                        value={episodeForm.duration}
                        onChange={handleEpisodeFormChange}
                        required
                        pattern="[0-9]+:[0-9]{2}"
                        placeholder="45:30"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Release Date</label>
                      <input
                        type="date"
                        name="releaseDate"
                        value={episodeForm.releaseDate}
                        onChange={handleEpisodeFormChange}
                        required
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Audio URL</label>
                      <input
                        type="url"
                        name="audioUrl"
                        value={episodeForm.audioUrl}
                        onChange={handleEpisodeFormChange}
                        required
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="https://example.com/audio.mp3"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                    >
                      Add Episode
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-800">Your Podcasts</h2>
                  <button
                    onClick={() => setIsAddingPodcast(true)}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-1">
                      <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                    </svg>
                    Add New Podcast
                  </button>
                </div>
                
                {podcasts.length === 0 ? (
                  <div className="bg-white rounded-lg shadow-md p-10 text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16 mx-auto text-gray-300 mb-4">
                      <path fillRule="evenodd" d="M8.25 3.75H19.5a.75.75 0 01.75.75v11.25a.75.75 0 01-1.5 0V6.31L5.03 20.03a.75.75 0 01-1.06-1.06L17.69 5.25H8.25a.75.75 0 010-1.5z" clipRule="evenodd" />
                    </svg>
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">No podcasts yet</h2>
                    <p className="text-gray-600 mb-6">Get started by creating your first podcast.</p>
                    <button
                      onClick={() => setIsAddingPodcast(true)}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg font-medium inline-flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-1">
                        <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                      </svg>
                      Create Podcast
                    </button>
                  </div>
                ) : (
                  <div className="overflow-x-auto bg-white rounded-lg shadow">
                    <table className="min-w-full">
                      <thead className="border-b">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Podcast</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Episodes</th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {podcasts.map(podcast => (
                          <tr key={podcast.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <img 
                                  src={podcast.coverImage} 
                                  alt={podcast.title}
                                  className="h-10 w-10 rounded object-cover mr-3"
                                />
                                <div>
                                  <div className="font-medium text-gray-900">{podcast.title}</div>
                                  <div className="text-sm text-gray-500">by {podcast.host}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800">
                                {podcast.category}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                              {podcast.episodes.length} episodes
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                              <button 
                                onClick={() => handleAddEpisode(podcast)}
                                className="text-indigo-600 hover:text-indigo-900"
                              >
                                Add Episode
                              </button>
                              <button 
                                onClick={() => handleEditPodcast(podcast)}
                                className="text-blue-600 hover:text-blue-900"
                              >
                                Edit
                              </button>
                              <button 
                                onClick={() => {
                                  if (window.confirm('Are you sure you want to delete this podcast?')) {
                                    deletePodcast(podcast.id);
                                  }
                                }}
                                className="text-red-600 hover:text-red-900"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
        
        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-6">Analytics</h2>
            <div className="text-center py-10">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 mx-auto text-gray-400 mb-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
              </svg>
              <p className="text-gray-600">Analytics features are coming soon.</p>
            </div>
          </div>
        )}
        
        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-6">Account Settings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={currentUser.name}
                  disabled
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={currentUser.email}
                  disabled
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50"
                />
              </div>
              <div className="md:col-span-2">
                <button
                  className="px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50"
                >
                  Change Password
                </button>
              </div>
              <div className="md:col-span-2 border-t pt-4 mt-2">
                <h3 className="font-medium text-gray-900 mb-3">Danger Zone</h3>
                <button
                  className="px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50"
                >
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;