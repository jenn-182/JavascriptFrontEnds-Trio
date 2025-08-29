import React from "react";

const songs = [
  'Oliver Tree - "Let Me Down" (ft. Blink-182)',
  'Simple Plan - "I\'d Do Anything"',
  'New Found Glory - "Ready And Willing II"',
  'Motion City Soundtrack - "Hangman"',
  'Neck Deep - "December (Again)"',
  'The Used - "The Lighthouse"',
  'Owl City - "Dementia"',
  'Amy Shark - "Psycho"',
  'Avril Lavigne - "All I Wanted"',
  'All Time Low - "Tidal Waves"',
  'MxPx - "Empire"',
  'Machine Gun Kelly - "My Ex\'s Best Friend" (ft. blackbear)',
  'YUNGBLUD - "I Think I\'m OKAY" (ft. Machine Gun Kelly)',
  'Willow - "t r a n s p a r e n t s o u l"',
  'Avril Lavigne - "Bite Me"',
  'jxdn - "Angels & Demons"',
  'The Game - "Dope Boys"',
  'Lil Wayne - "Gimme Brain" (ft. Rick Ross)',
  'Yelawolf - "Push \'Em" (Steve Aoki & Travis Barker Remix)',
  'KennyHoopla - "Drunk Driving"',
  'The Transplants - "Diamond and Guns"',
];

const getArtistAndTitle = song => {
  const match = song.match(/^([^-\n]+)\s*-\s*(.+)$/);
  if (match) {
    return { artist: match[1].trim(), title: match[2].trim() };
  }
  return { artist: song, title: "" };
};

function BlinkSongs({ addItemToMixtape }) {
  return (
    <div style={{ textAlign: 'left', marginTop: '4em', marginLeft: '3em' }}>
      <h2 id="blink-songs-header" style={{ color: '#FF79B4' }}>Songs Featuring Blink-182 Members</h2>
      <ul style={{
        fontSize: '1.5em',
        marginTop: '2em',
        paddingLeft: '1em'
      }}>
        {songs.map((song, idx) => {
          const { artist, title } = getArtistAndTitle(song);
          return (
            <li
              key={idx}
              style={{
                marginBottom: '0.5em',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <span>
                <span style={{ color: '#4AC5C5', fontWeight: 'bold' }}>{artist}</span>
                {title && (
                  <>
                    {" - "}
                    <span style={{ color: '#FF79B4' }}>{title}</span>
                  </>
                )}
              </span>
              <button
                onClick={() => addItemToMixtape({
                  title,
                  band: artist,
                  album: '', // or you can add a default value if you want
                })}
                style={{
                  marginLeft: '1em',
                  fontSize: '0.8em',
                  padding: '0.3em 0.7em',
                  background: '#4AC5C5',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                Add to Mixtape
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default BlinkSongs;