import '../styles/pages/noMatch.scss';
import { Link } from 'react-router-dom';

const NoMatch = () => {
  return (
    <div className='error__container'>
      <div className='error__code'>404</div>
      <div className='error__text'>Uh oh we have a problem!</div>
      <Link className='error__link' to='/'>
        Take me away
      </Link>
    </div>
  );
};

export default NoMatch;
