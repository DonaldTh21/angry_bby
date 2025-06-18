import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Dynamic data configuration
const easterEggData = {
  header: {
    title: "You found it.",
    subtitle: "Some things are too tender to say out loud... so I left them here instead."
  },
  sections: [
    {
      id: 'almost-texted',
      title: "📜 Things I Almost Texted You But Didn't",
      type: 'thought-bubbles',
      content: [
        "I miss your voice more than I want to admit.",
        "I still replay our moments together every time.",
        "I saw something today on my way back I saw two cute couples walking in our fav place(bubbles) they we're enjoying their time together. It hit me hard wish i could be with you. ",
        "You can be mad at me, but I still care. That hasn’t changed.",
        "Some part of me still checks my phone for you.",
        "Even if you never read this, I needed to say it.",
        "No matter how weird things get… some part of me will always be rooting for you."
      ]
    },
    {
      id: 'tiny-ways',
      title: "❤️ Tiny Ways I Love You",
      type: 'love-list',
      content: [
        "The way your voice softens when you’re sleepy",
    "The smile I get when your name lights up my screen",
    "I know your laugh in all its variations the polite one you use when meeting new people, the gentle one when you’re happy, and that wild, comfortable, monstrous laugh you only let out when you feel safe. And I love them all.",
    "The way I hear your reactions in my head when something funny happens",
    "That your happiness genuinely makes me happy and rooting for you",
    "The way your silence still feels like something I want to cheer you up.",
    "I find you beautiful all the time but especially in the mornings, half-asleep, curled beside me. I love watching you sleep, like peace decided to stay a little longer.",
    "It hurts me more than I can explain… to see you cry."
      ]
    },
    {
      id: 'surprise-video',
      title: "🎥 A Surprise Video",
      type: 'video',
      content: {
        src: "/src/assets/IMG_2491.mp4",
        caption: "When you're trying to be angry but can't stop being cute 😅"
      }
    },
    {
      id: 'mad-section',
      title: null,
      type: 'mad-button',
      content: {
        buttonStates: [
          "Click Here If You're Really Mad at Me 😤",
          "Okay... that was fair 😅",
          "But like, how mad are we talking? 🤔",
          "Slam-door mad? Ghost-me mad? Or pouty-silent mad? 😫"
        ],
        finalMessage: "Good. Be mad. Be real. I'd rather have your fire than your silence.😘💞",
        gifUrl: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ2NmYXdqaHRoZm5jcW9oc250ZHZ5YmpxdXBwMjZ4dWpwajV4cmNwayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oFzmcZkFfcZjd7M7m/giphy.gif",
        gifAlt: "Cute animal to make you smile"
      }
    }
  ]
};

const buttonStyles = {
  "Click Here If You're Really Mad at Me 😤": {
    backgroundColor: '#ff4757',
    transform: 'scale(1)',
    border: '2px solid #ff6b81',
  },
  "Okay... that was fair 😅": {
    backgroundColor: '#ff7f50',
    transform: 'scale(1.05)',
    border: '2px solid #ffa07a',
  },
  "But like, how mad are we talking? 🤔": {
    backgroundColor: '#ff6348',
    transform: 'scale(1.1)',
    border: '2px solid #ff8c69',
  },
  "Slam-door mad? Ghost-me mad? Or pouty-silent mad? 😫": {
    backgroundColor: '#ff4757',
    transform: 'scale(1.15)',
    border: '2px solid #ff6b81',
  }
};

const EasterEggPage = () => {
  const navigate = useNavigate();
  const [showMadSection, setShowMadSection] = useState(false);
  const [buttonText, setButtonText] = useState(easterEggData.sections[3].content.buttonStates[0]);

  const handleMadButtonClick = () => {
    const currentIndex = easterEggData.sections[3].content.buttonStates.indexOf(buttonText);
    const nextIndex = currentIndex + 1;
    
    if (nextIndex < easterEggData.sections[3].content.buttonStates.length) {
      setButtonText(easterEggData.sections[3].content.buttonStates[nextIndex]);
    } else {
      setShowMadSection(true);
    }
  };

  const getButtonStyle = () => {
    return buttonStyles[buttonText] || buttonStyles[easterEggData.sections[3].content.buttonStates[0]];
  };

  const renderSection = (section) => {
    switch (section.type) {
      case 'thought-bubbles':
        return (
          <div className="thought-bubbles">
            {section.content.map((thought, index) => (
              <div key={index} className="thought-bubble">
                <p>"{thought}"</p>
              </div>
            ))}
          </div>
        );

      case 'love-list':
        return (
          <div className="love-list">
            {section.content.map((loveItem, index) => (
              <div key={index} className="love-item">
                <span className="sparkle">✨</span>
                <p>{loveItem}</p>
              </div>
            ))}
          </div>
        );

      case 'video':
        return (
          <div className="video-container">
            <video 
              controls 
              className="meme-video"
              poster={section.content.poster}
            >
              <source 
                src={section.content.src} 
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
            <p className="video-caption">{section.content.caption}</p>
          </div>
        );

      case 'mad-button':
        return (
          <div className="mad-section">
            <button 
              className="mad-button"
              onClick={handleMadButtonClick}
              style={getButtonStyle()}
            >
              {buttonText}
            </button>
            
            {showMadSection && (
              <div className="mad-message">
                <p>"{section.content.finalMessage}"</p>
                <div className="cute-gif">
                  <img 
                    src={section.content.gifUrl} 
                    alt={section.content.gifAlt}
                  />
                </div>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="easter-egg-page">
      <button className="back-button" onClick={() => navigate('/')}>
        ← Back
      </button>

      <header className="easter-egg-header">
        <h1>{easterEggData.header.title}</h1>
        <p>{easterEggData.header.subtitle}</p>
      </header>

      {easterEggData.sections.map((section, index) => (
        <section key={section.id || index} className={`easter-egg-section ${section.type === 'mad-button' ? 'mad-section' : ''} ${section.type === 'video' ? 'video-section' : ''}`}>
          {section.title && <h2>{section.title}</h2>}
          {renderSection(section)}
        </section>
      ))}
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