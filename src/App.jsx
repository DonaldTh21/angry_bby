import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { MUSIC_URL, MUSIC_URL_FALLBACK } from './constants';
import IntroPage from './pages/IntroPage';
import MainPage from './pages/MainPage';
import EasterEggPage from './pages/EasterEggPage';
import LoveSpinner from './components/LoveSpinner';
import './App.css';

// Custom hook for audio management
const useAudioPlayer = () => {
  const [isAudioLoaded, setIsAudioLoaded] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Create and configure audio element
    const audio = new Audio();
    audio.src = MUSIC_URL;
    audio.loop = true;
    audio.volume = 0.2;
    audio.preload = 'auto';

    // Handle audio loading
    audio.addEventListener('canplaythrough', () => {
      console.log('Audio loaded successfully');
      setIsAudioLoaded(true);
    });

    audio.addEventListener('error', (e) => {
      console.error('Error loading audio:', e);
      console.error('Audio src:', MUSIC_URL);
      
      // Try fallback URL
      console.log('Trying fallback audio URL...');
      audio.src = MUSIC_URL_FALLBACK;
      audio.load();
    });

    // Track playing state
    audio.addEventListener('play', () => {
      console.log('Audio started playing');
      setIsAudioPlaying(true);
    });
    
    audio.addEventListener('pause', () => {
      console.log('Audio paused');
      setIsAudioPlaying(false);
    });

    audio.addEventListener('ended', () => {
      console.log('Audio ended');
      setIsAudioPlaying(false);
    });

    audioRef.current = audio;

    // Add global click handler to enable audio
    const enableAudio = () => {
      setHasUserInteracted(true);
    };

    document.addEventListener('click', enableAudio, { once: true });

    // Cleanup function
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      document.removeEventListener('click', enableAudio);
    };
  }, []);

  const playAudio = async () => {
    if (audioRef.current && isAudioLoaded && hasUserInteracted) {
      try {
        audioRef.current.currentTime = 0;
        await audioRef.current.play();
        console.log('Audio started playing successfully');
      } catch (error) {
        console.error('Error playing audio:', error);
      }
    }
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const resumeAudio = () => {
    if (audioRef.current && hasUserInteracted) {
      audioRef.current.play().catch(error => console.error('Error resuming audio:', error));
    }
  };

  const toggleAudio = () => {
    if (isAudioPlaying) {
      pauseAudio();
    } else {
      resumeAudio();
    }
  };

  return {
    isAudioLoaded,
    isAudioPlaying,
    hasUserInteracted,
    playAudio,
    pauseAudio,
    resumeAudio,
    toggleAudio
  };
};

// ScrollToTop component to scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  
  // Audio management
  const {
    isAudioLoaded,
    isAudioPlaying,
    hasUserInteracted,
    playAudio,
    pauseAudio,
    resumeAudio,
    toggleAudio
  } = useAudioPlayer();

  const handleFirstClick = () => {
    setEnvelopeOpen(true);
  };

  const handleSecondClick = async () => {
    setShowIntro(false);
    
    // Try to play the audio after a short delay to ensure DOM is ready
    setTimeout(async () => {
      if (isAudioLoaded) {
        await playAudio();
      } else {
        // Retry after a short delay
        setTimeout(async () => {
          if (isAudioLoaded) {
            await playAudio();
          }
        }, 1000);
      }
    }, 500);
  };

  const renderIntroPage = () => (
    <IntroPage
      isOpen={envelopeOpen}
      onFirstClick={handleFirstClick}
      onSecondClick={handleSecondClick}
    />
  );

  const renderMainPage = () => (
    <MainPage 
      isAudioPlaying={isAudioPlaying}
      onPauseAudio={pauseAudio}
      onResumeAudio={resumeAudio}
      onToggleAudio={toggleAudio}
    />
  );

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={
          <div className="app">
            {showIntro ? renderIntroPage() : renderMainPage()}
          </div>
        } />
        <Route path="/easter-egg" element={<EasterEggPage />} />
        <Route path="/love-spinner" element={<LoveSpinner />} />
      </Routes>
    </Router>
  );
};

export default App;
