import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import Playlist from './components/Playlist';
import { searchSpotify } from './api/spotifySearch';





function App() {

    

  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [playlist, setPlaylist] = useState<any[]>([]);
  const [playlistName, setPlaylistName] = useState('New Playlist');

  

  const handleSearch = async (query: string) => {
    const results = await searchSpotify(query);
    setSearchResults(results);
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
        />
      </div>
    </div>
  )
}

export default App
