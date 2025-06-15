const SecretMessage = ({ isOpen }) => (
  <div className={`secret-message ${isOpen ? 'reveal' : ''}`}>
    <p className="secret-text">Psst... There's a hidden secret here! 💝</p>
  </div>
);

export default SecretMessage; 