import React from 'react';
import {
  Form, Col, ButtonGroup, Button,
} from 'react-bootstrap';
import { connect } from 'react-redux';

import ArrowUpward from '@material-ui/icons/ArrowUpward';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Delete from '@material-ui/icons/Delete';
import AddCircle from '@material-ui/icons/Add';
import {
  addResponse,
  removeResponse,
  changeQuestionFieldLabel,
  changeQuestionFieldValue,
  swapResponseUp,
  swapResponseDown,
} from '../actions/editQuestionnaire';
import { getDuplicateLabels } from '../utils/validation';


/**
 * Represents a question in the EditableQuestionnaire.
 */
class EditableQuestion extends React.Component {
  render() {
    const {
      response,
      addResponse,
      removeResponse,
      changeResponseValue,
      changeResponseLabel,
      swapResponseUp,
      swapResponseDown,
      isFirst,
      isLast,
    } = this.props;

    const duplicateLabels = JSON.parse(this.props.duplicateLabels);

    if (!response) return '';

    return (
      <Form.Row key={response._id} className="py-1">
        <Col>
          <div className="d-flex">
            <ButtonGroup className="flex-shrink-1 mr-2">
              <Button
                disabled={isFirst}
                onClick={() => swapResponseUp()}
                variant="outline-dark">
                <ArrowUpward />
              </Button>
              <Button
                disabled={isLast}
                onClick={() => swapResponseDown()}
                variant="outline-dark">
                <ArrowDownward />
              </Button>
              <Button
                onClick={() => addResponse()}
                variant="outline-dark">
                <AddCircle />
              </Button>
              <Button
                onClick={() => removeResponse()}
                variant="outline-dark">
                <Delete />
              </Button>
            </ButtonGroup>
            <Form.Control
              name={response._id}
              type="text"
              value={response.value}
              label="Prompt"
              onChange={(e) => changeResponseValue(e.target.value)}
            />
          </div>
        </Col>
        <Col md={4}>
          <Form.Control
            name={response._id}
            type="text"
            value={response.label}
            label="Option Label"
            isInvalid={duplicateLabels.includes(response.label)}
            isValid={!duplicateLabels.includes(response.label)}
            onChange={(e) => changeResponseLabel(e.target.value)}
          />
        </Col>
      </Form.Row>
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
  addResponse: () => dispatch(
    addResponse(ownProps.questionIndex, ownProps.responseIndex),
  ),
  removeResponse: () => dispatch(
    removeResponse(ownProps.questionIndex, ownProps.responseIndex),
  ),
  changeResponseLabel: (newLabel) => dispatch(
    changeQuestionFieldLabel(ownProps.questionIndex, ownProps.responseIndex, newLabel),
  ),
  changeResponseValue: (newValue) => dispatch(
    changeQuestionFieldValue(ownProps.questionIndex, ownProps.responseIndex, newValue),
  ),
  swapResponseUp: () => dispatch(
    swapResponseUp(ownProps.questionIndex, ownProps.responseIndex),
  ),
  swapResponseDown: () => dispatch(
    swapResponseDown(ownProps.questionIndex, ownProps.responseIndex),
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditableQuestion);
