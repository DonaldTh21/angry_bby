import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EasterEggPage = () => {
  const navigate = useNavigate();
  const [showMadSection, setShowMadSection] = useState(false);

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
          onClick={() => setShowMadSection(true)}
        >
          Click Here If You're Really Mad at Me
        </button>
        
        {showMadSection && (
          <div className="mad-message">
            <p>"Good. Be mad. Be real. I'd rather have your fire than your silence."</p>
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

export default EasterEggPage; 