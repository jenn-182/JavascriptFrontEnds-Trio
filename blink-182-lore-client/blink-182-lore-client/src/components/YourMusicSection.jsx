import { useState, useEffect } from 'react';

function YourMusicSection({ addItemToMixtape }) {
  const [yourMusic, setYourMusic] = useState([]);
  const [title, setTitle] = useState('');
  const [album, setAlbum] = useState('');
  const [band, setBand] = useState('');

  useEffect(() => {
    const savedMusic = JSON.parse(localStorage.getItem('yourMusic')) || [];
    setYourMusic(savedMusic);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newSong = { title, album, band };
    const updatedMusic = [...yourMusic, newSong];
    setYourMusic(updatedMusic);
    localStorage.setItem('yourMusic', JSON.stringify(updatedMusic));
    setTitle('');
    setAlbum('');
    setBand('');
  };

  const removeItem = (index) => {
    const updatedMusic = yourMusic.filter((_, i) => i !== index);
    setYourMusic(updatedMusic);
    localStorage.setItem('yourMusic', JSON.stringify(updatedMusic));
  };

  return (
    <section id="your-music-section">
      <h2 style={{ fontSize: '2em' }}>Want to add your own songs to your mixtape?</h2>
      <form id="your-music-form" onSubmit={handleSubmit}>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Song Title" required />
        <input type="text" value={album} onChange={(e) => setAlbum(e.target.value)} placeholder="Album Name" required />
        <input type="text" value={band} onChange={(e) => setBand(e.target.value)} placeholder="Band Name" required />
        <button type="submit">Add Song</button>
      </form>
      <h3 style={{ fontSize: '1.5em', marginTop: '1em' }}>Your music</h3>
      <ul id="your-music-list" style={{ fontSize: '1.3em' }}>
        {yourMusic.length === 0 ? (
          <li style={{ color: '#aaa' }}>No songs added yet.</li>
        ) : (
          yourMusic.map((item, index) => (
            <li key={index}>
              <div className="song-info">
                <span className="song-title">{item.title}</span>
                <span className="album-title">{item.album}</span>
                <span className="band-name">{item.band}</span>
              </div>
              <div className="button-group">
                <button className="add-to-mixtape-btn" onClick={() => addItemToMixtape(item)}>Add to Mixtape</button>
                <button className="remove-btn" onClick={() => removeItem(index)}>Remove</button>
              </div>
            </li>
          ))
        )}
      </ul>
    </section>
  );
}

export default YourMusicSection;