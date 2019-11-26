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
function MultipleChoiceQuestion({
  question, onChange, currentResponse, isDisabled,
}) {
  const { possibleResponses, title } = question;

  function updateValue(label) {
    possibleResponses.filter((r) => r.label !== label)
      .forEach((response) => onChange(response.label, false));

    onChange(label, true);
  }

  return (
    <Form.Group>
      <Form.Label>{title}</Form.Label>
      {possibleResponses.map((response) => (
          <Form.Check
            disabled={isDisabled}
            key={response._id}
            type="radio"
            label={response.value}
            name={response.label}
            checked={!!currentResponse[response.label]}
            onChange={() => updateValue(response.label)}
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
)(MultipleChoiceQuestion);
