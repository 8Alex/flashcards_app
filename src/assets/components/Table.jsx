import { useEffect } from 'react';
import '../styles/pages/table.scss';
import TableRow from './TableRow';
import data from '../../data.json';
import useLocalStorage from '../hooks/useLocalStorage';

const Table = () => {
  const [newData, setData] = useLocalStorage('data', data);

  useEffect(() => {
    setData(newData);
  }, []);

  const handleDelete = (id) => {
    setData(newData.filter((word) => word.id !== id));
  };

  const handleUpdateList = (newData) => {
    setData(newData);
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
            <th>Action</th>
          </tr>
        </thead>
        {newData.map((word, index) => (
          <TableRow
            key={word.id}
            id={word.id}
            english={word.english}
            transcription={word.transcription}
            russian={word.russian}
            tags={word.tags}
            number={index + 1}
            onEdit={handleUpdateList}
            onDelete={() => handleDelete(word.id)}
          ></TableRow>
        ))}
      </table>
    </div>
  );
};

export default Table;
