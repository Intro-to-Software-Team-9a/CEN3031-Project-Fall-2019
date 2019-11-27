import React from 'react';
import {
  Container, Row, Col,
} from 'react-bootstrap';
import { connect } from 'react-redux';

import Catalog from './Catalog';
import CreateAccount from './CreateAccount';
import UnauthenticatedQuestionnaire from './UnauthenticatedQuestionnaire';
import AuthenticatedQuestionnaire from './AuthenticatedQuestionnaire';
import ReviewPurchase from './ReviewPurchase';
import SelectPlan from './SelectPlan';
import { submitForm } from '../actions/questionnaire';
import { Routes } from '../utils/constants';

const QUESTIONNAIRE_PAGE = 'questionnaire-page';
const CREATE_ACCOUNT_PAGE = 'create-account-page';
const AUTHENTICATED_QUESTIONNAIRE_PAGE = 'authenticated-questionnaire-page';
const SELECT_PLAN_PAGE = 'select-plan-page';
const CART_PAGE = 'cart-page';
const REVIEW_PAGE = 'review-page';

const Pages = [
  QUESTIONNAIRE_PAGE,
  CREATE_ACCOUNT_PAGE,
  AUTHENTICATED_QUESTIONNAIRE_PAGE,
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
        currentpage = <SelectPlan onFinish={this.incrementPage} />;
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
      <Container className="pt-4" fluid>
        <Row>
          <Col>
            {currentpage}
          </Col>
        </Row>
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
