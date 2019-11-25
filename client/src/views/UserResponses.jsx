import { connect } from 'react-redux';
import React from 'react';
import moment from 'moment';
import { Container, Row, Col } from 'react-bootstrap';

import { getResponses, getQuestionnaire } from '../actions/questionnaire';

const safelock = require('../assets/safeLock.png');

class EditQuestionnaireResponse extends React.Component {
  componentDidMount() {
    this.props.getResponses();
  }

  render() {
    function makeResponse(response) {
      return (
        <div key={response._id}>
          <h4>Response</h4>
          <p>{moment(response.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</p>
        </div>
      )
    }
    return (
      <Container className="pt-4" fluid>
        <Row>
          <Col md={1}>
            <h1 onClick={() => this.props.history.goBack()} className="cursor-pointer hover-white float-right">&larr;</h1>
          </Col>
          <Col>
            <h1>Your Responses&nbsp; <img src={safelock} alt="Checkmark" width="15" height="15"></img></h1>
          </Col>
        </Row>
        <Row>
          <Col md={1}></Col>
          <Col className="pt-4" md={3}>
            {this.props.responses.map((response) => (
              makeResponse(response)
            ))}
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  responses: state.questionnaire.questionnaireResponses || [],
});

const mapDispatchToProps = (dispatch) => ({
  getResponses: async () => {
    await dispatch(getQuestionnaire());
    await dispatch(getResponses());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditQuestionnaireResponse);
