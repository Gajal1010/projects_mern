  
import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

export default function PrivateRoute({ component: Component, ...rest }) {
  const userSignin = useSelector((state) => state.user);
  const { userInfo } = userSignin;
  // console.log(userInfo, 'userInfo')
  return (
    <Route
      {...rest}
      render={(props) =>
        userInfo  && userInfo.status === 'admin' ? (
          <Component {...props}></Component>
        ) : (
          <Redirect to="/login" />
        )
      }
    ></Route>
  );
}