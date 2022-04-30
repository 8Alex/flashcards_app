import '../styles/blocks/footer.scss';

const PageFooter = () => {
  return (
    <div className='footer__container'>
      <ul>
        <li className='footer__link'>
          <a href=''>About</a>
        </li>
        <li className='footer__link'>
          <a href=''>Contact Us</a>
        </li>
        <li className='footer__link'>
          <a href=''>Search Box</a>
        </li>
        <li className='footer__link'>
          <a href=''>Cookies Settings</a>
        </li>
        <li className='footer__link'>
          <a href=''>Privacy policy</a>
        </li>
        <li className='footer__link'>
          <a href=''>Terms of service</a>
        </li>
      </ul>
    </div>
  );
};

export default PageFooter;
