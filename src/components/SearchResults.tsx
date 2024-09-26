import React from "react";

interface SearchResultProps {
    results: any[];
    onAdd: (track: any) => void;
}

const SearchResults: React.FC<SearchResultProps> = ({ results, onAdd }) => {
    return (
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-green-500 mb-4">
                Resultados
            </h2>
            <ul className="space-y-2">
                {results.map((track) => (
                    <li key={track.id} className="flex justify-between items-center bg-gray-700 p-2 rounded hover:bg-gray-600 transition duration-200">
                        <span className="text-white">
                            {track.name} - {track.artists.map((artist: any) => artist.name).join(', ')}
                        </span>
                        <button 
                            onClick={() => onAdd(track)} 
                            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-3 rounded transition duration-200"
                        >
                            Add
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchResults;
