import React, { useState } from 'react';
import LoveSpinner from '../components/LoveSpinner';

const EasterEgg = () => {
  // State
  const [showWheel, setShowWheel] = useState(false);

  // Event handlers
  const handleStartGame = () => {
    setShowWheel(true);
  };

  // Render functions
  const renderGameContent = () => (
    <div className="easter-egg-content">
      <h1>You found me! 💝</h1>
      <p>Let's play a little game...</p>
      <button 
        className="start-game-button"
        onClick={handleStartGame}
      >
        Spin the Love Wheel
      </button>
    </div>
  );

  return (
    <div className="easter-egg">
      {!showWheel ? renderGameContent() : <LoveSpinner />}
    </div>
  );
};

export default EasterEgg; 