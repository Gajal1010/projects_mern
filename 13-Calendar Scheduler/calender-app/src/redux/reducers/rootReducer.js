import { combineReducers } from 'redux';
import { authReducer } from './auth/authReducer';
import { calenderReducer } from './calender/calenderReducer';
import { uiReducer } from './ui/uiReducer';

export const rootReducer = combineReducers({
  ui: uiReducer,
  calender: calenderReducer,
  auth: authReducer,
});
