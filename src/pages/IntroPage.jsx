import Envelope from '../components/Envelope/Envelope';

const IntroPage = ({ isOpen, onFirstClick, onSecondClick }) => (
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

export default IntroPage; 