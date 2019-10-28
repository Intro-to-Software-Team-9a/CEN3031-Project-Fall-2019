import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from "./views/Home";
import Test from './views/Test';
import NotFound from "./views/NotFound";


const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/Home" component={Home} />
        <Route exact path="/Test" component={Test} />
        <Route exact path="/">
          <Redirect to="/Home" />
        </Route>
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;