import React, { useState, useEffect } from 'react';
import { FaPlay, FaPause, FaBackward, FaForward, FaRandom, FaSyncAlt } from 'react-icons/fa';

function PlayerControls({ currentTrackUrl, tracks = [], onTrackChange }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isRepeating, setIsRepeating] = useState(false);

  useEffect(() => {
    if (currentTrackUrl) {
      if (audio) {
        audio.pause();
      }
      const newAudio = new Audio(currentTrackUrl);
      newAudio.onerror = () => {
        console.error('Failed to load the audio track.');
      };
      newAudio.onloadedmetadata = () => {
        setDuration(newAudio.duration || 0);
      };
      newAudio.ontimeupdate = () => {
        setCurrentTime(newAudio.currentTime || 0);
      };
      newAudio.onended = () => {
        if (isRepeating) {
          newAudio.currentTime = 0;
          newAudio.play();
        } else {
          handleNextTrack();
        }
      };
      setAudio(newAudio);
      newAudio.play().catch(error => {
        console.error('Error playing the audio track:', error);
      });
      setIsPlaying(true);
    } else {
      setCurrentTime(0);
      setDuration(0);
    }
  }, [currentTrackUrl, isRepeating]);

  const handlePlayPause = () => {
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleNextTrack = () => {
    let nextIndex = currentTrackIndex + 1;

    // Si el índice supera el número de pistas, reiniciar a 0
    if (nextIndex >= tracks.length) {
      nextIndex = 0;
    }

    // Actualizar el índice actual y cambiar la pista
    setCurrentTrackIndex(nextIndex);
    if (onTrackChange) {
      onTrackChange(tracks[nextIndex].url);
    } else {
      console.error("onTrackChange is not defined.");
    }
  };

  const handlePreviousTrack = () => {
    if (currentTime > 5) {
      if (audio) {
        audio.currentTime = 0;
      }
    } else if (currentTrackIndex > 0) {
      const prevIndex = currentTrackIndex - 1;
      setCurrentTrackIndex(prevIndex);
      if (onTrackChange) {
        onTrackChange(tracks[prevIndex].url);
      } else {
        console.error("onTrackChange is not defined.");
      }
    }
  };

  const toggleRepeat = () => {
    setIsRepeating(!isRepeating);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="player-controls">
      <div className="controls">
        <FaRandom className="icon" />
        <FaBackward className="icon" onClick={handlePreviousTrack} />
        <div className="play-pause" onClick={handlePlayPause}>
          {isPlaying ? <FaPause className="iconplaypause" /> : <FaPlay className="iconplaypause" />}
        </div>
        <FaForward className="icon" onClick={handleNextTrack} />
        <FaSyncAlt className="icon" onClick={toggleRepeat} style={{ color: isRepeating ? 'green' : 'inherit' }} />
      </div>
      <div className="progress">
        <span className="time">{formatTime(currentTime)}</span>
        <div className="progress-bar">
          <div
            className="progress-filled"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <span className="time">{formatTime(duration)}</span>
      </div>
    </div>
  );
}

export default PlayerControls;
