import React, { useState,useEffect } from 'react';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import Playlist from './components/Playlist';
import { searchSpotify } from './api/spotifySearch';
import { getSpotifyToken } from './api/spotifyApi';


const getStoredToken = () => {
  return localStorage.getItem('spotifyAccessToken');
};

// Función para almacenar el token en el almacenamiento local
const storeToken = (token: string) => {
  localStorage.setItem('spotifyAccessToken', token);
};



function App() {

    

  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [playlist, setPlaylist] = useState<any[]>([]);
  const [playlistName, setPlaylistName] = useState('New Playlist');
  const [accessToken, setAccessToken] = useState<string | null>(null);
  
  const redirectToSpotifyAuthorization = () => {
    const clientId = '766cb52937e64b7da18cd9ce55020794';
    const redirectUri = 'http://localhost:5173/'
    const scopes = 'playlist-modify-public playlist-modify-private';
    const responseType = 'code';
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=${responseType}&scope=${encodeURIComponent(scopes)}`;
    window.location.href = authUrl;
};
const handleAuthorizationCode = async (code: string) => {
  try {
      const token = await getSpotifyToken(code);
      if (token) {
          storeToken(token); // Almacenar el token en el almacenamiento local
          setAccessToken(token);
      }
  } catch (error) {
      console.error('Error al intercambiar el código por un token', error);
  }
};

// Verificar el token almacenado al iniciar la aplicación
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
      console.error('No se ha obtenido un token de acceso');
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
    localStorage.removeItem('spotifyAccessToken'); // Eliminar el token de localStorage
    setAccessToken(null); // Actualizar el estado para que ya no tenga un token
  };


  return (
    <div>
      <h1>Jammming</h1>
      <SearchBar onSearch={handleSearch} />
      <div>
        <SearchResults results={searchResults} onAdd={addTrackToPlaylist} />
        <Playlist
          name={playlistName}
          tracks={playlist}
          onRemove={removeTrackFromPlaylist}
          onNameChange={updatePlaylistName}
          accessToken={accessToken}
        />
        <button onClick={redirectToSpotifyAuthorization}>Login with Spotify</button>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  )
}

export default App
