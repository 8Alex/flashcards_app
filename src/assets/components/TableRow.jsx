import React, { useState, useEffect, useContext } from 'react';
import '../styles/blocks/list.scss';
import { PenIcon, TrashIcon, SaveIcon, CancelIcon } from './Button';
import { WordsContext } from '../context/Words';

const TableRow = (props) => {
  const [edit, setEdit] = useState(false);
  const [state, setState] = useState(props);
  const [errors, setErrors] = useState({});
  const [disabled, setDisabled] = useState(false);
  const { wordsСollection } = useContext(WordsContext);

  useEffect(() => {
    setState(props);
  }, [props]);

  useEffect(() => {
    checkValidation();
  }, [state]);

  const handleCancel = () => {
    setEdit(false);
    setState({ ...props });
  };

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.dataset.name]: event.target.value,
    });
  };

  const checkValidation = () => {
    const newErrors = Object.keys(state).reduce((account, item) => {
      switch (item) {
        case 'english':
        case 'transcription':
        case 'russian':
        case 'tags':
          account = {
            ...account,
            [item]:
              state[item].trim().length > 0 ? undefined : 'Заполните поле',
          };
          break;
      }
      return account;
    }, {});
    setErrors(newErrors);

    let disabledCheck = Object.keys(newErrors).some((item) => {
      return newErrors[item] !== undefined;
    });
    setDisabled(disabledCheck);
  };

  const handleSave = () => {
    wordsСollection.forEach((element) => {
      if (element.id === state.id) {
        for (const key in element) {
          if (Object.hasOwnProperty.call(element, key)) {
            element[key] = state[key];
          }
        }
      }
    });
    props.onEdit(wordsСollection);
    setEdit(false);
  };

  if (edit) {
    return (
      <tbody>
        <tr className='table__body'>
          <td className='table__hover'>{state.number}</td>
          <td
            className={
              'table__input' + ' ' + (!errors.english ? '' : 'table__error')
            }
          >
            <input
              type='text'
              name='text'
              value={state.english}
              onChange={handleChange}
              data-name={'english'}
            ></input>
            <span className='table__errorMessage'>{errors.english}</span>
          </td>
          <td
            className={
              'table__input' +
              ' ' +
              (!errors.transcription ? '' : 'table__error')
            }
          >
            <input
              type='text'
              name='text'
              value={state.transcription}
              onChange={handleChange}
              data-name={'transcription'}
            ></input>
            <span className='table__errorMessage'>{errors.transcription}</span>
          </td>
          <td
            className={
              'table__input' + ' ' + (!errors.russian ? '' : 'table__error')
            }
          >
            <input
              type='text'
              name='text'
              value={state.russian}
              onChange={handleChange}
              data-name={'russian'}
            ></input>
            <span className='table__errorMessage'>{errors.russian}</span>
          </td>
          <td
            className={
              'table__input' + ' ' + (!errors.tags ? '' : 'table__error')
            }
          >
            <input
              type='text'
              name='text'
              value={state.tags}
              onChange={handleChange}
              data-name={'tags'}
            ></input>
            <span className='table__errorMessage'>{errors.tags}</span>
          </td>
          <td className='table__icon'>
            <SaveIcon onClick={handleSave} disabled={disabled} />
            <CancelIcon onClick={handleCancel} />
          </td>
        </tr>
      </tbody>
    );
  } else {
    return (
      <tbody>
        <tr className='table__body'>
          <td className='table__hover'>{props.number}</td>
          <td className='table__hover'>{props.english}</td>
          <td className='table__hover'>{props.transcription}</td>
          <td className='table__hover'>{props.russian}</td>
          <td className='table__hover'>{props.tags}</td>
          <td className='table__icon'>
            <PenIcon onClick={() => setEdit(true)} />
            <TrashIcon onClick={props.onDelete} />
          </td>
        </tr>
      </tbody>
    );
  }
};

export default TableRow;
