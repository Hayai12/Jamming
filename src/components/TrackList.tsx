import React from "react"

interface Track{
    id: string,
    name: string,
    artist: string,
    uri: string
}

interface TrackListProps { 
    tracks: Track[]
    onAdd: (track:Track) => void
}

const TrackList: React.FC<TrackListProps> = ({ tracks, onAdd}) => {
    return(
        <div>
            {tracks.map(track =>(
                <>
                <div key={track.id}>
                    <p>{track.name}-{track.artist}</p>
                </div><button
                    onClick={() => onAdd(track)}>
                        +
                    </button>
                    </>
            ))}
        </div>
    )
}

export default TrackList