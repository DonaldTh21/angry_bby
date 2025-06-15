import EnvelopeSeal from './EnvelopeSeal';
import Card from '../Card/Card';

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

export default Envelope; 