import { useState, useRef, useEffect } from 'react';
import '../styles/blocks/flashcard.scss';

const FlashCard = (props) => {
  const [checked, setChecked] = useState(false);
  const ref = useRef();

  useEffect(() => ref.current.focus(), [props.english]);

  const handleChange = () => {
    setChecked(!checked);
    props.cardsCount();
  };

  return (
    <div className='flashcard__item'>
      <div className='flashcard__english'>{props.english}</div>
      <div className='flashcard__transcription'>{props.transcription}</div>
      {checked ? (
        <div className='flashcard__russian'>{props.russian}</div>
      ) : (
        <button className='flashcard__button' onClick={handleChange} ref={ref}>
          Проверить
        </button>
      )}
    </div>
  );
};

export default FlashCard;
