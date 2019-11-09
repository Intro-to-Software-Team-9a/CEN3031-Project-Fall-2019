import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import Home from "./views/Home";
import Login from './views/Login';
import CreateAccount from './views/CreateAccount';
import NotFound from "./views/NotFound";
import NavBar from './components/NavBar';
import ViewDocuments from './views/ViewDocuments';

const App = () => {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route exact path="/home" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/create-account" component={CreateAccount} />
        <Route exact path="/view-documents" component={ViewDocuments} />
        
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
