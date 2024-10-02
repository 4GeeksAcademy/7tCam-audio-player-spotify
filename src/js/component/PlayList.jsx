import React from 'react';
import TrackList from './TrackList.jsx';

function Playlist({ tracks, onSelectTrack }) {
  return (
    <div className="playlist">
      {tracks.length === 0 ? (
        <div className="no-selection">
          <h2>Escoja una playlist</h2>
        </div>
      ) : (
        <TrackList tracks={tracks} onSelectTrack={onSelectTrack} />
      )}
    </div>
  );
}

export default Playlist;
