import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EasterEggPage = () => {
  const navigate = useNavigate();
  const [showMadSection, setShowMadSection] = useState(false);
  const [buttonText, setButtonText] = useState("Click Here If You're Really Mad at Me 😤");

  const handleMadButtonClick = () => {
    if (buttonText === "Click Here If You're Really Mad at Me 😤") {
      setButtonText("Okay... that was fair 😅");
    } else if (buttonText === "Okay... that was fair 😅") {
      setButtonText("But like, how mad are we talking? 🤔");
    } else if (buttonText === "But like, how mad are we talking? 🤔") {
      setButtonText("Slam-door mad? Ghost-me mad? Or pouty-silent mad? 😫");
    } else {
      setShowMadSection(true);
    }
  };

  const getButtonStyle = () => {
    switch (buttonText) {
      case "Click Here If You're Really Mad at Me 😤":
        return {
          backgroundColor: '#ff4757', // Bright angry red
          transform: 'scale(1)',
          border: '2px solid #ff6b81',
        };
      case "Okay... that was fair 😅":
        return {
          backgroundColor: '#ff7f50', // Coral orange
          transform: 'scale(1.05)',
          border: '2px solid #ffa07a',
        };
      case "But like, how mad are we talking? 🤔":
        return {
          backgroundColor: '#ff6348', // Tomato red
          transform: 'scale(1.1)',
          border: '2px solid #ff8c69',
        };
      case "Slam-door mad? Ghost-me mad? Or pouty-silent mad? 😫":
        return {
          backgroundColor: '#ff4757', // Intense red
          transform: 'scale(1.15)',
          border: '2px solid #ff6b81',
        };
      default:
        return {
          backgroundColor: '#ff4757',
          transform: 'scale(1)',
          border: '2px solid #ff6b81',
        };
    }
  };

  return (
    <div className="easter-egg-page">
      <button className="back-button" onClick={() => navigate('/')}>
        ← Back
      </button>

      <header className="easter-egg-header">
        <h1>You found it.</h1>
        <p>Some things are too tender to say out loud... so I left them here instead.</p>
      </header>

      <section className="easter-egg-section">
        <h2>📜 Things I Almost Texted You But Didn't</h2>
        <div className="thought-bubble">
          <p>"I saw a dog that looked like your vibe and I wanted to send you a pic but I didn't know if you wanted to hear from me."</p>
        </div>
        <div className="thought-bubble">
          <p>"I thought about that one time we ate fries in silence and it still made me smile."</p>
        </div>
      </section>

      <section className="easter-egg-section">
        <h2>❤️ Tiny Ways I Love You</h2>
        <div className="love-list">
          <div className="love-item">
            <span className="sparkle">✨</span>
            <p>The way your voice softens when you're sleepy</p>
          </div>
          <div className="love-item">
            <span className="sparkle">✨</span>
            <p>The little pause before you say "hi" when you're shy</p>
          </div>
          <div className="love-item">
            <span className="sparkle">✨</span>
            <p>That sparkle when you're lowkey excited but pretending to be chill</p>
          </div>
        </div>
      </section>

      <section className="easter-egg-section video-section">
        <h2>🎥 A Surprise Video</h2>
        <div className="video-container">
          <video 
            controls 
            className="meme-video"
            poster="https://media.giphy.com/media/3o7abKhOpu0NwenH3O/giphy.gif"
          >
            <source 
              src="https://media.giphy.com/media/3o7abKhOpu0NwenH3O/giphy.mp4" 
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
          <p className="video-caption">When you're trying to be serious but can't stop being cute 😅</p>
        </div>
      </section>

      <section className="easter-egg-section mad-section">
        <button 
          className="mad-button"
          onClick={handleMadButtonClick}
          style={getButtonStyle()}
        >
          {buttonText}
        </button>
        
        {showMadSection && (
          <div className="mad-message">
            <p>"Good. Be mad. Be real. I'd rather have your fire than your silence.😘💞"</p>
            <div className="cute-gif">
              <img 
                src="https://media.giphy.com/media/3o7abKhOpu0NwenH3O/giphy.gif" 
                alt="Cute animal to make you smile"
              />
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

const styles = `
  .mad-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
  }

  .mad-button {
    padding: 15px 25px;
    border: none;
    border-radius: 25px;
    font-size: 1.1em;
    font-weight: 600;
    color: white;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(255, 71, 87, 0.2);
    margin: 20px auto;
    width: calc(100% - 40px);
    max-width: 360px;
    text-align: center;
    position: relative;
    overflow: hidden;
    display: block;
    box-sizing: border-box;
  }

  .mad-button::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      120deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: 0.5s;
  }

  .mad-button:hover::before {
    left: 100%;
  }

  .mad-button:hover {
    transform: translateY(-2px) !important;
    box-shadow: 0 6px 20px rgba(255, 71, 87, 0.3);
  }

  .mad-button:active {
    transform: translateY(1px) !important;
  }

  .mad-message {
    animation: fadeIn 0.5s ease-in;
    width: calc(100% - 40px);
    max-width: 360px;
    margin: 0 auto;
    text-align: center;
    box-sizing: border-box;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Mobile Responsive Styles */
  @media screen and (max-width: 768px) {
    .mad-section {
      padding: 15px;
    }

    .mad-button {
      padding: 12px 20px;
      font-size: 1em;
      width: calc(100% - 30px);
      max-width: 320px;
      margin: 15px auto;
    }

    .mad-message {
      width: calc(100% - 30px);
      max-width: 320px;
      padding: 15px;
    }
  }

  @media screen and (max-width: 480px) {
    .mad-section {
      padding: 10px;
    }

    .mad-button {
      padding: 10px 15px;
      font-size: 0.9em;
      border-radius: 20px;
      width: calc(100% - 20px);
      max-width: 300px;
    }

    .mad-message {
      width: calc(100% - 20px);
      max-width: 300px;
      padding: 10px;
    }
  }
`;

// Add styles to the document
const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default EasterEggPage; 