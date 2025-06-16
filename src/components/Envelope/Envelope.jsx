import EnvelopeSeal from './EnvelopeSeal';
import Card from '../Card/Card';
import './Envelope.css';
import { useEffect, useRef } from 'react';

const Envelope = ({ isOpen, onFirstClick, onSecondClick }) => {
  const openSoundRef = useRef(new Audio('/sounds/envelope-open.wav'));

  useEffect(() => {
    // Set volume for sound
    openSoundRef.current.volume = 0.8;
  }, []);

  const handleClick = () => {
    if (!isOpen) {
      onFirstClick();
      openSoundRef.current.currentTime = 0;
      openSoundRef.current.play().catch(error => console.log('Error playing sound:', error));
    } else {
      onSecondClick();
    }
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