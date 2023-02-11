import React from 'react'
import { Route, Switch } from 'react-router';

import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import Checkout from './components/Checkout/Checkout'
import DetailScreen from './screens/DetailScreen/DetailScreen'
import OrderScreen from './screens/OrderScreen'
import AdminOrderScreen from './screens/AdminOrderScreen'
import PrivateRoute from './components/Common/PrivateRoute'
import AdminRoute from './components/Common/AdminRoute'

function Routes() {
    return (
        <Switch>
          <Route exact path="/" render={() => <HomeScreen />} />
          <Route exact path="/login" render={() => <LoginScreen />} />
          <Route exact path="/register" render={() => <RegisterScreen />} />
          <Route exact path="/checkout" render={() => <Checkout />} />
          <Route exact path="/detail/:id" render={() => <DetailScreen />} />
          <PrivateRoute
            path="/orders"
            component={OrderScreen}
          ></PrivateRoute>
          <AdminRoute
            path="/adminorders"
            component={AdminOrderScreen}
          ></AdminRoute>
          {/* <Route exact path="/shipping" render={() => <Checkout />} /> */}
        </Switch>
    )
}

export default Routes
