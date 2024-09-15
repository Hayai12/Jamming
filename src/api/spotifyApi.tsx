const clientId = '766cb52937e64b7da18cd9ce55020794'
const clientSecret = '3fbfdf0be5e349bc845b8194e3f79fd0'

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
                redirect_uri: 'http://localhost:5173/'
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