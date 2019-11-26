import { connect } from 'react-redux';
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { getResponses } from '../actions/questionnaire';
import { loadQuestionnaire } from '../actions/viewResponse';
import ReadOnlyQuestionnaire from '../components/ReadOnlyQuestionnaire';

const safelock = require('../assets/safeLock.png');

class ViewResponse extends React.Component {
  async componentDidMount() {
    if (!this.props.response && !this.props.isWaiting) {
      await this.props.getResponses();
    }
    console.log(this.props.response);
    await this.props.getQuestionnaire(this.props.response.questionnaireId);
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
          <Col className="pt-4" md={5}>
            <ReadOnlyQuestionnaire response={this.props.response.questionnaireResponse} />
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { responseId } = ownProps.match.params;
  const response = state.questionnaire.questionnaireResponses.find(r => r._id === responseId) || {};
  return {
    response,
    questionnaire: state.viewResponse.questionnaire || {},
    isWaiting: state.questionnaire.questionnaireResponsesState.isWaiting,
  };
}


const mapDispatchToProps = (dispatch) => ({
  getResponses: () => dispatch(getResponses()),
  getQuestionnaire: (id) => dispatch(loadQuestionnaire(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ViewResponse);
