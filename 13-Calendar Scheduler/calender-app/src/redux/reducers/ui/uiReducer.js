import { types } from '../../types/types';

const INITIAL_STATE = {
  modalOpen: false,
};

export const uiReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.uiOpenModal:
      return {
        ...state,
        modalOpen: true,
      };

    case types.uiCloseModal:
      return {
        ...state,
        modalOpen: false,
      };

    default:
      return state;
  }
};
