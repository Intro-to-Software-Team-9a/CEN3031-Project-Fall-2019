import React from 'react';
import {
  Container, Row, Col,
} from 'react-bootstrap';

import Catalog from './Catalog';
import CreateAccount from './CreateAccount';
import Questionnaire from './Questionnaire';
import ReviewPurchase from './ReviewPurchase';
import SelectPlan from './SelectPlan';


const QUESTIONNAIRE_PAGE = 'questionnaire-page';
const CREATE_ACCOUNT_PAGE = 'create-account-page';
const SELECT_PLAN_PAGE = 'select-plan-page';
const CART_PAGE = 'cart-page';
const REVIEW_PAGE = 'review-page';

const Pages = [
  QUESTIONNAIRE_PAGE,
  CREATE_ACCOUNT_PAGE,
  SELECT_PLAN_PAGE,
  CART_PAGE,
  REVIEW_PAGE,
];

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
        currentpage = <Questionnaire onBack={this.decrementPage} onFinish={this.incrementPage} />;
        break;
      case CREATE_ACCOUNT_PAGE:
        currentpage = <CreateAccount onBack={this.decrementPage} onFinish={this.incrementPage} />;
        break;
      case SELECT_PLAN_PAGE:
        currentpage = <SelectPlan onFinish={this.incrementPage} />;
        break;
      case CART_PAGE:
        currentpage = <Catalog onBack={this.decrementPage} onFinish={this.incrementPage} />;
        break;
      case REVIEW_PAGE:
        currentpage = <ReviewPurchase onBack={this.decrementPage} onFinish={() => {
          this.props.history.push('/profile-home');
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
export default Onboarding;
