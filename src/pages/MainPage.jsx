import React, { useRef, useEffect, useState } from 'react';
import { BG_IMAGE, MUSIC_URL } from '../constants';
import emailjs from '@emailjs/browser';
import { useNavigate } from 'react-router-dom';
import LoveSpinnerTrigger from '../components/LoveSpinnerTrigger';
import LoveSpinner from '../components/LoveSpinner';
import cryingCatBackground from '../assets/image/crying-little-kitten.png';
import howWeMetImage from '../assets/image/how_we_met.webp';
import iKnewILoveYouImage from '../assets/image/i_knew_ilu.webp';
import oneFavMemoryImage from '../assets/image/one_fav_memory.webp';
import baiyaAurBehenImage from '../assets/image/baiya_aur_behen_ka_kahani.webp';
import iLiveEverydayImage from '../assets/image/i_live_everyday.webp';
import './MainPage.css';

const MainPage = () => {
  const navigate = useNavigate();
  const storyRef = useRef();
  const sorryRef = useRef();
  const timelineRef = useRef();
  const promisesRef = useRef();
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
      title: "Whatever It Was, It Was You",
      content: "Maybe it was your laugh, or your eyes, or your smile. Maybe it was your hair, or voice, personality, or watching you talk.But whatever it was, it made me fall pretty damn hard.",
      date: "15-12-2023",
      mood: "romantic"
    },
    {
      id: 2,
      title: "The World of Maybes",
      content: "Feels like i'm wondering in world full of maybes... She was busy or that's what I told myself. But deep down, it felt like maybe she didn't want to talk to me. And that 'maybe' hurt more than a no.",
      date: "01-01-2024",
      mood: "sad"
    },
    {
      id: 3,
      title: "I Don’t Want to Be a Bother… But",
      content: "I’m sorry if I startled you.Lately, I find myself thinking about you more than I probably should.I’ve been wanting to see you… wondering what you’re up to,waiting for your message… or just your name lighting up my screen.Sometimes I think about calling,but then I worry what if it’s the wrong moment? What if I’m a little too much,on the wrong day? Truth is… I miss you.Maybe more than I know how to say.Maybe I’m just overthinking.But still here I am.",
      date: "16-03-2024",
      mood: "sad"
    },
    {
      id: 4,
      title: "I love you",
      content: "I’m sorry for everything that hurt.I didn’t mean it.I love you more than I can say, more than I’ve said. More than I’ve known how to say. More than I’ve shown. And I hate that sometimes love isn’t enough if it doesn’t show up right. But I’m still here. Learning. Loving. Waiting.",
      date: "2024-02-17",
      mood: "romantic"
    }
  ]);
  const [showSpinner, setShowSpinner] = useState(false);
  const complaintFormRef = useRef();
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef(null);
  const thumbnailUrl = "https://placehold.co/600x400/fdfdff/ff69b4?text=Our+Love+Story";

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

  const handleThumbnailClick = () => {
    setIsVideoPlaying(true);
    if (videoRef.current) {
      videoRef.current.play();
      // Request fullscreen
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if (videoRef.current.webkitRequestFullscreen) { // Safari
        videoRef.current.webkitRequestFullscreen();
      } else if (videoRef.current.msRequestFullscreen) { // IE11
        videoRef.current.msRequestFullscreen();
      }
    }
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
            <img 
              src={howWeMetImage}
              alt="How we met" 
            />
            <div className="timeline-content">
              <p>
                <b>How we met</b><br />"Funny how I had no clue that day… that you'd end up meaning so much to me."
              </p>
            </div>
          </div>
          <div className="timeline-item">
            <img 
              src={iKnewILoveYouImage}
              alt="When I knew I loved you" 
            />
            <div className="timeline-content">
              <p><b>When I knew I loved you</b><br />"That smile… yep, that's the main culprit."</p>
            </div>
          </div>
          <div className="timeline-item">
            <img 
              src={oneFavMemoryImage}
              alt="Our favorite memory" 
            />
            <div className="timeline-content">
              <p><b>One of my favorite memory</b><br />"Hands down, playing WWE with you. Nothing beats our goofy battles and your sneaky moves. 😉"</p>
            </div>
          </div>
          <div className="timeline-item">
            <img 
              src={baiyaAurBehenImage}
              alt="A silly moment" 
            />
            <div className="timeline-content">
              <p><b>Beiya aur behen ka kahani</b><br />"you as my 'younger sister.' Cute. Innocent. And absolutely the calm before the storm. 😏"</p>
            </div>
          </div>
          <div className="timeline-item">
            <img 
              src={iLiveEverydayImage}
              alt="A memory I'd relive 10x" 
            />
            <div className="timeline-content">
              <p><b>No big event, no fancy place</b><br />"If I could hit replay on anything, it'd be any moment I was simply next to you."</p>
            </div>
          </div>
        </div>
        <button className="section-nav" onClick={() => scrollToSection(sorryRef)}>Next: I'm Sorry ↓</button>
      </section>

      {/* I'm Sorry */}
      <section 
        className="sorry" 
        ref={sorryRef} 
        style={{
          backgroundColor: '#fdfdff', /* A very light off-white to blend with background */
        }}
      >
        <div 
          style={{
            backgroundImage: `url(${cryingCatBackground})`,
            backgroundSize: '100px',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'left bottom',
            padding: '20px',
             /* Added for subtlety */
          }}
        >
          <h2>I'm Sorry</h2>
          <p className="sorry-message">I've hurt you. I drifted. I got distracted. But I never stopped caring — and I never stopped loving you. I'm learning. I'm growing. And I'm here, really here, asking for a chance to do better — and show it every day.</p>
          <ul className="apologies-list">
            <li>For not listening closely enough</li>
            <li>For letting distance grow</li>
            <li>For not always being present</li>
            <li>For not being there for you emotionally</li>
            <li>For not expressing how much I appreciate you, every single day</li>
            <li>For making you feel alone, even when I was here</li>
            <li>For not celebrating your little wins and joys enough</li>
            <li>For being too quiet when I should've spoken love out loud</li>
            <li>For not reassuring you that you are always enough — more than enough</li>
            <li>For the times I acted distant when all I wanted was to be close</li>
            <li>For not being patient when your heart needed time</li>
          </ul>

        </div>
      </section>

      {/* Feedback Section */}
      <section className="feedback-section" ref={complaintFormRef}>
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
      </section>

      {/* My Promises */}
      <section className="promises" ref={promisesRef}>
        <h2>My Promises</h2>
        <div className="promises-notes">
          <div className="note">I promise to never raise my voice unintentionally.</div>
          <div className="note">I promise to comfort you, not just fix things.</div>
          <div className="note">I promise to listen with love not just hear, but understand</div>
          <div className="note">I promise to make you laugh, especially when you're trying not to.</div>
          <div className="note">I promise to remind you that you're beautiful, even when you don't believe it.</div>
          <div className="note">I promise to check in with your heart, not just your schedule.</div>
          <div className="note">I promise to sneak kisses, leave notes, and maybe write a poem or two.</div>
          <div className="note">I promise to dance with you in the kitchen when no one's watching.</div>
          <div className="note">I promise to dream out loud with you always 💞.</div>
        </div>
      </section>

      {/* For the Future */}
      <section className="future">
        <h2>For the Future</h2>
        <ul className="goals-list">
        <li><span role="img" aria-label="star">🌟</span> To be by your side as soon as I possibly can</li>
        <li><span role="img" aria-label="star">🌟</span> To make you the happiest version of yourself</li>
        <li><span role="img" aria-label="star">🌟</span> To keep fighting over food with you and loving every bite of it</li>
        <li><span role="img" aria-label="star">🌟</span> To hold your hand through storms and sunshine</li>
        <li><span role="img" aria-label="star">🌟</span> To always cheer for you, even on your quiet days</li>
        <li><span role="img" aria-label="star">🌟</span> To build a life with you, one silly, sweet, wild memory at a time</li>
        </ul>
      </section>

      {/* Love Note */}
      <section className="love-note">
        <h2>Love Note</h2>
        <textarea className="love-text" value={"You don't have to forgive me today. But I'll be here. Ready whenever you are."} readOnly />
        <div className="media-embed">
          {!isVideoPlaying ? (
            <div 
              className="video-thumbnail" 
              onClick={handleThumbnailClick}
              style={{
                width: '100%',
                height: '315px',
                backgroundImage: `url(${thumbnailUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                cursor: 'pointer',
                position: 'relative',
                borderRadius: '12px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s ease',
                ':hover': {
                  transform: 'scale(1.02)'
                }
              }}
            >
              <div 
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '80px',
                  height: '80px',
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(255, 105, 180, 0.3)',
                  transition: 'all 0.3s ease',
                  animation: 'pulse 2s infinite'
                }}
              >
                <span style={{ 
                  fontSize: '40px',
                  filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))',
                  animation: 'bounce 1s infinite'
                }}>💝</span>
              </div>
            </div>
          ) : (
            <video 
              ref={videoRef}
              width="100%" 
              height="315" 
              controls
              className="love-video"
              preload="auto"
              style={{
                borderRadius: '12px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
              }}
              onError={(e) => {
                console.error('Video playback error:', e);
                alert('There was an error loading the video. Please check your internet connection and try again.');
              }}
              onEnded={() => {
                // Exit fullscreen when video ends
                if (document.exitFullscreen) {
                  document.exitFullscreen();
                } else if (document.webkitExitFullscreen) { // Safari
                  document.webkitExitFullscreen();
                } else if (document.msExitFullscreen) { // IE11
                  document.msExitFullscreen();
                }
              }}
            >
              <source 
                src="https://pub-473b9b50fba8472bb3666a40d0f26c67.r2.dev/Timeline%201.mp4" 
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
        <div className="cta-links">
          <a href="https://wa.me/+918415014899" target="_blank" rel="noopener" className="cta-btn">💬 Message Me</a>
          <a href="mailto:donaldth18@gmail.com" className="cta-btn">📧 Email Me</a>
          <a href="tel:+918415014899" target="_blank" rel="noopener" className="cta-btn">📞 Call me</a>
        </div>
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
                <div className="letter-mood-tag">
                  {letter.mood === 'romantic' && '💖 Romantic'}
                  {letter.mood === 'apologetic' && '🥺 Apologetic'}
                  {letter.mood === 'grateful' && '🙏 Grateful'}
                  {letter.mood === 'sad' && '💔 Sad'}
                </div>
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

      <style>
        {`
          @keyframes pulse {
            0% {
              transform: translate(-50%, -50%) scale(1);
            }
            50% {
              transform: translate(-50%, -50%) scale(1.1);
            }
            100% {
              transform: translate(-50%, -50%) scale(1);
            }
          }
          @keyframes bounce {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-5px);
            }
          }
          .letter-card.sad {
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
            border-left: 4px solid #6c757d;
          }
          .letter-card.sad .letter-mood-tag {
            background-color: #6c757d;
            color: white;
          }
        `}
      </style>
    </div>
  );
};

export default MainPage; 