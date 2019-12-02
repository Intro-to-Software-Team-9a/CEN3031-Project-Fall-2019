import React from 'react';
import {
  Form, Row, Col,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import {
  changeQuestionFieldLabel,
} from '../actions/editQuestionnaire';
import { getDuplicateLabels } from '../utils/validation';


/**
 * Represents a question in the EditableQuestionnaire.
 */
class EditableShortAnswer extends React.Component {
  render() {
    const {
      response,
      changeResponseLabel,
    } = this.props;

    const duplicateLabels = JSON.parse(this.props.duplicateLabels);

    if (!response) return '';

    return (
      <Row key={response._id}>
        <Col>
          <Form.Control
            name={response._id}
            type="text"
            value={response.value}
            disabled
          />
        </Col>
        <Col>
          <Form.Control
            name={response._id}
            type="text"
            value={response.label}
            onChange={(e) => changeResponseLabel(e.target.value)}
            isInvalid={duplicateLabels.includes(response.label)}
            isValid={!duplicateLabels.includes(response.label)}
          />
          <Form.Control.Feedback type="invalid">
            Labels can't used more than once.
                </Form.Control.Feedback>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const response = state.editQuestionnaire.responses.find((r) => r._id === ownProps.responseId);
  const duplicateLabels = JSON.stringify(getDuplicateLabels(state.editQuestionnaire.responses));
  return {
    duplicateLabels,
    response,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  changeResponseLabel: (newLabel) => dispatch(
    changeQuestionFieldLabel(ownProps.questionIndex, ownProps.responseIndex, newLabel),
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditableShortAnswer);
