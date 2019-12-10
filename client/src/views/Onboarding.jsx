import React from 'react';
import {
  Container,
} from 'react-bootstrap';
import { connect } from 'react-redux';

import Catalog from './Catalog';
import CreateAccount from './CreateAccount';
import UnauthenticatedQuestionnaire from './UnauthenticatedQuestionnaire';
import AuthenticatedQuestionnaire from './AuthenticatedQuestionnaire';
import ReviewPurchase from './ReviewPurchase';
import TextView from './TextView';
import SelectPlan from './SelectPlan';
import { submitForm } from '../actions/questionnaire';
import { Routes } from '../utils/constants';

const QUESTIONNAIRE_PAGE = 'questionnaire-page';
const CREATE_ACCOUNT_PAGE = 'create-account-page';
const AUTHENTICATED_QUESTIONNAIRE_PAGE = 'authenticated-questionnaire-page';
const SELECT_PLAN_PAGE = 'select-plan-page';
const CART_PAGE = 'cart-page';
const REVIEW_PAGE = 'review-page';
const QUESTIONNAIRE_PRETEXT = 'pre-questionnaire';
const CREATE_PRETEXT = 'create-pretext';
const AUTH_PRETEXT = 'auth-pretext';
const PURCHASE_PRETEXT = 'purchase-pretext';

const Pages = [
  QUESTIONNAIRE_PRETEXT,
  QUESTIONNAIRE_PAGE,
  CREATE_PRETEXT,
  CREATE_ACCOUNT_PAGE,
  AUTH_PRETEXT,
  AUTHENTICATED_QUESTIONNAIRE_PAGE,
  PURCHASE_PRETEXT,
  SELECT_PLAN_PAGE,
  CART_PAGE,
  REVIEW_PAGE,
];

/** This component holds the views in `Pages` and cycles through them in order */
class Onboarding extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 0,
      pageName: Pages[0],
    };
    this.changePage = this.changePage.bind(this);
    this.incrementPage = () => this.changePage(this.state.page + 1);
    this.decrementPage = () => this.changePage(this.state.page - 1);
  }

  changePage(newPage) {
    // go back to the home page
    if (newPage < 0) {
      this.props.history.goBack();
    }

    // catch edge case
    if (newPage >= Pages.length || newPage < 0) {
      return;
    }

    this.setState({
      page: newPage,
      pageName: Pages[newPage],
    });
  }

  render() {
    let currentpage = <div>Unknown page</div>;

    switch (this.state.pageName) {
      case QUESTIONNAIRE_PRETEXT:
        currentpage = <TextView
          title="Questionnaire"
          onBack={this.decrementPage}
          onFinish={this.incrementPage}>
          <p>
            A comprehensive estate plan can seem complicated, but with our online worksheet, you'll be one step closer to getting yourself and
            your family on the path to a securing your assets for generations to come.
            </p>
          <p>First you'll need to answer these questions
            to determine your eligibility for an estate plan.</p>
        </TextView>;
        break;
      case AUTH_PRETEXT:
        currentpage = <TextView
          title="Interview Questions"
          onBack={this.decrementPage}
          onFinish={this.incrementPage}>
          <p>Now we'll need you to answer these questions about your estate plan.</p>
        </TextView>;
        break;
      case CREATE_PRETEXT:
        currentpage = <TextView
          title="Create Account"
          onBack={this.decrementPage}
          onFinish={this.incrementPage}>
          <p>Next we'll need you to create an account so we can save your data.</p>
        </TextView>;
        break;
      case PURCHASE_PRETEXT:
        currentpage = <TextView
          title="Finish your Estate Plan"
          onBack={this.decrementPage}
          onFinish={this.incrementPage}>
          <p>Now, select the documents you want to add
            to your estate plan, and then check out.</p>
        </TextView>;
        break;
      case QUESTIONNAIRE_PAGE:
        currentpage = <UnauthenticatedQuestionnaire
          onBack={this.decrementPage}
          onFinish={this.incrementPage} />;
        break;
      case CREATE_ACCOUNT_PAGE:
        currentpage = <CreateAccount onBack={this.decrementPage} onFinish={this.incrementPage} />;
        break;
      case AUTHENTICATED_QUESTIONNAIRE_PAGE:
        currentpage = <AuthenticatedQuestionnaire
          onBack={this.decrementPage}
          onFinish={() => {
            this.props.submitForm();
            this.incrementPage();
          }} />;
        break;
      case SELECT_PLAN_PAGE:
        currentpage = (
          <SelectPlan
            onBack={this.decrementPage}
            onFinish={this.incrementPage}
          />
        );
        break;
      case CART_PAGE:
        currentpage = <Catalog onBack={this.decrementPage} onFinish={this.incrementPage} />;
        break;
      case REVIEW_PAGE:
        currentpage = <ReviewPurchase onBack={this.decrementPage} onFinish={() => {
          this.props.history.push(Routes.PROFILE_HOME);
        }} />;
        break;
      default:
        break;
    }
    return (
      <Container className="p-0" fluid>
        {currentpage}
      </Container>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  submitForm: () => dispatch(submitForm()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Onboarding);
