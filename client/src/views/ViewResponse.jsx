import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import React from 'react';
import moment from 'moment';
import { Container, Row, Col } from 'react-bootstrap';
import { getResponses } from '../actions/questionnaire';

const safelock = require('../assets/safeLock.png');

class ViewResponse extends React.Component {
  componentDidMount() {
    if (!this.props.response && !this.props.isWaiting) {
      this.props.getResponses();
    }
  }

  render() {
    if (!this.props.response) return '';
    return (
      <Container className="pt-4" fluid>
        <Row>
          <Col md={1}>
            <h1 onClick={() => this.props.history.goBack()} className="cursor-pointer hover-white float-right">&larr;</h1>
          </Col>
          <Col>
            <h1>View Response&nbsp; <img src={safelock} alt="Checkmark" width="15" height="15"></img></h1>
          </Col>
        </Row>
        <Row>
          <Col md={1}></Col>
          <Col className="pt-4" md={3}>
            {this.props.response._id}
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { responseId } = ownProps.match.params;
  return {
    response: state.questionnaire.questionnaireResponses.find(r => r._id === responseId),
    isWaiting: state.questionnaire.questionnaireResponsesState.isWaiting,
  };
}


const mapDispatchToProps = (dispatch) => ({
  getResponses: () => dispatch(getResponses()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ViewResponse);
