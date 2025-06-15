import { useRef, useState, useEffect } from 'react';
import { MUSIC_URL, INITIAL_APOLOGIES, INITIAL_GOALS } from './constants';
import IntroPage from './pages/IntroPage';
import MainPage from './pages/MainPage';
import './App.css';

// Constants
const BG_IMAGE = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80';

// Helper functions
function scrollToSection(ref) {
  ref.current?.scrollIntoView({ behavior: 'smooth' });
}

// Components
const EnvelopeSeal = ({ isOpen }) => (
  <div className={`envelope-seal ${isOpen ? 'hidden' : ''}`}>
    <span className="seal-heart">💖</span>
  </div>
);

const CardHeader = () => (
  <div className="card-header">
    <span className="animated-sparkle">✨</span>
    <h3>To My<br />Special Someone</h3>
    <span className="animated-sparkle">✨</span>
  </div>
);

const CardMessage = () => (
  <p className="card-message">
    Every moment with you feels like a beautiful dream come true. 
    Your smile brightens my day, and your love fills my heart with joy.
  </p>
);

const SecretMessage = ({ isOpen }) => (
  <div className={`secret-message ${isOpen ? 'reveal' : ''}`}>
    <p className="secret-text">Psst... There's a hidden secret here! 💝</p>
  </div>
);

const CardHearts = () => (
  <div className="card-hearts">
    <span className="animated-heart">💖</span>
    <span className="animated-heart">💝</span>
    <span className="animated-heart">💕</span>
  </div>
);

const Card = ({ isOpen }) => (
  <div className="card">
    <CardHeader />
    <div className="card-body">
      <CardMessage />
      <SecretMessage isOpen={isOpen} />
      <CardHearts />
    </div>
  </div>
);

const Envelope = ({ isOpen, onFirstClick, onSecondClick }) => {
  const handleClick = () => {
    if (!isOpen) {
      onFirstClick();
    } else {
      onSecondClick();
    }
  };

  return (
    <div className="envelope" onClick={handleClick}>
      <div className="envelope-flap"></div>
      <div className="envelope-body">
        <EnvelopeSeal isOpen={isOpen} />
        <div className="envelope-address">To My Sweet Bread</div>
        <div className={`envelope-content ${isOpen ? 'open' : ''}`}>
          <Card isOpen={isOpen} />
        </div>
      </div>
      <div className="envelope-back"></div>
    </div>
  );
};

const IntroModal = ({ isOpen, onFirstClick, onSecondClick }) => (
  <div className="intro-modal">
    <div className="envelope-box">
      <Envelope 
        isOpen={isOpen} 
        onFirstClick={onFirstClick} 
        onSecondClick={onSecondClick} 
      />
    </div>
  </div>
);

// Main App Component
function App() {
  // Refs
  const storyRef = useRef();
  const sorryRef = useRef();
  const promisesRef = useRef();
  const futureRef = useRef();
  const loveNoteRef = useRef();
  const timelineRef = useRef();
  const audioRef = useRef(new Audio(MUSIC_URL));

  // State
  const [showIntro, setShowIntro] = useState(true);
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [apologies, setApologies] = useState(INITIAL_APOLOGIES);
  const [goals, setGoals] = useState(INITIAL_GOALS);
  const [newApology, setNewApology] = useState('');
  const [newGoal, setNewGoal] = useState('');
  const [hearts, setHearts] = useState([]);

  // Effects
  useEffect(() => {
    if (envelopeOpen) {
      audioRef.current.play();
      audioRef.current.loop = true;
    }
  }, [envelopeOpen]);

  useEffect(() => {
    return () => {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    };
  }, []);

  // Handlers
  const handleFirstClick = () => {
    setEnvelopeOpen(true);
  };

  const handleSecondClick = () => {
    setShowIntro(false);
  };

  // Render
  if (showIntro) {
    return (
      <IntroPage 
        isOpen={envelopeOpen}
        onFirstClick={handleFirstClick}
        onSecondClick={handleSecondClick}
      />
    );
  }

  return <MainPage />;
}

export default App;
