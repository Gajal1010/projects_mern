import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store/store';
import { AppRouter } from './router/AppRouter';

export const CalenderApp = () => {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
};
