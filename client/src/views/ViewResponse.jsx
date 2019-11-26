import { connect } from 'react-redux';
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { getResponses, loadQuestionnaire, getResponsesAndLoadQuestionnaire } from '../actions/viewResponse';
import ReadOnlyQuestionnaire from '../components/ReadOnlyQuestionnaire';
import moment from 'moment';

const safelock = require('../assets/safeLock.png');

class ViewResponse extends React.Component {
  async componentDidMount() {
    if (!this.props.response._id) {
      await this.props.getResponsesAndLoadQuestionnaire(this.props.responseId);
    } else {
      await this.props.loadQuestionnaire(this.props.response.questionnaireId);
    }
  }

  render() {
    if (!this.props.response) return '';

    const { response } = this.props;

    return (
      <Container className="pt-4" fluid>
        <Row className="pt-4">
          <Col md={1}>
            <h1
              onClick={() => this.props.history.goBack()}
              className="cursor-pointer hover-white float-right">&larr;</h1>
          </Col>
          <Col>
            <h1>View Response&nbsp; <img src={safelock} alt="Checkmark" width="15" height="15"></img></h1>
          </Col>
        </Row>
        <Row>
          <Col md={1}></Col>
          <Col className="pt-4" md={5}>
            <p>
              <i>Submitted {moment(response.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</i>
            </p>
            <ReadOnlyQuestionnaire response={response.questionnaireResponse} />
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { responseId } = ownProps.match.params;
  const allResponses = state.viewResponse.questionnaireResponses;
  const response = allResponses.find((r) => r._id === responseId) || {};
  return {
    response,
    responseId,
    questionnaire: state.viewResponse.questionnaire || {},
    isWaiting: state.viewResponse.questionnaireResponsesState.isWaiting,
  };
};


const mapDispatchToProps = (dispatch) => ({
  getResponses: async () => {
    await dispatch(getResponses());
  },
  getResponsesAndLoadQuestionnaire: (id) => dispatch(getResponsesAndLoadQuestionnaire(id)),
  loadQuestionnaire: (id) => dispatch(loadQuestionnaire(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ViewResponse);
