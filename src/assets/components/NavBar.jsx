import '../styles/blocks/header.scss';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <div className='header__container'>
      <Link to='/' className='header__caption'>
        <h1>English Dictionary</h1>
      </Link>
      <nav className='header__inner'>
        <Link className='header__link' to='/'>
          Word list
        </Link>
        <Link className='header__link' to='/game'>
          Game
        </Link>
      </nav>
    </div>
  );
};

export default NavBar;
