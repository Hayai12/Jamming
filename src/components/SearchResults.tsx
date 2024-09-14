import React from "react"

interface SearchResultProps {
    results: any[]
    onAdd: (track:any) => void
}

const SearchResults:React.FC<SearchResultProps> = ({results,onAdd}) => {
    return(
        <div>
            <h2>
                Resultados
            </h2>
            <ul>
                {results.map((track)=>(
                    <li key={track.id}>
                        {track.name} - {track.artists.map((artist: any)=> artist.name).join(', ')}
                        <button onClick={() => onAdd(track)}>Add</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default SearchResults