import { useState, useEffect } from 'react';
import '../styles/pages/table.scss';
import TableRow from './TableRow';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Modal from './Modal';
import Error from './Error';
import Loading from './Loading';
import { observer, inject } from 'mobx-react';

const Table = ({ wordsStore }) => {
  const [isModalAddWord, setIsModalAddWord] = useState(false);

  const showModalAddWord = () => {
    setIsModalAddWord(true);
  };

  const handleCancelAddWord = () => {
    setIsModalAddWord(false);
  };

  useEffect(() => {
    wordsStore.loadData();
  }, []);

  const handleDelete = (id) => {
    wordsStore.deleteWords(id);
  };

  const handleUpdateList = (id) => {
    wordsStore.editWords(id);
  };

  if (wordsStore.isLoading) {
    return <Loading />;
  }

  if (wordsStore.error) {
    return <Error />;
  }

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
              <a
                className='button__icon button__icon_plus'
                onClick={showModalAddWord}
              >
                <FontAwesomeIcon icon={faPlus} />
              </a>
              <Modal
                visible={isModalAddWord}
                onCancel={handleCancelAddWord}
                key={Date.now()}
                id={Date.now()}
                english={'example'}
                transcription={'[ɪɡˈzæmpl]'}
                russian={'пример'}
                tags={'другое'}
              ></Modal>
            </th>
          </tr>
        </thead>
        {wordsStore.words.map((word, index) => (
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
    </div>
  );
};

export default inject(['wordsStore'])(observer(Table));
