import CardHeader from './CardHeader';
import CardMessage from './CardMessage';
import SecretMessage from './SecretMessage';
import CardHearts from './CardHearts';

const Card = ({ isOpen }) => (
  <div className="card">
    <CardHeader />
    <div className="card-body">
      <CardMessage />
      <SecretMessage isOpen={isOpen} />
      <CardHearts />
    </div>
  </div>
);

export default Card; 