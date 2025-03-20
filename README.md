# Jammming App

## Project Overview
Jammming is a React-based web application that allows users to log in with their **GitHub account**, search for songs, and create playlists. Users can then save these playlists directly to their **Spotify account**. This project integrates the **Spotify Web API** for music search and playlist management.

## Features
- **Spotify Authentication**: Log in using your Spotify account.
- **Search Songs**: Find tracks from Spotify’s vast music library.
- **Create Playlists**: Add selected tracks to a playlist.
- **Save to Spotify**: Automatically save your playlists to your Spotify account.
- **Responsive UI**: A modern and mobile-friendly design.

## Project Structure
```
📂 Jammming-App
├── 📂 src
│   ├── 📂 components      # UI Components (SearchBar, SearchResults, Playlist)
│   ├── 📂 api             # API Calls (spotifySearch, spotifyApi)
│   ├── 📄 App.tsx        # Main application logic
│   ├── 📄 index.tsx      # React entry point
├── 📄 package.json        # Dependencies and scripts
├── 📄 README.md          # Documentation
```

## Getting Started

### Prerequisites
Ensure you have **Node.js** installed, then install dependencies:
```bash
npm install
```

### Setting Up Environment Variables
Create a `.env` file in the root directory and add:
```
VITE_SPOTIFY_CLIENT_ID=your_spotify_client_id
```

### Running the Project
Start the development server:
```bash
npm run dev
```

### Logging In with Spotify
- Click the **Login with Spotify** button.
- Authorize the app to access your account.
- Start searching and creating playlists!

## Deployment
The project is deployed on **Netlify**: [Jammming App](https://jamming-hayai.netlify.app/)

## Technologies Used
- **React (TypeScript)**
- **Spotify Web API**
- **Tailwind CSS**
- **Netlify (Deployment)**

## Contribution
Feel free to contribute by improving the UI, adding features, or enhancing API integration.

## License
This project is licensed under the **MIT License**.
