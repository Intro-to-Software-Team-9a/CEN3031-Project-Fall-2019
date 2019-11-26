import { connect } from 'react-redux';
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import QuestionList from '../components/QuestionList';
import Questionnaire from '../components/Questionnaire';
import { getResponse, submitForm, getQuestionnaire } from '../actions/questionnaire';

const safelock = require('../assets/safeLock.png');

class EditQuestionnaireResponse extends React.Component {
  componentDidMount() {
    this.props.getResponse();
  }

  render() {
    const { onFinish } = this.props;
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
            <Questionnaire
              onFinish={onFinish}
              prompt="Save" />
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = () => ({
});

const mapDispatchToProps = (dispatch) => ({
  getResponse: async () => {
    await dispatch(getQuestionnaire());
    await dispatch(getResponse());
  },
  onFinish: async () => {
    await dispatch(submitForm());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditQuestionnaireResponse);
