import { connect } from 'react-redux';
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import QuestionList from '../components/QuestionList';
import Questionnaire from '../components/Questionnaire';
import { getResponse, submitForm, getQuestionnaire } from '../actions/questionnaire';
import { Routes } from '../utils/constants';

const safelock = require('../assets/safeLock.png');

/**
 * Create a new questionnaire response for the user
 * starting from the old one.
 */
class EditQuestionnaireResponse extends React.Component {
  componentDidMount() {
    this.props.getResponse();
  }

  render() {
    const { onFinish } = this.props;
    return (
      <div className="min-vh-100 bg-light">
        <div className="spacing"></div>
        <Container className="pt-4" fluid>
        <Row className="pt-4">
            <Col sm={1}>
              <h1 onClick={() => this.props.history.push(Routes.VIEW_RESPONSES)} className="cursor-pointer hover-white float-right">&larr;</h1>
            </Col>
            <Col sm={11}>
              <h1>Edit Questionnaire Response&nbsp; <img src={safelock} alt="Checkmark" width="15" height="15"></img></h1>
              <p><i>Personal information is required for estate plans.</i></p>
            </Col>
          </Row>
          <Row className="pt-4">
            <Col className="d-none d-xl-block" xl={1}></Col>
            <Col className="pt-4" md={3}>
              <QuestionList />
            </Col>
            <Col className="pt-4" md={9} xl={5}>
              <Questionnaire
                onFinish={onFinish}
                prompt="Save" />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = () => ({
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  getResponse: async () => {
    await dispatch(getQuestionnaire());
    await dispatch(getResponse());
  },
  onFinish: async () => {
    await dispatch(submitForm());
    ownProps.history.push(Routes.VIEW_RESPONSES);
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditQuestionnaireResponse);
