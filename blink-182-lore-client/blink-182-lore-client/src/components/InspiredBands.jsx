import React from "react";

const inspiredBands = [
  "Sum 41",
  "Simple Plan",
  "Fallout Boy",
  "New Found Glory",
  "All Time Low",
  "Panic! At The Disco",
  "Good Charlotte",
  "Paramore",
  "Boys Like Girls",
  "Neck Deep",
  "A Day To Remember",
  "Neck Deep",
  "The Story So Far",
  "State Champs",
  "No Pressure"
];

const InspiredBands = () => (
  <div style={{ textAlign: 'left', marginTop: '4em', marginLeft: '3em' }}>
    <h2 id="inspired-bands-header" style={{ color: '#4AC5C5' }}>
      Bands Inspired by Blink-182
    </h2>
    <ul id="bands-list" style={{ color: '#222', fontSize: '1.2em', marginTop: '2em' }}>
      {inspiredBands.map((band, idx) => (
        <li key={idx}>
          <span>
            <strong className="band-name">{band}</strong>
          </span>
        </li>
      ))}
    </ul>
  </div>
);

export default InspiredBands;