import { useRef, useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import envelopeAnimation from './assets/envelope.json';
import './App.css';

const babyPink = '#FFD1DC';
const softBeige = '#FFF6F6';

const bgImage = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80'; // Placeholder, replace with your own
const musicUrl = 'https://cdn.pixabay.com/audio/2022/10/16/audio_12b6b7b6b7.mp3'; // Placeholder, replace with your own

function scrollToSection(ref) {
  ref.current?.scrollIntoView({ behavior: 'smooth' });
}

function App() {
  const storyRef = useRef();
  const sorryRef = useRef();
  const promisesRef = useRef();
  const futureRef = useRef();
  const loveNoteRef = useRef();
  const [musicOn, setMusicOn] = useState(false);
  const [apologies, setApologies] = useState([
    'For not listening closely enough',
    'For letting distance grow',
    'For not always being present',
  ]);
  const [newApology, setNewApology] = useState('');
  const [goals, setGoals] = useState([
    'Cuddle under the stars in Kyoto',
    'Watch every Studio Ghibli movie',
    'Fight over where to order takeout. Make up. Repeat.',
  ]);
  const [newGoal, setNewGoal] = useState('');
  const [showIntro, setShowIntro] = useState(true);
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [hearts, setHearts] = useState([]);

  // Mobile: swipe timeline to next/prev with buttons
  const timelineRef = useRef();
  // Touch swipe for timeline
  useEffect(() => {
    const el = timelineRef.current;
    if (!el) return;
    let startX = 0;
    let scrollLeft = 0;
    let isDown = false;
    let moved = false;
    const onTouchStart = (e) => {
      isDown = true;
      moved = false;
      startX = e.touches[0].pageX - el.offsetLeft;
      scrollLeft = el.scrollLeft;
    };
    const onTouchMove = (e) => {
      if (!isDown) return;
      moved = true;
      const x = e.touches[0].pageX - el.offsetLeft;
      const walk = (startX - x);
      el.scrollLeft = scrollLeft + walk;
    };
    const onTouchEnd = () => {
      isDown = false;
    };
    el.addEventListener('touchstart', onTouchStart);
    el.addEventListener('touchmove', onTouchMove);
    el.addEventListener('touchend', onTouchEnd);
    return () => {
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchmove', onTouchMove);
      el.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  // Add floating hearts
  useEffect(() => {
    const createHeart = () => {
      const heart = {
        id: Date.now(),
        x: Math.random() * window.innerWidth,
        y: window.innerHeight + 50,
        size: Math.random() * 20 + 10,
        speed: Math.random() * 2 + 1,
        emoji: ['❤️', '💖', '💝', '💕', '💗'][Math.floor(Math.random() * 5)]
      };
      setHearts(prev => [...prev, heart]);
    };

    const interval = setInterval(createHeart, 2000);
    return () => clearInterval(interval);
  }, []);

  // Update heart positions
  useEffect(() => {
    const updateHearts = () => {
      setHearts(prev => 
        prev
          .map(heart => ({
            ...heart,
            y: heart.y - heart.speed
          }))
          .filter(heart => heart.y > -50)
      );
    };

    const interval = setInterval(updateHearts, 50);
    return () => clearInterval(interval);
  }, []);

  if (showIntro) {
    return (
      <div className="intro-modal">
        <div className="envelope-box">
          <div className="envelope" onClick={() => setShowIntro(false)}>
            <div className="envelope-flap"></div>
            <div className="envelope-body">
              <div className="envelope-seal">
                <span className="seal-heart">💖</span>
              </div>
              <div className="envelope-address">To My Sweet Bread</div>
              <div className="envelope-content">
                <div className="card">
                  <div className="card-header">
                    <span className="animated-sparkle">✨</span>
                    <h3>To My Special Someone</h3>
                    <span className="animated-sparkle">✨</span>
                  </div>
                  <div className="card-body">
                    <p className="card-message">
                      Every moment with you feels like a beautiful dream come true. 
                      Your smile brightens my day, and your love fills my heart with joy.
                    </p>
                    <div className="card-hearts">
                      <span className="animated-heart">💖</span>
                      <span className="animated-heart">💝</span>
                      <span className="animated-heart">💕</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="envelope-back"></div>
          </div>
      
        </div>
      </div>
    );
  }

  return (
    <div className="fhfth-root">
      {/* Floating Hearts Background */}
      <div className="background-hearts">
        {hearts.map(heart => (
          <div
            key={heart.id}
            className="heart"
            style={{
              left: `${heart.x}px`,
              top: `${heart.y}px`,
              fontSize: `${heart.size}px`,
              animationDelay: `${Math.random() * 2}s`
            }}
          >
            {heart.emoji}
          </div>
        ))}
      </div>

      {/* Homepage */}
      <section className="hero" style={{ backgroundImage: `url(${bgImage})` }}>
        <div className="overlay" />
        <div className="hero-content">
          <h1>To the one I love — this is my apology, my promise, and my way of saying I never want to stop showing up for you.</h1>
          <div className="music-toggle">
            <button onClick={() => setMusicOn((m) => !m)}>{musicOn ? 'Pause Music' : 'Play Music'}</button>
            {musicOn && <audio src={musicUrl} autoPlay loop controls style={{ display: 'none' }} />}
          </div>
          <button className="cta" onClick={() => scrollToSection(storyRef)}>Start Reading ↓</button>
        </div>
      </section>

      {/* Our Story */}
      <section className="story" ref={storyRef}>
        <h2>Our Story</h2>
        <div className="timeline" ref={timelineRef}>
          <div className="timeline-item">
            <img src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80" alt="How we met" />
            <p><b>How we met</b><br />"It felt like fate the moment our eyes met."</p>
          </div>
          <div className="timeline-item">
            <img src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80" alt="When I knew I loved you" />
            <p><b>When I knew I loved you</b><br />"It was in the quiet moments, when you laughed at my worst jokes."</p>
          </div>
          <div className="timeline-item">
            <img src="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80" alt="Our favorite memory" />
            <p><b>Our favorite memory</b><br />"Dancing in the kitchen, just us and the music."</p>
          </div>
          <div className="timeline-item">
            <img src="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80" alt="A silly moment" />
            <p><b>A silly moment</b><br />"That time we tried to cook together and nearly set off the fire alarm."</p>
          </div>
          <div className="timeline-item">
            <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80" alt="A memory I'd relive 10x" />
            <p><b>A memory I'd relive 10x</b><br />"Watching the sunrise, wrapped up in each other."</p>
          </div>
          <div className="timeline-item audio">
            <audio controls>
              <source src="https://cdn.pixabay.com/audio/2022/10/16/audio_12b6b7b6b7.mp3" type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
            <p><i>Our song</i></p>
          </div>
        </div>
        <button className="section-nav" onClick={() => scrollToSection(sorryRef)}>Next: I'm Sorry ↓</button>
      </section>

      {/* I'm Sorry */}
      <section className="sorry" ref={sorryRef}>
        <h2>I'm Sorry</h2>
        <p className="sorry-message">I've hurt you. I drifted. I got distracted. But I never stopped caring — and I never stopped loving you. I'm learning. I'm growing. And I'm here, really here, asking for a chance to do better — and show it every day.</p>
        <ul className="apologies-list">
          {apologies.map((a, i) => <li key={i}>{a}</li>)}
        </ul>
        <form className="apology-form" onSubmit={e => { e.preventDefault(); if (newApology) { setApologies([...apologies, newApology]); setNewApology(''); } }}>
          <input value={newApology} onChange={e => setNewApology(e.target.value)} placeholder="Add your own apology..." />
          <button type="submit">Add</button>
        </form>
        <button className="section-nav" onClick={() => scrollToSection(promisesRef)}>Next: My Promises ↓</button>
      </section>

      {/* My Promises */}
      <section className="promises" ref={promisesRef}>
        <h2>My Promises</h2>
        <div className="promises-notes">
          <div className="note">I promise to be present.</div>
          <div className="note">I promise to make you feel chosen.</div>
          <div className="note">I promise to flirt with you even when we're old and grumpy.</div>
          <div className="note">I promise to ask how you are before I vent about my day.</div>
          <div className="note">I promise to take you on a surprise date when we're back in sync.</div>
        </div>
        <button className="section-nav" onClick={() => scrollToSection(futureRef)}>Next: For the Future ↓</button>
      </section>

      {/* For the Future */}
      <section className="future" ref={futureRef}>
        <h2>For the Future</h2>
        <ul className="goals-list">
          {goals.map((g, i) => <li key={i}><span role="img" aria-label="star">🌟</span> {g}</li>)}
        </ul>
        <form className="goal-form" onSubmit={e => { e.preventDefault(); if (newGoal) { setGoals([...goals, newGoal]); setNewGoal(''); } }}>
          <input value={newGoal} onChange={e => setNewGoal(e.target.value)} placeholder="Add a dream or goal..." />
          <button type="submit">Add</button>
        </form>
        <button className="section-nav" onClick={() => scrollToSection(loveNoteRef)}>Next: Love Note ↓</button>
      </section>

      {/* Love Note */}
      <section className="love-note" ref={loveNoteRef}>
        <h2>Love Note</h2>
        <textarea className="love-text" value={"You don't have to forgive me today. But I'll be here. Ready whenever you are."} readOnly />
        <div className="media-embed">
          <video width="320" height="180" controls poster="https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80">
            <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <audio controls>
            <source src="https://cdn.pixabay.com/audio/2022/10/16/audio_12b6b7b6b7.mp3" type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
        <div className="cta-links">
          <a href="https://wa.me/" target="_blank" rel="noopener" className="cta-btn">Message Me (WhatsApp)</a>
          <a href="mailto:" className="cta-btn">Email Me</a>
          <a href="https://instagram.com/" target="_blank" rel="noopener" className="cta-btn">DM on IG</a>
        </div>
      </section>
    </div>
  );
}

export default App;
