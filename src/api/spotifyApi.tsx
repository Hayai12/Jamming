const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;


export async function getSpotifyToken(code: string){
    const authString = btoa(`${clientId}:${clientSecret}`)

    try{
        const response = await fetch('https://accounts.spotify.com/api/token',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${authString}`
            },
            body: new URLSearchParams({
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: 'https://jamming-hayai.netlify.app'
            })
        })
        if(!response.ok){
            throw new Error(`Error al obtener el token ${response.status}`)
        }
        const data = await response.json()
        return data.access_token
    }catch(error){
        console.error(error)
        return null
    }


}