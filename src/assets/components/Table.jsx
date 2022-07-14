import { useContext } from 'react';
import '../styles/pages/table.scss';
import TableRow from './TableRow';
import { WordsContext } from '../context/Words';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Modal from './Modal';

const Table = () => {
  const { wordsСollection, setWordsСollection, editWords, deleteWords } =
    useContext(WordsContext);

  const handleDelete = (id) => {
    const deleteWordsСollection = [...wordsСollection];
    setWordsСollection(deleteWordsСollection.filter((word) => word.id !== id));
    deleteWords(id);
  };

  const handleUpdateList = (id) => {
    const editWordsСollection = [...wordsСollection];
    editWords(editWordsСollection.find((word) => word.id == id));
    setWordsСollection(wordsСollection);
  };

  return (
    <div className='table__container'>
      <table className='table__innerContainer'>
        <thead>
          <tr className='table__head'>
            <th>#</th>
            <th>English</th>
            <th>Transcription</th>
            <th>Russian</th>
            <th>Tags</th>
            <th>
              Action
              <a href='#openModal' className='button__icon button__icon_plus'>
                <FontAwesomeIcon icon={faPlus} />
              </a>
            </th>
          </tr>
        </thead>
        {wordsСollection.map((word, index) => (
          <TableRow
            key={word.id}
            id={word.id}
            english={word.english}
            transcription={word.transcription}
            russian={word.russian}
            tags={word.tags}
            number={index + 1}
            onEdit={() => handleUpdateList(word.id)}
            onDelete={() => handleDelete(word.id)}
          ></TableRow>
        ))}
      </table>
      <Modal
        key={Date.now()}
        id={Date.now()}
        english={'example'}
        transcription={'[ɪɡˈzæmpl]'}
        russian={'пример'}
        tags={'другое'}
      ></Modal>
    </div>
  );
};

export default Table;
