import  { useState,useEffect } from 'react';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import Playlist from './components/Playlist';
import { searchSpotify } from './api/spotifySearch';
import { getSpotifyToken } from './api/spotifyApi';


const getStoredToken = () => {
  return localStorage.getItem('spotifyAccessToken');
};

const storeToken = (token: string) => {
  localStorage.setItem('spotifyAccessToken', token);
};



function App() {

    

  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [playlist, setPlaylist] = useState<any[]>([]);
  const [playlistName, setPlaylistName] = useState('New Playlist');
  const [accessToken, setAccessToken] = useState<string | null>(null);
  
  const redirectToSpotifyAuthorization = () => {
    const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID
    const redirectUri = 'https://jamming-hayai.netlify.app/'
    const scopes = 'playlist-modify-public playlist-modify-private';
    const responseType = 'code';
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=${responseType}&scope=${encodeURIComponent(scopes)}`;
    window.location.href = authUrl;
};


const handleAuthorizationCode = async (code: string) => {
  try {
      const token = await getSpotifyToken(code);
      if (token) {
          storeToken(token); 
          setAccessToken(token);
      }
  } catch (error) {
      console.error('Error al intercambiar el código por un token', error);
  }
};

useEffect(() => {
  const storedToken = getStoredToken();
  if (storedToken) {
      setAccessToken(storedToken);
  } else {
      const queryParams = new URLSearchParams(window.location.search);
      const code = queryParams.get('code');
      if (code) {
          handleAuthorizationCode(code);
      }
  }
}, []);


const handleSearch = async (query: string) => {
  if (accessToken) {
    const results = await searchSpotify(query, accessToken);
    setSearchResults(results);
  } else {
    alert('You need to log in to search for tracks on Spotify.');
    console.error('No access token available.');
  }
};


  const addTrackToPlaylist = (track: any) => {
    setPlaylist([...playlist, track]);
  };

  const removeTrackFromPlaylist = (track: any) => {
    setPlaylist(playlist.filter(t => t.id !== track.id));
  };

  const updatePlaylistName = (name: string) => {
    setPlaylistName(name);
  };

  const logout = () => {
    localStorage.removeItem('spotifyAccessToken');

    setAccessToken(null);
    setSearchResults([]);
    setPlaylist([]);
    setPlaylistName('New Playlist');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white w-full">
    <div className="container mx-auto py-8 px-4">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-5xl font-bold text-green-500 mb-4">Jammming</h1>
        <p className="text-gray-400 text-lg">Create and share your Spotify playlists</p>
      </header>
  
      {/* Search Bar */}
      <div className="mb-8">
        <SearchBar onSearch={handleSearch} />
      </div>
  
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Search Results */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Search Results</h2>
          <SearchResults results={searchResults} onAdd={addTrackToPlaylist} />
        </div>
  
        {/* Playlist */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">{playlistName}</h2>
          <Playlist
            name={playlistName}
            tracks={playlist}
            onRemove={removeTrackFromPlaylist}
            onNameChange={updatePlaylistName}
            accessToken={accessToken}
            setTracks={setPlaylist}
          />
        </div>
      </div>
  
      {/* Login/Logout Buttons */}
      <div className="mt-8 text-center">
        {!accessToken ? (
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-lg"
            onClick={redirectToSpotifyAuthorization}
          >
            Login with Spotify
          </button>
        ) : (
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg shadow-lg"
            onClick={logout}
          >
            Logout
          </button>
        )}
      </div>
    </div>
  </div>
  
  )
}

export default App
