import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.min.css';

import Home from "./views/Home";
import Login from './views/Login';
import CreateAccount from './views/CreateAccount';
import NotFound from "./views/NotFound";
import NavBar from './components/NavBar';
import ViewDocuments from './views/ViewDocuments';

import { getProfile } from './actions/profile';

class App extends React.Component {
  componentDidMount() {
    this.props.getProfile();
  }

  render() {
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
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({
  getProfile: () => dispatch(getProfile()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
