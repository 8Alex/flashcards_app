import { useState, useEffect } from 'react';
import '../styles/pages/training.scss';
import FlashCard from './Flashcard';
import Error from './Error';
import Loading from './Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { faCircleRight } from '@fortawesome/free-solid-svg-icons';
import { observer, inject } from 'mobx-react';

const Training = ({ choosenCard = 0, wordsStore }) => {
  const [index, setIndex] = useState(choosenCard);
  const [count, setCount] = useState(0);
  const [learnCard, setLearnCard] = useState([]);

  useEffect(() => {
    const newIndex = checkIndex(choosenCard);
    setIndex(newIndex);
  }, [choosenCard]);

  useEffect(() => {
    wordsStore.loadData();
  }, []);

  const checkIndex = (index) => {
    if (index < 0) {
      return wordsStore.words.length - 1;
    } else if (index >= wordsStore.words.length) {
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

  if (wordsStore.isLoading) {
    return <Loading />;
  }

  if (wordsStore.error) {
    return <Error />;
  }

  const cards = wordsStore.words.map((card) => {
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
          {wordsStore.words && wordsStore.words.length > 0 ? (
            cards[index]
          ) : (
            <div className='flashcard__loading'>Loading...</div>
          )}
        </div>
        <div className='flashcard__navigation'>
          {index < wordsStore.words.length - 1 ? (
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
        {wordsStore.words && wordsStore.words.length > 0 ? (
          <div className='flashcard__count'>
            Card {index + 1} of {wordsStore.words.length}
          </div>
        ) : (
          ''
        )}
      </div>
      <div className='flashcard__learn'>Learned words:{count}</div>
    </div>
  );
};

export default inject(['wordsStore'])(observer(Training));
