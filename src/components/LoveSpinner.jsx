import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Styles
import '../styles/LoveSpinner.css';

// Constants
const SPIN_DURATION = 3000;
const MIN_ROTATIONS = 3;
const MAX_ROTATIONS = 5;

const segments = [
  { text: 'Sing a song', color: '#ff6b6b' },
  { text: 'Imitate me', color: '#ff8e8e' },
  { text: 'Dance', color: '#ff6b6b' },
  { text: 'Kiss', color: '#ff8e8e' },
  { text: 'Secret fantasy', color: '#ff6b6b' },
  { text: 'Wildest dreams', color: '#ff8e8e' },
  { text: 'Rec. Voice Msg.', color: '#ff6b6b' },
  { text: 'Silly selfie', color: '#ff8e8e' }
];

const LoveSpinner = () => {
  const navigate = useNavigate();
  
  // Refs
  const wheelRef = useRef(null);
  const modalRef = useRef(null);
  
  // State
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const [showResult, setShowResult] = useState(false);

  // Effects
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        navigate('/main');
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [navigate]);

  // Event handlers
  const handleBackClick = () => {
    navigate('/');
  };

  const handleOverlayClick = (e) => {
    if (e.target === modalRef.current) {
      navigate('/main');
    }
  };

  const handleSpinClick = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    setShowResult(false);
    
    // Calculate the target rotation for this spin
    const fullRotations = MIN_ROTATIONS + Math.floor(Math.random() * (MAX_ROTATIONS - MIN_ROTATIONS + 1));
    const segmentSize = 360 / segments.length;
    const randomSegment = Math.floor(Math.random() * segments.length);
    const targetRotation = fullRotations * 360 + (segmentSize * randomSegment);
    
    // Add to current rotation to maintain continuous spinning
    const newRotation = rotation + targetRotation;
    setRotation(newRotation);
    
    setTimeout(() => {
      // Calculate result based on the final position
      const finalPosition = newRotation % 360;
      const resultIndex = Math.floor(finalPosition / segmentSize);
      const finalResult = segments[resultIndex].text;
      setResult(finalResult);
      setShowResult(true);
      setIsSpinning(false);
    }, SPIN_DURATION);
  };

  // Utility functions
  const getWheelStyle = () => ({
    transform: `rotate(${rotation}deg)`,
    transition: isSpinning 
      ? `transform ${SPIN_DURATION}ms cubic-bezier(0.17, 0.67, 0.12, 0.99)` 
      : 'transform 0.3s ease'
  });

  const getSegmentStyle = (index) => {
    const segmentRotation = (360 / segments.length) * index;
    return {
      '--segment-color': segments[index].color,
      transform: `rotate(${segmentRotation}deg)`
    };
  };

  // Render functions
  const renderSegments = () => (
    segments.map((segment, index) => (
      <div
        key={index}
        className="spinner-segment"
        style={getSegmentStyle(index)}
      >
        <span>{segment.text}</span>
      </div>
    ))
  );

  const renderResult = () => (
    <div className={`result-display ${showResult ? 'show' : ''}`}>
      <h3>Drum 🥁 roll..</h3>
      <p>{result}</p>
    </div>
  );

  return (
    <div className="love-spinner-overlay" ref={modalRef} onClick={handleOverlayClick}>
      <div className="love-spinner-container" onClick={e => e.stopPropagation()}>
        <button className="back-button" onClick={handleBackClick}>
          ← Back
        </button>
        
        <h2>Love Spinner</h2>
        
        <div className="spinner-wrapper">
          <div 
            className="spinner-wheel"
            ref={wheelRef}
            style={getWheelStyle()}
          >
            {renderSegments()}
            <div className="spinner-center"></div>
          </div>
        </div>
        
        <button 
          className="spin-button"
          onClick={handleSpinClick}
          disabled={isSpinning}
        >
          {isSpinning ? 'Spinning...' : 'Spin for Love'}
        </button>
        
        {renderResult()}
      </div>
    </div>
  );
};

export default LoveSpinner; 