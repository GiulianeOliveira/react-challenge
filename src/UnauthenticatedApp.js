import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { SignIn } from './routes/SignIn';

const UnauthenticatedApp = () => (
  <Switch>
    <Route path="/logout" component={SignIn} />
  </Switch>
);

export default UnauthenticatedApp;
