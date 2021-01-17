import React from 'react';
import { Route, Switch } from 'react-router';
import { Redirect } from 'react-router-dom';
import Board from 'src/pages/Board';

const App: React.FC = () => {
  return (
    <Switch>
      <Route exact path='/' render={() => <Redirect to='/currencies' />} />
      <Route exact path='/currencies' component={Board} />
    </Switch>
  );
};

export default App;
