import React from 'react';
import { Switch, Route } from 'react-router-dom';


import Dashboard from '../pages/Dashboard';
import Control from '../pages/Control';
import Login from 'pages/Login';
import Register from 'pages/Register'

export default function Routes() {
  return (
    <Switch>

      <Route exact path="/" component={Dashboard} />
      <Route exact path="/controle" component={Control} />
      <Route exact path="/Login" component={Login} />
      <Route exact path="/register" component={Register} />
    </Switch>
  );
}
