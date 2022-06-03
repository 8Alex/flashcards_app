import { useState, useEffect } from 'react';
import '../styles/pages/training.scss';
import FlashCard from './Flashcard';
import data from '../../data.json';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { faCircleRight } from '@fortawesome/free-solid-svg-icons';

const Training = ({ choosenCard = 0 }) => {
  const [index, setIndex] = useState(choosenCard);
  const [count, setCount] = useState(0);
  const [learnCard, setLearnCard] = useState([]);

  useEffect(() => {
    const newIndex = checkIndex(choosenCard);
    setIndex(newIndex);
  }, [choosenCard]);

  const checkIndex = (index) => {
    if (index < 0) {
      return data.length - 1;
    } else if (index >= data.length) {
      return 0;
    }
    return index;
  };

  function previousCard() {
    setIndex(index - 1);
  }

  function nextCard() {
    setIndex(index + 1);
  }

  const cardsCount = (id) => {
    const newlearnCard = [...learnCard];

    if (!newlearnCard.includes(id)) {
      newlearnCard.push(id);
      setLearnCard(newlearnCard);
      setCount(count + 1);
    } else {
      setCount(count);
    }
  };

  const cards = data.map((card) => {
    return (
      <FlashCard
        key={card.id}
        english={card.english}
        transcription={card.transcription}
        russian={card.russian}
        cardsCount={() => cardsCount(card.id)}
      />
    );
  });

  return (
    <div className='flashcard__container'>
      <div className='flashcard__innerContainer'>
        <div className='flashcard__navigation'>
          {index > 0 ? (
            <a className='flashcard__btn' onClick={previousCard}>
              <FontAwesomeIcon icon={faCircleLeft} />
            </a>
          ) : (
            <a className='flashcard__btn flashcard__btn_disabled'>
              <FontAwesomeIcon icon={faCircleLeft} />
            </a>
          )}
        </div>
        <div>
          {data && data.length > 0 ? (
            cards[index]
          ) : (
            <div className='flashcard__loading'>Loading...</div>
          )}
        </div>
        <div className='flashcard__navigation'>
          {index < data.length - 1 ? (
            <a className='flashcard__btn' onClick={nextCard}>
              <FontAwesomeIcon icon={faCircleRight} />
            </a>
          ) : (
            <a className='flashcard__btn flashcard__btn_disabled'>
              <FontAwesomeIcon icon={faCircleRight} />
            </a>
          )}
        </div>
      </div>
      <div>
        {data && data.length > 0 ? (
          <div className='flashcard__count'>
            Card {index + 1} of {data.length}
          </div>
        ) : (
          ''
        )}
      </div>
      <div className='flashcard__learn'>Learned words:{count}</div>
    </div>
  );
};

export default Training;
