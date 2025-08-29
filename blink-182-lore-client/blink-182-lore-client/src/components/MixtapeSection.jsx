import React, { useState } from 'react';

function MixtapeSection({ mixtapes, setMixtapes, selectedMixtape, setSelectedMixtape }) {
  const [newMixtapeName, setNewMixtapeName] = useState('');
  const [isRenaming, setIsRenaming] = useState(null);
  const [renameValue, setRenameValue] = useState('');
  const [draggedItemIndex, setDraggedItemIndex] = useState(null);

  const createMixtape = () => {
    if (newMixtapeName.trim() && mixtapes.length < 5) {
      setMixtapes([...mixtapes, { name: newMixtapeName, songs: [] }]);
      setSelectedMixtape(mixtapes.length);
      setNewMixtapeName('');
    }
  };

  const startRename = (idx, name) => {
    setIsRenaming(idx);
    setRenameValue(name);
  };

  const finishRename = (e) => {
    if (e.key === 'Enter' && renameValue.trim()) {
      const updated = [...mixtapes];
      updated[isRenaming].name = renameValue;
      setMixtapes(updated);
      setIsRenaming(null);
    }
  };

  const deleteMixtape = (idx) => {
    const updated = mixtapes.filter((_, i) => i !== idx);
    setMixtapes(updated);
    if (selectedMixtape >= updated.length) {
      setSelectedMixtape(Math.max(0, updated.length - 1));
    }
  };

  const handleDragStart = (e, index) => {
    setDraggedItemIndex(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    if (draggedItemIndex === null || draggedItemIndex === dropIndex) {
      return;
    }

    const songs = Array.from(mixtapes[selectedMixtape].songs);
    const [reorderedItem] = songs.splice(draggedItemIndex, 1);
    songs.splice(dropIndex, 0, reorderedItem);

    const updatedMixtapes = [...mixtapes];
    updatedMixtapes[selectedMixtape] = { ...updatedMixtapes[selectedMixtape], songs };
    setMixtapes(updatedMixtapes);
    setDraggedItemIndex(null);
  };

  const removeSong = (index) => {
    const updatedSongs = mixtapes[selectedMixtape].songs.filter((_, i) => i !== index);
    const mixtapeCopy = [...mixtapes];
    mixtapeCopy[selectedMixtape].songs = updatedSongs;
    setMixtapes(mixtapeCopy);
  };

  const selectedSongs = mixtapes[selectedMixtape]?.songs || [];

  return (
    <div className="mixtape-container">
      <h2 className="mixtape-header-title">Your Mixtapes</h2>
      <div className="mixtape-controls">
        <input
          type="text"
          value={newMixtapeName}
          onChange={e => setNewMixtapeName(e.target.value)}
          placeholder="Mixtape name"
          className="mixtape-name-input"
        />
        <button
          onClick={createMixtape}
          className="mixtape-add-button"
          disabled={!newMixtapeName.trim() || mixtapes.length >= 5}
        >
          Add Mixtape
        </button>
      </div>

      <div className="mixtape-cards-container">
        {mixtapes.map((mixtape, idx) => (
          <div
            key={idx}
            className={`mixtape-card ${idx === selectedMixtape ? 'active-mixtape' : ''}`}
          >
            <h3 className="mixtape-card-title">
              {mixtape.name}
            </h3>
            <div className="song-list-header">
              <span>Song</span>
              <span>Album</span>
              <span>Band</span>
              <span></span>
            </div>
            <div className="song-list">
              {mixtape.songs.length === 0 ? (
                <div className="empty-song-message">
                  No songs yet!
                </div>
              ) : (
                mixtape.songs.map((song, songIdx) => (
                  <div
                    key={songIdx}
                    className="song-list-item"
                    draggable="true"
                    onDragStart={(e) => handleDragStart(e, songIdx)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, songIdx)}
                  >
                    <span className="song-title-style">{song.title || song}</span>
                    <span className="album-title-style">{song.album}</span>
                    <span className="band-name-style">{song.band}</span>
                    <button className="remove-btn" onClick={() => removeSong(songIdx)}>Remove</button>
                  </div>
                ))
              )}
            </div>
            <button
              className={`mixtape-view-button ${idx === selectedMixtape ? 'selected-view' : ''}`}
              onClick={() => setSelectedMixtape(idx)}
            >
              {idx === selectedMixtape ? 'Selected' : 'View'}
            </button>
            <button
              className="mixtape-delete-button"
              onClick={() => deleteMixtape(idx)}
              style={{
                position: 'absolute',
                top: '0.7em',
                left: '0.7em',
                background: '#eee',
                color: '#FF79B4',
                border: 'none',
                borderRadius: '50%',
                padding: '0.2em 0.5em',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '1em',
                width: '2em',
                height: '2em',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              🗑️
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MixtapeSection;