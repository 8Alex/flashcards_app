import { useState, useEffect, useContext } from 'react';
import '../styles/blocks/modal.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { WordsContext } from '../context/Words';

const Modal = (props) => {
  const [items, setItems] = useState(props);
  const { wordsСollection, setWordsСollection, addWords } =
    useContext(WordsContext);
  const [errorsForm, setErrorsForm] = useState({});
  const [disabledBtn, setDisabledBtn] = useState(false);

  useEffect(() => {
    checkForm();
  }, [items]);

  const disabledAdd = disabledBtn ? 'button__disabled button' : '';

  const handleChange = (event) => {
    setItems({
      ...items,
      [event.target.dataset.name]: event.target.value,
    });
  };

  const checkForm = () => {
    const newErrorsForm = Object.keys(items).reduce((account, item) => {
      switch (item) {
        case 'english':
        case 'transcription':
        case 'russian':
        case 'tags':
          account = {
            ...account,
            [item]:
              items[item].trim().length > 0 ? undefined : 'Заполните поле',
          };
          break;
      }
      return account;
    }, {});
    setErrorsForm(newErrorsForm);

    let disabledForm = Object.keys(newErrorsForm).some((item) => {
      return newErrorsForm[item] !== undefined;
    });
    setDisabledBtn(disabledForm);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItems = [...wordsСollection];
    newItems.push(items);
    addWords(items);
    setWordsСollection(newItems);
    props.onCancel();
  };

  return (
    <div
      className={
        props.visible ? 'modal__container visible__modal' : 'modal__container'
      }
    >
      <div className='modal__innerContainer'>
        <div className='modal__header'>
          <a
            className='button__icon button__icon_close'
            onClick={props.onCancel}
          >
            <FontAwesomeIcon icon={faXmark} />
          </a>
          <h2 className='modal__title'>New word</h2>
        </div>
        <form className='modal__form' onSubmit={handleSubmit}>
          <label htmlFor='english'>English:</label>
          <input
            className='modal__item'
            type='text'
            name='text'
            value={items.english}
            onChange={handleChange}
            data-name={'english'}
          ></input>
          <span className='modal__errorMessage'>{errorsForm.english}</span>
          <label htmlFor='transcription'>Transcription:</label>
          <input
            className='modal__item'
            type='text'
            name='text'
            value={items.transcription}
            onChange={handleChange}
            data-name={'transcription'}
          ></input>
          <span className='modal__errorMessage'>
            {errorsForm.transcription}
          </span>
          <label htmlFor='russian'>Russian:</label>
          <input
            className='modal__item'
            type='text'
            name='text'
            value={items.russian}
            onChange={handleChange}
            data-name={'russian'}
          ></input>
          <span className='modal__errorMessage'>{errorsForm.russian}</span>
          <label htmlFor='tags'>Tags:</label>
          <input
            className='modal__item'
            type='text'
            name='text'
            value={items.tags}
            onChange={handleChange}
            data-name={'tags'}
          ></input>
          <span className='modal__errorMessage'>{errorsForm.tags}</span>
          <div className={`modal__addBtn ${disabledAdd}`}>
            <button type='submit'>Добавить</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
