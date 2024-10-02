import React from 'react';

function Sidebar({ playlists, onSelectPlaylist }) {
    return (
        <div className="sidebar">
            <div className="logo" style={{ display: 'flex', alignItems: 'center' }}>
                <img className='logo' src="https://cdn.iconscout.com/icon/free/png-256/free-tidal-logo-icon-download-in-svg-png-gif-file-formats--technology-brand-social-media-company-logos-pack-icons-6297500.png" alt="Logo" style={{ width: '80px', height: '80px', marginRight: '10px' }} />
                <span className='text-dark tidal' style={{fontWeight: 'bold' }}>TIDAL</span>
            </div>

            <div className="playlists">
                <h3 className='text-dark'>Playlists</h3>
                <ul>
                    {playlists.map((playlist, index) => (
                        <li className='text-dark' key={index} onClick={() => onSelectPlaylist(index)}>
                            {playlist.playlistName}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;
