import { connect } from 'react-redux';
import React from 'react';
import moment from 'moment';
import {
  Container, Row, Col, Button, ButtonToolbar, ListGroup,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Edit from '@material-ui/icons/Edit';

import { getQuestionnaire } from '../actions/questionnaire';
import { getResponses } from '../actions/viewResponse';
import { Routes } from '../utils/constants';

/** Displays a list of all of the user's questionnaireresponses */
class UserResponses extends React.Component {
  componentDidMount() {
    this.props.getResponses();
  }

  render() {
    const makeResponse = (response) => (
      <LinkContainer to={Routes.VIEW_RESPONSE(response._id)}>
        <ListGroup.Item key={response._id} action>
          {moment(response.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
        </ListGroup.Item>
      </LinkContainer>
    );
    return (
      <div className="min-vh-100 bg-light">
        <div className="spacing"></div>
        <Container className="pt-4">
          <Row className="pt-4">
            <Col sm={1}>
              <h1
                onClick={() => this.props.history.push(Routes.PROFILE_HOME)}
                className="cursor-pointer hover-white float-right"
              >&larr;</h1>
            </Col>
            <Col sm={11}>
              <h1>Your Responses</h1>
            </Col>
          </Row>
          <Row className="pt-4">
            <Col className="d-none d-xl-block" xl={1}></Col>
            <Col xl={6}>
              <div className="display-card bg-white shadow">
                <h5>Actions</h5>
                <ButtonToolbar>
                  <LinkContainer to={Routes.NEW_RESPONSE}>
                    <Button variant="outline-dark">
                      <Edit /> Update Response
                </Button>
                  </LinkContainer>
                </ButtonToolbar>
              </div>
            </Col>
          </Row>
          <Row className="pt-4">
            <Col className="d-none d-xl-block" xl={1}></Col>
            <Col xl={6}>
              <div className="display-card bg-white shadow">
                <h5>Response History</h5>
                <ListGroup>
                  {this.props.responses.map((response) => (
                    makeResponse(response)
                  ))}
                </ListGroup>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  responses: state.viewResponse.questionnaireResponses || [],
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
