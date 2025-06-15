import { useRef } from 'react';
import { BG_IMAGE, MUSIC_URL } from '../constants';

const MainPage = () => {
  const storyRef = useRef();
  const sorryRef = useRef();
  const promisesRef = useRef();
  const futureRef = useRef();
  const loveNoteRef = useRef();
  const timelineRef = useRef();

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fhfth-root">
      {/* Homepage */}
      <section className="hero" style={{ backgroundImage: `url(${BG_IMAGE})` }}>
        <div className="overlay" />
        <div className="hero-content">
          <h1>To the one I love — this is my apology, my promise, and my way of saying I never want to stop showing up for you.</h1>
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
              <source src={MUSIC_URL} type="audio/mpeg" />
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
          <li>For not listening closely enough</li>
          <li>For letting distance grow</li>
          <li>For not always being present</li>
        </ul>
        <form className="apology-form" onSubmit={(e) => e.preventDefault()}>
          <input placeholder="Add your own apology..." />
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
          <li><span role="img" aria-label="star">🌟</span> Cuddle under the stars in Kyoto</li>
          <li><span role="img" aria-label="star">🌟</span> Watch every Studio Ghibli movie</li>
          <li><span role="img" aria-label="star">🌟</span> Fight over where to order takeout. Make up. Repeat.</li>
        </ul>
        <form className="goal-form" onSubmit={(e) => e.preventDefault()}>
          <input placeholder="Add a dream or goal..." />
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
            <source src={MUSIC_URL} type="audio/mpeg" />
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
};

export default MainPage; 