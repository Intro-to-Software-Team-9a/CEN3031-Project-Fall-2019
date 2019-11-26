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

class UserResponses extends React.Component {
  componentDidMount() {
    this.props.getResponses();
  }

  render() {

    const makeResponse = (response) => (
      <LinkContainer to={`/view-response/${response._id}`}>
        <ListGroup.Item key={response._id} action>
          {moment(response.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
        </ListGroup.Item>
      </LinkContainer>
    );
    return (
      <Container className="pt-4" fluid>
        <Row className="pt-4">
          <Col md={1}>
            <h1
              onClick={() => this.props.history.goBack()}
              className="cursor-pointer hover-white float-right"
            >&larr;</h1>
          </Col>
          <Col>
            <h1>Your Responses</h1>
          </Col>
        </Row>
        <Row className="pt-4">
          <Col md={1}></Col>
          <Col>
            <h5>Actions</h5>
            <ButtonToolbar>
              <LinkContainer to="/edit-questionnaire-response">
                <Button variant="outline-dark">
                  <Edit /> Update Response
                </Button>
              </LinkContainer>
            </ButtonToolbar>
          </Col>
        </Row>
        <Row>
          <Col md={1}></Col>
          <Col className="pt-4" md={4}>
            <h5>Response History</h5>
            <ListGroup>
              {this.props.responses.map((response) => (
                makeResponse(response)
              ))}
            </ListGroup>
          </Col>
        </Row>
      </Container>
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
