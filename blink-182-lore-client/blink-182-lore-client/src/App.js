import React, { useState, useEffect } from 'react';
import './style.css';
import MixtapeSection from './components/MixtapeSection';
import YourMusicSection from './components/YourMusicSection';
import BandsList from './components/BandsList';
import { Header } from './components/Header';
import { Heading } from './components/Heading';
import InspiredBands from './components/InspiredBands';
import BlinkSongs from './components/BlinkSongs';
import AboutBand from './components/AboutBand';

const API_BASE = 'http://localhost:8081/api';

function App() {
  const [bands, setBands] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [songs, setSongs] = useState([]);
  const [currentBandId, setCurrentBandId] = useState(null);
  const [view, setView] = useState('bands');
  const [memberBands, setMemberBands] = useState({
    tom: [
      { id: 1, name: "Blink 182" },
      { id: 2, name: "Angels and Airwaves" },
      { id: 3, name: "Boxcar Racer" }
    ],
    mark: [
      { id: 1, name: "Blink 182" },
      { id: 4, name: "+44" },
      { id: 5, name: "Simple Creatures" }
    ],
    travis: [
      { id: 1, name: "Blink 182" },
      { id: 3, name: "Boxcar Racer" },
      { id: 4, name: "+44" },
      { id: 6, name: "Transplants" },
      { id: 7, name: "The Aquabats" }
    ],
    matt: [
      { id: 1, name: "Blink 182" },
      { id: 8, name: "Alkaline Trio" }
    ]
  });
  const [mixtapes, setMixtapes] = useState(() => {
    return JSON.parse(localStorage.getItem('blinkMixtapes')) || [
      { name: 'My Mixtape', songs: [] }
    ];
  });
  const [selectedMixtape, setSelectedMixtape] = useState(0);

  useEffect(() => {
    fetch(`${API_BASE}/bands`)
      .then(res => res.json())
      .then(data => setBands(data));
  }, []);

  useEffect(() => {
    localStorage.setItem('blinkMixtapes', JSON.stringify(mixtapes));
  }, [mixtapes]);

  const showAlbums = (bandId) => {
    setCurrentBandId(bandId);
    fetch(`${API_BASE}/bands/${bandId}/albums`)
      .then(res => res.json())
      .then(data => {
        setAlbums(data);
        setView('albums');
        setTimeout(() => {
          const el = document.getElementById('explore-bands-header');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 0);
      });
  };

  const showSongs = (albumId) => {
    Promise.all([
      fetch(`${API_BASE}/albums/${albumId}`).then(res => res.json()),
      fetch(`${API_BASE}/bands/${currentBandId}`).then(res => res.json()),
      fetch(`${API_BASE}/albums/${albumId}/songs`).then(res => res.json())
    ])
      .then(([album, band, songData]) => {
        setSongs(songData.map(song => ({
          ...song,
          album: album.title,
          albumId: album.id,
          band: band.name,
          bandId: band.id,
        })));
        setView('songs');
        setTimeout(() => {
          const el = document.getElementById('explore-bands-header');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 0);
      });
  };

  const showBands = () => {
    setView('bands');
    window.scrollTo(0, 0);
  };

  const showMemberBands = (memberKey) => {
    const memberBandList = memberBands[memberKey] || [];
    setBands(memberBandList);
    setView('memberBands');
    window.scrollTo(0, 0);
  };

  const addItemToMixtape = (song) => {
    setMixtapes(mixtapes => {
      const updated = [...mixtapes];
      updated[selectedMixtape].songs = [...updated[selectedMixtape].songs, song];
      return updated;
    });
  };

  const showInspiredBands = () => {
    setView('inspiredBands');
    setTimeout(() => {
      const el = document.getElementById('inspired-bands-header');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 0);
  };

  const showAboutBand = () => {
    setView('aboutBand');
    setTimeout(() => {
      const el = document.getElementById('about-header');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 0);
  };

  const showBlinkSongs = () => {
    setView('blinkSongs');
    setTimeout(() => {
      const el = document.getElementById('blink-songs-header');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 0);
  };

  return (
    <>
      <Header
        onClick={() => {
          fetch(`${API_BASE}/bands`)
            .then(res => res.json())
            .then(data => setBands(data));
          setView('bands');
          setAlbums([]);
          setSongs([]);
          setCurrentBandId(null);
          window.scrollTo(0, 0);
        }}
      />
      <Heading
        onClick={() => {
          fetch(`${API_BASE}/bands`)
            .then(res => res.json())
            .then(data => setBands(data));
          setView('bands');
          setAlbums([]);
          setSongs([]);
          setCurrentBandId(null);
          window.scrollTo(0, 0);
        }}
      />
      <section id="band-section">
        <div className="explore-header">
          <h2 id="explore-bands-header">Explore bands from the Blink-182 universe!</h2>
          <div id="explore-options">
            <span className="explore-option" onClick={showBands}>View All</span>
            <span className="explore-option" onClick={() => setView('member')}>View By Band Member</span>
          </div>
        </div>

        {view === 'bands' && (
          <>
            <ul id="bands-list">
              {bands.map(band => (
                <li key={band.id}>
                  <span onClick={() => showAlbums(band.id)}>
                    <strong className="band-name">{band.name}</strong> <span className="year">({band.startYear})</span>
                  </span>
                </li>
              ))}
            </ul>
            <div style={{
              marginTop: '2em',
              display: 'flex',
              justifyContent: 'center',
              gap: '2em'
            }}>
              <button
                className="explore-option"
                style={{
                  fontSize: '1.2em',
                  background: '#4AC5C5',
                  color: '#fff',
                  border: 'none',
                  padding: '0.5em 1.5em',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  flex: 1
                }}
                onClick={showAboutBand}
              >
                ABOUT THE BAND
              </button>
              <button
                className="explore-option"
                style={{
                  fontSize: '1.2em',
                  background: '#FF79B4',
                  color: '#fff',
                  border: 'none',
                  padding: '0.5em 1.5em',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  flex: 1
                }}
                onClick={showBlinkSongs}
              >
                VIEW SONGS FEATURING BLINK-182
              </button>
              <button
                className="explore-option"
                style={{
                  fontSize: '1.2em',
                  background: '#4AC5C5',
                  color: '#fff',
                  border: 'none',
                  padding: '0.5em 1.5em',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  flex: 1
                }}
                onClick={showInspiredBands}
              >
                VIEW BANDS INSPIRED BY BLINK-182
              </button>
            </div>
          </>
        )}

        {view === 'inspiredBands' && <InspiredBands />}

        {view === 'member' && (
          <div id="view-member-container">
            <button
              style={{ float: 'right', marginBottom: '1em' }}
              onClick={showBands}
            >
              Back to View All
            </button>
            <h3>View by Band Member!</h3>
            <ul id="member-list">
              <li onClick={() => showMemberBands('tom')}><span className="member-name">Tom Delonge</span></li>
              <li onClick={() => showMemberBands('mark')}><span className="member-name">Mark Hoppus</span></li>
              <li onClick={() => showMemberBands('travis')}><span className="member-name">Travis Barker</span></li>
              <li style={{ height: '2em' }}></li>
              <li onClick={() => showMemberBands('matt')}><span className="member-name">Matt Skiba (2015-2022)</span></li>
            </ul>
          </div>
        )}

        {view === 'memberBands' && (
          <div>
            <button
              style={{ float: 'right', marginBottom: '1em' }}
              onClick={showBands}
            >
              Back to View All
            </button>
            <ul id="bands-list">
              {bands.map(band => (
                <li key={band.id}>
                  <span onClick={() => showAlbums(band.id)}>
                    <strong className="band-name">{band.name}</strong>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {view === 'albums' && (
          <div id="albums-container">
            <button onClick={showBands}>Back to Bands</button>
            <ul id="albums-list">
              {albums.map(album => (
                <li key={album.id}>
                  <span onClick={() => showSongs(album.id)}>
                    <strong className="album-title">{album.title}</strong> <span className="year">({album.releaseYear})</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {view === 'songs' && (
          <div id="songs-container">
            <button onClick={() => showAlbums(currentBandId)}>Back to Albums</button>
            <ul id="songs-list">
              {songs.map(song => (
                <li key={song.id}>
                  <span className="song-title">{song.title}</span>
                  <span className="track-number">Track {song.trackNumber}</span>
                  <span className="duration">{song.durationInSeconds}s</span>
                  <button className="add-btn" onClick={() => addItemToMixtape(song)}>Add to Mixtape</button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {view === 'blinkSongs' && (
          <BlinkSongs addItemToMixtape={addItemToMixtape} />
        )}

        {view === 'aboutBand' && <AboutBand setView={setView} />}
      </section>

      <MixtapeSection
        mixtapes={mixtapes}
        setMixtapes={setMixtapes}
        selectedMixtape={selectedMixtape}
        setSelectedMixtape={setSelectedMixtape}
      />
      <YourMusicSection addItemToMixtape={addItemToMixtape} />
    </>
  );
}

export default App;