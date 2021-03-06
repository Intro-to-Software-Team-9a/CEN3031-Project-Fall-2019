import React from 'react';
import {
  Route, Switch, Redirect, withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';

import Home from './views/Home';
import Login from './views/Login';
import NotFound from './views/NotFound';
import ViewDocuments from './views/ViewDocuments';
import ProfileHome from './views/ProfileHome';
import UploadTemplate from './views/UploadTemplate';
import ManageTemplates from './views/admin/ManageTemplates';
import TermsConditions from './views/Terms_Conditions';

import NavBar from './components/NavBar';
import EditQuestionnaire from './views/EditQuestionnaire';
import UserResponses from './views/UserResponses';
import { Routes } from './utils/constants';
import { getTemplates } from './actions/template';
import { getQuestionnaire } from './actions/questionnaire';
import { getProfile } from './actions/profile';
import { addTemplate, doPurchase } from './actions/purchase';
import Onboarding from './views/Onboarding';
import UserSettings from './views/UserSettings';

import EditQuestionnaireResponse from './views/EditQuestionnaireResponse';
import ViewResponse from './views/ViewResponse';
import TestTemplates from './views/admin/TestTemplates';

class App extends React.Component {
  async componentDidMount() {
    await Promise.all([
      this.props.getProfile(),
      this.props.getQuestionnaire(),
      this.props.getTemplates(),
    ]);
  }

  render() {
    return (
      <React.Fragment>
        <NavBar className="fixed-top" onLogout={() => this.props.history.push(Routes.HOME)} />
        <Switch>
          <Route exact path={Routes.HOME} component={Home} />
          <Route exact path={Routes.LOGIN} component={Login} />
          <Route exact path={Routes.TERMS_CONDITIONS} component={TermsConditions} />
          <Route exact path={Routes.VIEW_DOCUMENTS} component={ViewDocuments} />
          <Route exact path={Routes.ONBOARDING} component={Onboarding} />
          <Route exact path={Routes.PROFILE_HOME} component={ProfileHome} />
          <Route exact path={Routes.EDIT_QUESTIONNAIRE} component={EditQuestionnaire} />
          <Route exact path={Routes.NEW_RESPONSE} component={EditQuestionnaireResponse} />
          <Route exact path={Routes.VIEW_RESPONSES} component={UserResponses} />
          <Route exact path={Routes.VIEW_RESPONSE(':responseId')} component={ViewResponse} />
          <Route exact path={Routes.USER_SETTINGS} component={UserSettings} />
          <Route exact path="/upload-template" component={UploadTemplate} />
          <Route exact path={Routes.MANAGE_TEMPLATES} component={ManageTemplates} />
          <Route exact path={Routes.TEST_TEMPLATES} component={TestTemplates} />
          <Route exact path="/">
            <Redirect to={Routes.HOME} />
          </Route>
          <Route component={NotFound} />
        </Switch>
        {/* </div> */}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  templates: state.templates.templates,
});

const mapDispatchToProps = (dispatch) => ({
  getProfile: () => dispatch(getProfile()),
  getQuestionnaire: () => dispatch(getQuestionnaire()),
  getTemplates: () => dispatch(getTemplates()),
  doPurchase: () => dispatch(doPurchase()),
  addTemplate: (template) => dispatch(addTemplate(template)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(App));
