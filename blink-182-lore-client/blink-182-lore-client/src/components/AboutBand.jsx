import React from 'react';

import bandPhoto from '../assets/BlinkBand.webp';
import tomPhoto from '../assets/Tom1.jpg';
import markPhoto from '../assets/MarkHoppus.jpg';
import travisPhoto from '../assets/TravisBarker.webp';
// import mattPhoto from '../assets/matt.png';

const AboutBand = ({ setView }) => {
  return (
    <div id="about-container">
      {/* <button onClick={() => setView('bands')}>Back to Bands</button> */}
      <h2 id="about-header" style={{ color: '#4AC5C5' }}>History Behind The Band</h2>
      
      {/* Use your actual band photo */}
      <img src={bandPhoto} alt="Blink-182 Band" className="band-photo" />

      <p>
        Formed in Poway, California, Blink-182 is a punk rock band known for their catchy melodies, rebellious lyrics, and
        juvenile humor. Founded by guitarist Tom DeLonge and bassist Mark Hoppus, the band achieved global fame with the addition of drummer Travis Barker in 1998, a lineup that defined their classic sound on iconic albums like Enema of the State. Their career has been marked by dramatic internal conflicts, with DeLonge leaving the band on two separate occasions due to creative differences and his focus on other projects. During his first departure, Hoppus and Barker formed the band +44, and during his second, they enlisted guitarist Matt Skiba, releasing two albums with him. The original trio of Hoppus, DeLonge, and Barker has since reconciled and reunited, most recently in 2022, a reunion that was cemented by Hoppus's battle with cancer, bringing the band's most famous lineup back together for a new album and world tour.
      </p>

      <h3>Meet the Members</h3>
      <div className="members-grid">
        <div className="member-card">
          <img src={markPhoto} alt="Mark Hoppus" className="member-photo" />
          <h4>Mark Hoppus</h4>
          <p>The bassist and co-lead vocalist, known for his signature style of songwriting that combines humor, heartfelt emotion, and relatable teenage angst. Along with Tom DeLonge, he co-wrote many of the band's most famous songs. Recently beat cancer in 2021 which lead to the band's latest reunion in 2022. Founder of the band +44 and Simple Creatures.</p>
        </div>
        <div className="member-card">
          <img src={tomPhoto} alt="Tom DeLonge" className="member-photo" />
          <h4>Tom DeLonge</h4>
          <p>The guitarist and co-lead vocalist known for his distinct nasal vocal style, driving guitar riffs, and for his public fascination with UFOs and extraterrestrial life. He was a primary songwriter for the band and a significant creative force, despite leaving the band twice. He is also the founder of side projects Angels & Airwaves and Box Car Racer.</p>
        </div>
        <div className="member-card">
          <img src={travisPhoto} alt="Travis Barker" className="member-photo" />
          <h4>Travis Barker</h4>
          <p>Joined Blink-182 in 1998, replacing the original drummer and became a permanent member. His drumming style is characterized by its speed, precision, and complex fills and is widely considered one of the most influential drummers in modern rock. Involved in numerous side projects and collaborations, including +44 and Transplants.</p>
        </div>
      </div>
    </div>
  );
};

export default AboutBand;