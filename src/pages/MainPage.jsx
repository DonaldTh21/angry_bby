import React, { useRef, useEffect, useState } from 'react';
import { BG_IMAGE, MUSIC_URL } from '../constants';
import emailjs from '@emailjs/browser';
import { useNavigate } from 'react-router-dom';
import LoveSpinnerTrigger from '../components/LoveSpinnerTrigger';
import LoveSpinner from '../components/LoveSpinner';

const MainPage = () => {
  const navigate = useNavigate();
  const storyRef = useRef();
  const sorryRef = useRef();
  const timelineRef = useRef();
  const [complaints, setComplaints] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [newComplaint, setNewComplaint] = useState({
    name: '',
    email: '',
    message: '',
    category: 'general'
  });
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [loveLetters] = useState([
    {
      id: 1,
      title: "Our First Date",
      content: "Remember when we first met? The way your eyes lit up when you smiled...",
      date: "2024-02-14",
      mood: "romantic"
    },
    {
      id: 2,
      title: "After Our First Fight",
      content: "I know we had our first disagreement today, but it only made me realize how much I care...",
      date: "2024-02-15",
      mood: "apologetic"
    },
    {
      id: 3,
      title: "Just Because",
      content: "I wanted to tell you how much I appreciate your patience and understanding...",
      date: "2024-02-16",
      mood: "grateful"
    },
    {
      id: 4,
      title: "Missing You",
      content: "Every moment without you feels like a lifetime. I can't wait to see your smile again...",
      date: "2024-02-17",
      mood: "romantic"
    }
  ]);
  const [showSpinner, setShowSpinner] = useState(false);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleComplaintSubmit = async () => {
    if (!newComplaint.message.trim()) return;
    
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Get the mood emoji and text
    const moodOptions = {
      hurt: '🥺 Hurt',
      angry: '😠 Angry',
      distant: '😐 Distant',
      confused: '💭 Confused',
      hopeful: '💕 Hopeful'
    };
    const selectedMood = moodOptions[newComplaint.category];

    try {
      // Send email using EmailJS
      await emailjs.send(
        'service_x148ifu',
        'template_hmkw73j',
        {
          to_email: 'thiyam9@gmail.com',
          message: newComplaint.message + " " + selectedMood,
          from_name: 'Love Letter',
          reply_to: 'thiyam9@gmail.com',
          date: new Date().toLocaleDateString()
        },
        'blS3CFKC9TdY2rogm'
      );

      setComplaints([...complaints, { 
        text: newComplaint.message, 
        type: selectedMood, 
        date: new Date().toLocaleString() 
      }]);
      setNewComplaint({
        name: '',
        email: '',
        message: '',
        category: 'hurt'
      });
      setSubmitStatus({
        type: 'success',
        message: 'Feedback sent successfully!'
      });
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Failed to send feedback. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEasterEggClick = () => {
    navigate('/easter-egg');
  };

  const handleCloseSpinner = () => {
    setShowSpinner(false);
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

      <div className="floating-easter-egg" onClick={() => navigate('/easter-egg')}>
        <div className="easter-egg-trigger">
          <span>💝</span>
          <span>🗝️</span>
        </div>
      </div>

      {/* Add Love Spinner Trigger */}
      <LoveSpinnerTrigger onClick={() => navigate('/love-spinner')} />

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
            <iframe 
              width="100%" 
              height="200" 
              src="https://www.youtube.com/embed/6ksOgOnX8q4" 
              title="Our Song" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            />
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

        {/* Complaint Form */}
        <div className="complaint-section">
          <h3>The official Boyfriend Feedback Form</h3>
          <div className="complaint-form">
            <textarea
              value={newComplaint.message}
              onChange={(e) => setNewComplaint({ ...newComplaint, message: e.target.value })}
              placeholder="Unleash the feedback dragon 🐉"
              className="complaint-input"
            />
            <div className="complaint-actions">
              <select 
                className="complaint-type"
                value={newComplaint.category}
                onChange={(e) => setNewComplaint({ ...newComplaint, category: e.target.value })}
              >
                <option value="hurt">🥺 Hurt</option>
                <option value="angry">😠 Angry</option>
                <option value="distant">😐 Distant</option>
                <option value="confused">💭 Confused</option>
                <option value="hopeful">💕 Hopeful</option>
              </select>
              <button 
                onClick={handleComplaintSubmit}
                disabled={isSubmitting}
                className="complaint-submit"
              >
                {isSubmitting ? 'Sending...' : 'Okay...I\'m Ready'}
              </button>
            </div>
            {submitStatus && (
              <div className={`submit-status ${submitStatus.type}`}>
                {submitStatus.message}
              </div>
            )}
          </div>
          {complaints.length > 0 && (
            <div className="complaints-list">
              {complaints.map((complaint, index) => (
                <div key={index} className="complaint-item">
                  <span className="complaint-date">{complaint.date}</span>
                  <div className="complaint-mood">{complaint.type}</div>
                  <p>{complaint.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <button className="section-nav" onClick={() => scrollToSection(timelineRef)}>Next: Timeline ↓</button>
      </section>

      {/* My Promises */}
      <section className="promises">
        <h2>My Promises</h2>
        <div className="promises-notes">
          <div className="note">I promise to be present.</div>
          <div className="note">I promise to make you feel chosen.</div>
          <div className="note">I promise to flirt with you even when we're old and grumpy.</div>
          <div className="note">I promise to ask how you are before I vent about my day.</div>
          <div className="note">I promise to take you on a surprise date when we're back in sync.</div>
        </div>
        <button className="section-nav" onClick={() => scrollToSection(timelineRef)}>Next: Timeline ↓</button>
      </section>

      {/* For the Future */}
      <section className="future">
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
        <button className="section-nav" onClick={() => scrollToSection(timelineRef)}>Next: Timeline ↓</button>
      </section>

      {/* Love Note */}
      <section className="love-note">
        <h2>Love Note</h2>
        <textarea className="love-text" value={"You don't have to forgive me today. But I'll be here. Ready whenever you are."} readOnly />
        <div className="media-embed">
          <iframe 
            width="100%" 
            height="315" 
            src="https://www.youtube.com/embed/6ksOgOnX8q4" 
            title="Love Song" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          />
        </div>
        <div className="cta-links">
          <a href="https://wa.me/" target="_blank" rel="noopener" className="cta-btn">Message Me (WhatsApp)</a>
          <a href="mailto:" className="cta-btn">Email Me</a>
          <a href="https://instagram.com/" target="_blank" rel="noopener" className="cta-btn">DM on IG</a>
        </div>
        <button className="section-nav" onClick={() => scrollToSection(timelineRef)}>Next: Timeline ↓</button>
      </section>

      {/* Love Letter Archive */}
      <section className="archive">
        <h2>Love Letter Archive</h2>
        <div className="archive-container">
          <div className="letters-grid">
            {loveLetters.map(letter => (
              <div key={letter.id} className={`letter-card ${letter.mood}`}>
                <div className="letter-header">
                  <h3>{letter.title}</h3>
                  <span className="letter-date">{letter.date}</span>
                </div>
                <p className="letter-content">{letter.content}</p>
                <div className="letter-mood-tag">{letter.mood}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {showEasterEgg && (
        <div className="easter-egg-overlay" onClick={() => navigate('/easter-egg')}>
          <div className="easter-egg-content">
            <h2>You found me! 💝</h2>
            <p>Click to see something special...</p>
          </div>
        </div>
      )}

      {showSpinner && <LoveSpinner onClose={handleCloseSpinner} />}

      {/* Footer with Easter Egg */}
      <footer className="main-footer">
        <div className="footer-content">
          <p>Made with 💖 for you</p>
        </div>
      </footer>
    </div>
  );
};

export default MainPage; 