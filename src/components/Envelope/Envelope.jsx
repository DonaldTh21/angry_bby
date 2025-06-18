import React, { useEffect, useRef } from 'react';

// Components
import EnvelopeSeal from './EnvelopeSeal';
import Card from '../Card/Card';

// Styles
import './Envelope.css';

const Envelope = ({ isOpen, onFirstClick, onSecondClick }) => {
  // Refs
  const openSoundRef = useRef(new Audio('/sounds/envelope-open.wav'));

  // Effects
  useEffect(() => {
    // Set volume for sound
    openSoundRef.current.volume = 0.8;
  }, []);

  // Event handlers
  const handleClick = () => {
    if (!isOpen) {
      onFirstClick();
      playOpenSound();
    } else {
      onSecondClick();
    }
  };

  const playOpenSound = () => {
    openSoundRef.current.currentTime = 0;
    openSoundRef.current.play().catch(error => 
      console.log('Error playing sound:', error)
    );
  };

  return (
    <div 
      className={`envelope ${isOpen ? 'open' : ''}`} 
      onClick={handleClick}
    >
      <div className="envelope-flap"></div>
      <div className="envelope-body">
        <EnvelopeSeal isOpen={isOpen} />
        <div className="envelope-address">
          <span>To My baby</span>
          <img src="/bread.png" alt="bread" className="bread-image" />
        </div>
        <div className={`envelope-content ${isOpen ? 'open' : ''}`}>
          <Card isOpen={isOpen} />
        </div>
      </div>
      <div className="envelope-back"></div>
    </div>
  );
};

export default Envelope; 