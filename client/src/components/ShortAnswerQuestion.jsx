import React from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';

import { changeForm } from '../actions/questionnaire';

/**
 * 
 * @param possibleResponses From Questionnaire.question object in DB
 * @param title From Questionnaire.question object in DB
 * @param onClick Callback for onclick
 */
function ShortAnswerQuestion({ question, onChange, currentResponse }) {
  console.log(currentResponse, question);
  const { possibleResponses, title } = question;
  return (

      <Form.Group>
      <Form.Label>{title}</Form.Label>
      {possibleResponses.map((response) => (
        <Form.Control
          key={response._id}
          type="text"
          label={response.label}
          name={response._id}
          value={currentResponse[response.label] || ''}
          onChange={event => onChange(response.label, event.target.value)}
        />
      ))}
      </Form.Group>
  )
}

const mapStateToProps = (state) => ({
  currentResponse: state.questionnaire.questionnaireResponse,
});

const mapDispatchToProps = (dispatch) => ({
  onChange: (fieldName, newValue) => dispatch(changeForm(fieldName, newValue)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ShortAnswerQuestion);
