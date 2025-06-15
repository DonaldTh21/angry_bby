import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { MUSIC_URL } from './constants';
import IntroPage from './pages/IntroPage';
import MainPage from './pages/MainPage';
import EasterEggPage from './pages/EasterEggPage';
import LoveSpinner from './components/LoveSpinner';
import './App.css';

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [isAudioLoaded, setIsAudioLoaded] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Create and configure audio element
    const audio = new Audio();
    audio.src = MUSIC_URL;
    audio.loop = true;
    audio.volume = 0.2; // Reduced volume to 20%

    // Handle audio loading
    audio.addEventListener('canplaythrough', () => {
      console.log('Audio loaded successfully');
      setIsAudioLoaded(true);
    });

    audio.addEventListener('error', (e) => {
      console.error('Error loading audio:', e);
    });

    audioRef.current = audio;

    // Cleanup function
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const handleFirstClick = () => {
    setEnvelopeOpen(true);
  };

  const handleSecondClick = async () => {
    setShowIntro(false);
    
    // Try to play the audio
    try {
      if (audioRef.current && isAudioLoaded) {
        // Reset the audio to the beginning
        audioRef.current.currentTime = 0;
        
        // Attempt to play
        const playPromise = audioRef.current.play();
        
        if (playPromise !== undefined) {
          await playPromise;
          console.log('Audio started playing successfully');
        }
      } else {
        console.log('Audio not loaded yet');
      }
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div className="app">
            {showIntro ? (
              <IntroPage
                isOpen={envelopeOpen}
                onFirstClick={handleFirstClick}
                onSecondClick={handleSecondClick}
              />
            ) : (
              <MainPage />
            )}
          </div>
        } />
        <Route path="/easter-egg" element={<EasterEggPage />} />
        <Route path="/love-spinner" element={<LoveSpinner />} />
      </Routes>
    </Router>
  );
}

export default App;
