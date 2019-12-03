import { connect } from 'react-redux';
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import moment from 'moment';
import { getResponses, loadQuestionnaire, getResponsesAndLoadQuestionnaire } from '../actions/viewResponse';
import ReadOnlyQuestionnaire from '../components/ReadOnlyQuestionnaire';
import { Routes } from '../utils/constants';

const safelock = require('../assets/safeLock.png');

/** Displays a questionnaire response and the questionnaire it came from. */
class ViewResponse extends React.Component {
  async componentDidMount() {
    if (!this.props.response._id) {
      // response doesn't exist -- load it
      await this.props.getResponsesAndLoadQuestionnaire(this.props.responseId);
    } else {
      // otherwise just load the questionnaire associated with the response
      await this.props.loadQuestionnaire(this.props.response.questionnaireId);
    }
  }

  render() {
    if (!this.props.response) return '';

    const { response } = this.props;

    return (
      <div className="min-vh-100 bg-light">
        <div className="spacing"></div>
        <Container className="pt-4">
          <Row className="pt-4">
            <Col md={1}>
              <h1
                onClick={() => this.props.history.push(Routes.VIEW_RESPONSES)}
                className="cursor-pointer hover-white float-right">&larr;</h1>
            </Col>
            <Col>
              <h1>View Response&nbsp; <img src={safelock} alt="Checkmark" width="15" height="15"></img></h1>
            </Col>
          </Row>
          <Row>
            <Col className="d-none d-xl-block" xl={1}></Col>
            <Col className="pt-4">
              <p>
                <i>Submitted {moment(response.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</i>
              </p>
              <ReadOnlyQuestionnaire response={response.questionnaireResponse} />
            </Col>
          </Row>
        </Container>
      </div>
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
