import React, { useState, useEffect } from "react";
import { savePlaylistToSpotify } from "../api/SavePlaylist";

interface PlaylistProps {
    name: string;
    tracks: any[];
    onRemove: (track: any) => void;
    onNameChange: (name: string) => void;
    accessToken: string | null;
    setTracks: (tracks: any[]) => void; 
}

const Playlist: React.FC<PlaylistProps> = ({ name, tracks, onRemove, onNameChange, accessToken, setTracks }) => {
    const [editing, setEditing] = useState(false);
    const [newName, setNewName] = useState(name);
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        setNewName(name);
    }, [name]);

    const handleSaveToSpotify = async () => {
        if (accessToken) {
            await savePlaylistToSpotify(newName, tracks, accessToken);
            setSuccessMessage("¡Lista de reproducción guardada exitosamente en Spotify!");
          setTracks([])
        } else {
            console.error('No se ha obtenido un token de acceso');
        }
    };

    const handleNameChange = () => {
        if (newName.trim() === "") {
            setNewName(name);
        } else {
            onNameChange(newName);
        }
        setEditing(false);
    };

    return (
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg mb-4">
            {editing ? (
                <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    onBlur={handleNameChange}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') handleNameChange();
                    }}
                    className="border border-gray-600 rounded p-2 w-full bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                />
            ) : (
                <h2
                    onClick={() => setEditing(true)}
                    className="text-2xl font-bold text-green-500 cursor-pointer hover:text-green-400"
                >
                    {name}
                </h2>
            )}
            {successMessage && (
                <div className="mt-2 text-green-400">{successMessage}</div>
            )}
            <ul className="mt-2 space-y-2">
                {tracks.map((track) => (
                    <li key={track.id} className="flex justify-between items-center bg-gray-700 p-2 rounded hover:bg-gray-600 transition duration-200">
                        <span className="text-white">
                            {track.name} - {track.artists.map((artist: any) => artist.name).join(', ')}
                        </span>
                        <button
                            onClick={() => onRemove(track)}
                            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded transition duration-200"
                        >
                            Eliminar
                        </button>
                    </li>
                ))}
            </ul>
            <button
                onClick={handleSaveToSpotify}
                className="mt-4 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded transition duration-200"
            >
                Guardar en Spotify
            </button>
        </div>
    );
}

export default Playlist;
