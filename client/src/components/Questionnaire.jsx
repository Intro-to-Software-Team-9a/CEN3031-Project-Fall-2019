import React from 'react';
import { connect } from 'react-redux';
import MultipleChoiceQuestion from './MultipleChoiceQuestion';
import ShortAnswerQuestion from './ShortAnswerQuestion';
import { Form, Button } from 'react-bootstrap';

import { submitForm } from '../actions/questionnaire';

/**
 * 
 * @param possibleResponses From Questionnaire.question object in DB
 * @param title From Questionnaire.question object in DB
 * @param onClick Callback for onclick
 */
function Questionnaire({ questionnaire, submitForm }) {
  if (!questionnaire) return <div></div>;

  return (
    <React.Fragment>
      <Form>
        {questionnaire.questions.map((question) => {
          switch (question.questionType) {
            case 'MULTIPLE_CHOICE':
              return <MultipleChoiceQuestion key={question._id} question={question} />
            case 'SHORT_ANSWER':
              return <ShortAnswerQuestion key={question._id} question={question} />
          }
        })}
      </Form>
      <Button variant="outline-dark" onClick={submitForm}>Submit</Button>
    </React.Fragment>
  )
}

const mapStateToProps = (state) => ({
  questionnaire: state.questionnaire.questionnaire,
});

const mapDispatchToProps = (dispatch) => ({
  submitForm: () => dispatch(submitForm()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Questionnaire);
