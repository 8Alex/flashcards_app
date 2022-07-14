import '../styles/blocks/button.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const PenIcon = (props) => {
  const handleClick = () => {
    props.onClick(props.edit);
  };

  return (
    <div onClick={handleClick}>
      <a className='button__icon'>
        <FontAwesomeIcon icon={faPen} />
      </a>
    </div>
  );
};

const TrashIcon = (props) => {
  const handleDelete = () => {
    props.onClick(props.onDelete);
  };

  return (
    <div onClick={handleDelete}>
      <a className='button__icon'>
        <FontAwesomeIcon icon={faTrash} />
      </a>
    </div>
  );
};

const SaveIcon = (props) => {
  const handleSave = () => {
    if (!props.disabled) {
      props.onClick(props.save);
    }
  };

  const disabledSave = props.disabled ? 'button__icon_disabled' : '';

  return (
    <div onClick={handleSave}>
      <a className={`button__icon ${disabledSave}`}>
        <FontAwesomeIcon icon={faFloppyDisk} />
      </a>
    </div>
  );
};

const CancelIcon = (props) => {
  const handleCancel = () => {
    props.onClick(props.cancel);
  };

  return (
    <div onClick={handleCancel}>
      <a className='button__icon'>
        <FontAwesomeIcon icon={faXmark} />
      </a>
    </div>
  );
};

export { PenIcon, TrashIcon, SaveIcon, CancelIcon };
