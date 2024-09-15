export async function savePlaylistToSpotify(playlistName: string, tracks: any[], accessToken: string) {
    try {
        // Crear la playlist
        const createPlaylistResponse = await fetch('https://api.spotify.com/v1/me/playlists', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: playlistName,
                description: 'Playlist creada desde la aplicación Jammming',
                public: false // Puedes hacer la playlist pública si lo deseas
            })
        });

        if (!createPlaylistResponse.ok) {
            throw new Error(`Error al crear la playlist ${createPlaylistResponse.status}`);
        }

        const playlistData = await createPlaylistResponse.json();
        const playlistId = playlistData.id;

        // Agregar pistas a la playlist
        const trackUris = tracks.map((track: any) => track.uri);
        const addTracksResponse = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                uris: trackUris
            })
        });

        if (!addTracksResponse.ok) {
            throw new Error(`Error al agregar pistas a la playlist ${addTracksResponse.status}`);
        }

        console.log('Playlist guardada con éxito en Spotify!');
    } catch (error) {
        console.error(error);
    }
}
