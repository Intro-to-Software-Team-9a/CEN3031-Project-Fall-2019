import React from 'react';
import { Form } from 'react-bootstrap';
import { connect } from 'react-redux';

import { changeForm } from '../actions/questionnaire';

/**
 * Short answer or long answer question.
 * @param currentResponse current questionnaire response
 * @param question Question object in DB
 * @param onChange Callback for change event
 * @param isDisabled Whether editing is allowed
 */
function ShortAnswerQuestion({
  question, onChange, currentResponse, isDisabled,
}) {
  const { possibleResponses, title, questionType } = question;

  const isTextArea = (questionType === 'LONG_ANSWER');
  return (

      <Form.Group>
      <Form.Label>{title}</Form.Label>
      {possibleResponses.map((response) => (
        <Form.Control
          disabled={isDisabled}
          key={response._id}
          type="text"
          as={isTextArea ? 'textarea' : 'input'}
          label={response.label}
          name={response._id}
          value={currentResponse[response.label] || ''}
          onChange={(event) => onChange(response.label, event.target.value)}
        />
      ))}
      </Form.Group>
  );
}

const mapStateToProps = () => ({
});

const mapDispatchToProps = (dispatch) => ({
  onChange: (fieldName, newValue) => dispatch(changeForm(fieldName, newValue)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ShortAnswerQuestion);
