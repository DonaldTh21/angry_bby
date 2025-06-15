import React, { useState } from 'react';
import LoveWheel from '../components/LoveWheel';

const EasterEgg = () => {
  const [showWheel, setShowWheel] = useState(false);

  return (
    <div className="easter-egg">
      {!showWheel ? (
        <div className="easter-egg-content">
          <h1>You found me! 💝</h1>
          <p>Let's play a little game...</p>
          <button 
            className="start-game-button"
            onClick={() => setShowWheel(true)}
          >
            Spin the Love Wheel
          </button>
        </div>
      ) : (
        <LoveWheel />
      )}
    </div>
  );
};

export default EasterEgg; 