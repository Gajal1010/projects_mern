import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

import ScreenHome from './ScreenHome';
import ScreenMyArticles from './ScreenMyArticles';
import ScreenArticlesBySource from './ScreenArticlesBySource';
import ScreenSource from './ScreenSource';

import userToken from './reducer/user';
import langueCode from './reducer/language'
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

const store = createStore(combineReducers({  userToken, langueCode}));

function App() {

  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path='/' component={ScreenHome} />
          <Route path='/screenmyarticles' component={ScreenMyArticles} />
          <Route path='/screenarticlesbysource/:id' component={ScreenArticlesBySource} />
          <Route path='/screensource' component={ScreenSource} />
        </Switch>
      </Router>
    </Provider>

  );
}

export default App;
