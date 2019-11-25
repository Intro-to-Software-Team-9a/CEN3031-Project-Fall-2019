import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import QuestionList from '../components/QuestionList';
import Questionnaire from '../components/Questionnaire';

const safelock = require('../assets/safeLock.png');

const QUESTIONNAIRE_PAGE = 'questionnaire-page';
const INTERVIEW_PAGE = 'interview-page';

const Pages = [
  QUESTIONNAIRE_PAGE,
  INTERVIEW_PAGE,
];

export default class EditQuestionnaireResponse extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 0,
      pageName: QUESTIONNAIRE_PAGE,
    };

    this.changePage = this.changePage.bind(this);
    this.incrementPage = () => this.changePage(this.state.page + 1);
    this.decrementPage = () => this.changePage(this.state.page - 1);
  }

  changePage(newPage) {
    if (newPage < 0) {
      this.props.history.goBack();
    }
    if (newPage >= Pages.length || newPage < 0) {
      return;
    }

    this.setState({
      page: newPage,
      pageName: Pages[newPage],
    });
  }

  render() {
    const { onFinish, onBack } = this.props;
    const { pageName } = this.state;

    let section = '';
    if (pageName === QUESTIONNAIRE_PAGE) {
      section = (
        <Questionnaire
          sectionFilter={(section) => section.isShownBeforeLogin}
          onFinish={this.incrementPage} />
      );
    } else if (pageName === INTERVIEW_PAGE) {
      section = (
        <Questionnaire
          sectionFilter={(section) => !section.isShownBeforeLogin}
          onFinish={onFinish} />
      );
    }
    return (
      <Container className="pt-4" fluid>
        <Row>
          <Col md={1}>
            <h1 onClick={() => this.props.history.goBack()} className="cursor-pointer hover-white float-right">&larr;</h1>
          </Col>
          <Col>
            <h1>Edit Questionnaire Response&nbsp; <img src={safelock} alt="Checkmark" width="15" height="15"></img></h1>
            <p><i>Personal information is required for estate plans.</i></p>
          </Col>
        </Row>
        <Row>
          <Col md={1}></Col>
          <Col className="pt-4" md={3}>
            <QuestionList />
          </Col>
          <Col className="pt-4" md={5}>
            {section}
          </Col>
        </Row>
      </Container>
    );
  }
}
