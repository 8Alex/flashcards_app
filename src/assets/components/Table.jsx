import { useState } from 'react';
import '../styles/pages/table.scss';
import TableRow from './TableRow';
import data from '../../data.json';

const Table = () => {
  // const [edit, setEdit] = useState();

  // const handleCancel = () => {
  //   setEdit(!edit);
  // };

  // localStorage.setItem('data', JSON.stringify(data));
  // let arrayData = JSON.parse(localStorage.getItem('data'));

  const [newData, setData] = useState(data);
  localStorage.setItem('data', JSON.stringify(newData));

  const handleDelete = (id) => {
    setData(newData.filter((word) => word.id !== id));
    localStorage.setItem('data', JSON.stringify(newData));
  };

  const handleUpdateList = (newData) => {
    setData(newData);
    localStorage.setItem('data', JSON.stringify(newData));
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
            // isEdit={edit === i}
            // edit={() => setEdit(i)}
            // cancel={() => handleCancel(i)}
            onEdit={handleUpdateList}
            delete={() => handleDelete(word.id)}
          ></TableRow>
        ))}
      </table>
    </div>
  );
};

export default Table;
