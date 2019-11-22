import React from 'react';
import { connect } from 'react-redux';
import { Form, Button, Col, ButtonToolbar } from 'react-bootstrap';
import EditableQuestion from './EditableQuestion';

import { addNewQuestion } from '../actions/editQuestionnaire';

/**
 *
 * @param possibleResponses From Questionnaire.question object in DB
 * @param title From Questionnaire.question object in DB
 * @param onClick Callback for onclick
 */
function Questionnaire({ questions, addNewQuestion }) {
  if (!questions) return <div></div>;

  return (
    <React.Fragment>
      <Form>
        {questions.map((question, index) => (
          <div className="my-2">
            <ButtonToolbar>
              <Button variant="outline-dark" onClick={() => addNewQuestion(index)}>+ Question</Button>
              {/* <Button variant="outline-dark" onClick={addNewQuestion}>+ Section</Button> */}
            </ButtonToolbar>
            <div className="p-3 my-2 border border-muted" style={{ maxWidth: '700px' }}>
              <EditableQuestion index={index} key={question._id} question={question} />
            </div>
          </div>
        ))}
      </Form>
      <Button variant="outline-dark">Continue</Button>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  questions: state.editQuestionnaire.questions,
});

const mapDispatchToProps = (dispatch) => ({
  addNewQuestion: (afterIndex) => dispatch(addNewQuestion(afterIndex)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Questionnaire);
