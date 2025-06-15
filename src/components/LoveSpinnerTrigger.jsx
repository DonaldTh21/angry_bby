import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LoveSpinnerTrigger.css';

const LoveSpinnerTrigger = ({ onClick }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate('/love-spinner');
    }
  };

  return (
    <div className="love-spinner-trigger">
      <div className="trigger-button" onClick={handleClick}>
        <span className="heart-icon">💝</span>
        <span className="wheel-icon">🎡</span>
      </div>
    </div>
  );
};

export default LoveSpinnerTrigger; 