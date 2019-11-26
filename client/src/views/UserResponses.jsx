import { connect } from 'react-redux';
import React from 'react';
import moment from 'moment';
import { Container, Row, Col, Button, ButtonToolbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { getResponses, getQuestionnaire } from '../actions/questionnaire';

const safelock = require('../assets/safeLock.png');

class UserResponses extends React.Component {
  componentDidMount() {
    this.props.getResponses();
  }

  render() {
    const makeResponse = (response) => {
      return (
        <Row key={response._id} className="my-2">
          <Col>
            <p className="mt-2 mb-2">
              {moment(response.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
            </p>
            <ButtonToolbar>
              <Link to={`/view-response/${response._id}`}>
                <Button variant="outline-dark">View</Button>
              </Link>
            </ButtonToolbar>
          </Col>
        </Row>
      )
    }
    return (
      <Container className="pt-4" fluid>
        <Row>
          <Col md={1}>
            <h1 onClick={() => this.props.history.goBack()} className="cursor-pointer hover-white float-right">&larr;</h1>
          </Col>
          <Col>
            <h1>Your Responses</h1>
          </Col>
        </Row>
        <Row>
          <Col md={1}></Col>
          <Col className="pt-4 pl-4" md={4}>
            <Container>
              {this.props.responses.map((response) => (
                makeResponse(response)
              ))}
            </Container>
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
)(UserResponses);
