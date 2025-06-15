import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LoveSpinner.css';

const LoveSpinner = () => {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const wheelRef = useRef(null);
  const modalRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        navigate('/main');
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [navigate]);

  const handleBack = () => {
    navigate('/main');
  };

  const handleOverlayClick = (e) => {
    if (e.target === modalRef.current) {
      navigate('/main');
    }
  };

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

  const spinWheel = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    setShowResult(false);
    
    const fullRotations = 3 + Math.floor(Math.random() * 3);
    const segmentSize = 360 / segments.length;
    const randomSegment = Math.floor(Math.random() * segments.length);
    const newRotation = 360 * fullRotations + (segmentSize * randomSegment);
    
    setRotation(newRotation);
    
    setTimeout(() => {
      const normalizedRotation = newRotation % 360;
      const resultIndex = Math.floor(normalizedRotation / segmentSize);
      const finalResult = segments[resultIndex].text;
      setResult(finalResult);
      setShowResult(true);
      setIsSpinning(false);
    }, 3000);
  };

  return (
    <div className="love-spinner-overlay" ref={modalRef} onClick={handleOverlayClick}>
      <div className="love-spinner-container" onClick={e => e.stopPropagation()}>
      <button className="back-button" onClick={() => navigate('/')}>
        ← Back
      </button>
        <h2>Love Spinner</h2>
        <div className="spinner-wrapper">
          <div 
            className={`spinner-wheel ${isSpinning ? 'spinning' : ''}`}
            ref={wheelRef}
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            {segments.map((segment, index) => {
              const rotation = (360 / segments.length) * index;
              return (
                <div
                  key={index}
                  className="spinner-segment"
                  style={{
                    '--segment-color': segment.color,
                    transform: `rotate(${rotation}deg)`
                  }}
                >
                  <span>{segment.text}</span>
                </div>
              );
            })}
            <div className="spinner-center"></div>
          </div>
        </div>
        <button 
          className="spin-button"
          onClick={spinWheel}
          disabled={isSpinning}
        >
          {isSpinning ? 'Spinning...' : 'Spin for Love'}
        </button>
        <div className={`result-display ${showResult ? 'show' : ''}`}>
          <h3>Drum 🥁 roll..</h3>
          <p>{result}</p>
        </div>
      </div>
    </div>
  );
};

export default LoveSpinner; 