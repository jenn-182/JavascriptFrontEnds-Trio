import React from "react";
import blink182Logo from "../assets/blink-182-logo.png";
import "../style.css";

export const Header = ({ onClick }) => (
  <div className="header" onClick={onClick} style={{ cursor: 'pointer' }}>
    <div className="overlap-group">
      <img className="blink-logo" alt="Blink logo" src={blink182Logo} />
      <div className="blink-lore">
        Blink-182 Lore
        <br /> Playlist Builder
      </div>
    </div>
  </div>
);