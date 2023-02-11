import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { LoginScreen } from '../components/auth/LoginScreen';
import { CalenderScreen } from '../components/calender/CalenderScreen';
import { Spinner } from '../components/ui/Spinner';
import { startChecking } from '../redux/actions/auth/auth';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
export const AppRouter = () => {
  const dispatch = useDispatch();
  const { checking, uid } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(startChecking());
  }, [dispatch]);

  if (checking) {
    return <Spinner />;
  }

  return (
    <Router>
      <div>
        <Switch>
          <PublicRoute exact path='/login' component={LoginScreen} isAuthenticated={!!uid} />
          <PrivateRoute exact path='/' component={CalenderScreen} isAuthenticated={!!uid} />

          <Redirect to='/' />
        </Switch>
      </div>
    </Router>
  );
};
