import React from "react";
import doYouLoveBlinkSubtitle from "../assets/do-you-love-blink-182-think-you-ve-heard-it-all-check-out-their-side-projects-to-create-your-own-blink-182-lore-playlist.png";
import "../style.css";

export const Heading = ({ onClick }) => (
  <div className="label" onClick={onClick} style={{ cursor: "pointer" }}>
    <img
      className="do-you-love-blink"
      alt="Do you love blink"
      src={doYouLoveBlinkSubtitle}
    />
  </div>
);