import { getSpotifyToken } from "./spotifyApi"

export async function searchSpotify(query:string){
    const token = await getSpotifyToken()
    try{
        const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track`,{
            method:'GET',
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        if(!response.ok){
            throw new Error(`${response.status}`)
        }
        const data = await response.json()
        return data.tracks.items
    }catch(error){
        console.error(error)
    }
}