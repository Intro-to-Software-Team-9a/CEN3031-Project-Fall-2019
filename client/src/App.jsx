import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';



import 'bootstrap/dist/css/bootstrap.min.css';

import Home from "./views/Home";
import Login from './views/Login';
import CreateAccount from './views/CreateAccount';
import Catalog from './views/Catalog';
import CreateDocument from './views/CreateDocument';
import NotFound from "./views/NotFound";
import NavBar from './components/NavBar';
import { getProfile } from './actions/profile';
import ReviewPurchase from './views/ReviewPurchase';
import { getTemplates } from './actions/template';

import { addTemplate, doPurchase } from './actions/purchase';


class App extends React.Component {
  async componentDidMount() {
    this.props.getProfile();
    await this.props.getTemplates();
    console.log(this.props.templates);
  }
  render() {
    return (
      <div>
        <NavBar />
        <Switch>
          <Route exact path="/home" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/create-account" component={CreateAccount} />
          <Route exact path='/review-purchase' component = {ReviewPurchase} />
          <Route exact path="/catalog" component={Catalog} />
          <Route exact path="/create-template" component={CreateDocument} />
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
  templates: state.templates.templates,
});

const mapDispatchToProps = (dispatch) => ({
  getProfile: () => dispatch(getProfile()),
  getTemplates: () => dispatch(getTemplates()),
  doPurchase: () => dispatch(doPurchase()),
  addTemplate: (template) => dispatch(addTemplate(template)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
