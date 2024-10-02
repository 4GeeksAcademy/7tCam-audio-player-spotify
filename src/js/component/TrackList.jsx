import React from 'react';

function TrackList({ tracks, onSelectTrack }) {
  return (
    <div className="track-list">
      <ul>
        {tracks.map((track, index) => (
          <li key={index} onClick={() => onSelectTrack(track.url)}>
            <div className="track-title">{track.name}</div>
            <div className="track-artist">{track.author}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TrackList;
