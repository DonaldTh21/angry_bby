const EnvelopeSeal = ({ isOpen }) => (
  <div className={`envelope-seal ${isOpen ? 'hidden' : ''}`}>
    <span className="seal-heart">💖</span>
  </div>
);

export default EnvelopeSeal; 