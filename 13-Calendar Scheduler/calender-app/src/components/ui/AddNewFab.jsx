import React from 'react';
import { useDispatch } from 'react-redux';
import { uiOpenModal } from '../../redux/actions/ui/ui';
import { CustomIcon } from './CustomIcon';

export const AddNewFab = () => {
  const dispatch = useDispatch();
  const handleOpenModal = () => {
    dispatch(uiOpenModal());
  };
  return (
    <button className='btn btn-primary fab' onClick={handleOpenModal}>
      <CustomIcon className={'fas fa-plus'} />
    </button>
  );
};
