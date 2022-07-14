import '../styles/pages/error.scss';
import img from '../images/img.png';

const Error = () => {
  return (
    <div className='requestError__container'>
      <h1>Sorry!</h1>
      <img src={img}></img>
      <p>An error occurred while processing the request.</p>
    </div>
  );
};

export default Error;
