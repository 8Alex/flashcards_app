import React, { useState } from 'react';
import '../styles/blocks/list.scss';
import { PenIcon, TrashIcon, SaveIcon, CancelIcon } from './Button';
// import useLocalStorage from '../hooks/useLocalStorage';

const TableRow = (props) => {
  // const [english, setEnglish] = useState(props.english);
  // const [transcription, setTranscription] = useState(props.transcription);
  // const [russian, setRussian] = useState(props.russian);
  // const [tags, setTags] = useState(props.tags);

  // const englishChange = (e) => {
  //   setEnglish(e.target.value);
  // };

  // const transcriptionChange = (e) => {
  //   setTranscription(e.target.value);
  // };

  // const russianChange = (e) => {
  //   setRussian(e.target.value);
  // };

  // const tagsChange = (e) => {
  //   setTags(e.target.value);
  // };

  const [edit, setEdit] = useState(false);
  const [state, setState] = useState(props);
  // const [save, setSave] = useState();

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

  const handleSave = () => {
    let data = JSON.parse(localStorage.getItem('data'));
    data.forEach((element) => {
      if (element.id === state.id) {
        for (const key in element) {
          if (Object.hasOwnProperty.call(element, key)) {
            element[key] = state[key];
          }
        }
      }
    });
    localStorage.setItem('data', JSON.stringify(data));
    setEdit(false);
    setState({ ...state });
  };

  if (edit) {
    return (
      <tbody>
        <tr className='table__body'>
          <td className='table__hover'>{state.number}</td>
          <td className='table__input'>
            <input
              type='text'
              name='text'
              value={state.english}
              onChange={handleChange}
              data-name={'english'}
            ></input>
          </td>
          <td className='table__input'>
            <input
              type='text'
              name='text'
              value={state.transcription}
              onChange={handleChange}
              data-name={'transcription'}
            ></input>
          </td>
          <td className='table__input'>
            <input
              type='text'
              name='text'
              value={state.russian}
              onChange={handleChange}
              data-name={'russian'}
            ></input>
          </td>
          <td className='table__input'>
            <input
              type='text'
              name='text'
              value={state.tags}
              onChange={handleChange}
              data-name={'tags'}
            ></input>
          </td>
          <td className='table__icon'>
            <SaveIcon onClick={handleSave}></SaveIcon>
            <CancelIcon onClick={handleCancel}></CancelIcon>
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
            <PenIcon onClick={() => setEdit(true)}></PenIcon>
            <TrashIcon onClick={props.delete}></TrashIcon>
          </td>
        </tr>
      </tbody>
    );
  }
};

export default TableRow;

// if (save) {
//   return (
//     <tbody>
//       <tr className='table__body'>
//         <td className='table__hover'>{state.number}</td>
//         <td className='table__hover'>{state.english}</td>
//         <td className='table__hover'>{state.transcription}</td>
//         <td className='table__hover'>{state.russian}</td>
//         <td className='table__hover'>{state.tags}</td>
//         <td className='table__icon'>
//           <PenIcon onClick={() => setEdit(true)}></PenIcon>
//           <TrashIcon onClick={props.delete}></TrashIcon>
//         </td>
//       </tr>
//     </tbody>
