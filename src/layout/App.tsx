import React from 'react';
import { Route, Switch } from 'react-router';
import { Redirect } from 'react-router-dom';
import Analysis from '../pages/Analysis';
import Board from '../pages/Board';

const App: React.FC = () => {
  return (
    <Switch>
      <Route exact path='/' render={() => <Redirect to='/currencies' />} />
      <Route exact path='/currencies' component={Board} />
      <Route exact path='/analysis' component={Analysis} />
    </Switch>
  );
};

export default App;
