import '../styles/pages/loading.scss';

const Loading = () => {
  return (
    <div className='loading__container'>
      <svg className='loading__spinner' viewBox='0 0 50 50'>
        <circle
          className='loading__path'
          cx='25'
          cy='25'
          r='20'
          fill='none'
          strokeWidth='5'
        ></circle>
      </svg>
    </div>
  );
};

export default Loading;
