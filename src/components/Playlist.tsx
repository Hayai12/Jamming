import React, {useState} from "react"

interface PlaylistProps{
    name: string
    tracks: any[]
    onRemove: (track:any) => void
    onNameChange: (name:string) => void
}

const Playlist: React.FC<PlaylistProps> = ({ name,tracks,onRemove,onNameChange}) => {
    const [editing,setEditing] = useState(false)
    const [newName, setNewName] = useState('')

    const handleNameChange = () => {
        onNameChange(newName)
        setEditing(false)
    }

    return(
        <div>
      {editing ? (
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onBlur={handleNameChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleNameChange();
          }}
        />
      ) : (
        <h2 onClick={() => setEditing(true)}>{name}</h2>
      )}
      <ul>
        {tracks.map((track) => (
          <li key={track.id}>
            {track.name} - {track.artists.map((artist: any) => artist.name).join(', ')}
            <button onClick={() => onRemove(track)}>Eliminar</button>
          </li>
        ))}
      </ul>
      <button>Guardar en Spotify</button>
    </div>
    )

}

export default Playlist