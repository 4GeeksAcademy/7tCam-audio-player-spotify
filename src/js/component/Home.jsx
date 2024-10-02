import React, { useState, useEffect } from 'react';
import Sidebar from './SideBar.jsx';
import Playlist from './PlayList.jsx';
import PlayerControls from './PlayerControls.jsx';

function Home() {
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylistIndex, setSelectedPlaylistIndex] = useState(null);
  const [currentTrackUrl, setCurrentTrackUrl] = useState(null);

  useEffect(() => {
    fetch('https://playground.4geeks.com/sound/all')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          const groupedPlaylists = [{ playlistName: 'All Songs', tracks: data }];
          setPlaylists(groupedPlaylists);
        } else if (data.songs && Array.isArray(data.songs)) {
          const groupedPlaylists = [{ playlistName: 'All Songs', tracks: data.songs }];
          setPlaylists(groupedPlaylists);
        } else {
          console.error('Unexpected data format:', data);
        }
      })
      .catch(error => {
        console.error('Error al obtener las canciones:', error);
      });
  }, []);

  const handleSelectPlaylist = (index) => {
    setSelectedPlaylistIndex(index);
    setCurrentTrackUrl(null);
  };

  const handleSelectTrack = (trackUrl) => {
    if (trackUrl) {
      const fullTrackUrl = `https://playground.4geeks.com${trackUrl}`;
      console.log("Full track URL:", fullTrackUrl);
      setCurrentTrackUrl(fullTrackUrl);
    } else {
      console.error("The track URL is undefined.");
    }
  };

  const handleTrackChange = (newTrackUrl) => {
    setCurrentTrackUrl(`https://playground.4geeks.com${newTrackUrl}`);
  };

  return (
    <div className="home">
      <Sidebar playlists={playlists} onSelectPlaylist={handleSelectPlaylist} />
      {selectedPlaylistIndex !== null && (
        <Playlist
          tracks={playlists[selectedPlaylistIndex].tracks}
          onSelectTrack={handleSelectTrack}
        />
      )}
      <PlayerControls
        currentTrackUrl={currentTrackUrl}
        tracks={playlists[selectedPlaylistIndex]?.tracks || []}
        onTrackChange={handleTrackChange}

      />
    </div>
  );
}

export default Home;
