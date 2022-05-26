import { useState } from 'react';
import '../styles/blocks/flashcard.scss';

const FlashCard = (props) => {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked(!checked);
  };

  return (
    <div className='flashcard__item'>
      <div className='flashcard__english'>{props.english}</div>
      <div className='flashcard__transcription'>{props.transcription}</div>
      {checked ? (
        <div className='flashcard__russian'>{props.russian}</div>
      ) : (
        <button className='flashcard__button' onClick={handleChange}>
          Проверить
        </button>
      )}
    </div>
  );
};

export default FlashCard;
