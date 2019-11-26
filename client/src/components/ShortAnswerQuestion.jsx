import React from 'react';
import { Form } from 'react-bootstrap';
import { connect } from 'react-redux';

import { changeForm } from '../actions/questionnaire';

/**
 *
 * @param currentResponse current questionnaire response
 * @param question Question object in DB
 * @param onChange Callback for change event
 * @param isDisabled Whether editing is allowed
 */
function ShortAnswerQuestion({ question, onChange, currentResponse, isDisabled }) {
  const { possibleResponses, title } = question;
  return (

      <Form.Group>
      <Form.Label>{title}</Form.Label>
      {possibleResponses.map((response) => (
        <Form.Control
          disabled={isDisabled}
          key={response._id}
          type="text"
          label={response.label}
          name={response._id}
          value={currentResponse[response.label] || ''}
          onChange={(event) => onChange(response.label, event.target.value)}
        />
      ))}
      </Form.Group>
  );
}

const mapStateToProps = (state) => ({
  // currentResponse: state.questionnaire.questionnaireResponse,
});

const mapDispatchToProps = (dispatch) => ({
  onChange: (fieldName, newValue) => dispatch(changeForm(fieldName, newValue)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ShortAnswerQuestion);
