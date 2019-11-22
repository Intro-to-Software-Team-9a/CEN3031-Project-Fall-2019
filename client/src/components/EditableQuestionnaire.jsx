import React from 'react';
import { connect } from 'react-redux';
import { Form, Button, Col, ButtonToolbar } from 'react-bootstrap';
import EditableQuestion from './EditableQuestion';

import { addNewQuestion, saveQuestionnaire, resetQuestions } from '../actions/editQuestionnaire';

/**
 *
 * @param possibleResponses From Questionnaire.question object in DB
 * @param title From Questionnaire.question object in DB
 * @param onClick Callback for onclick
 */
class Questionnaire extends React.Component {
  componentDidMount() {
    this.props.resetQuestions();
  }

  render() {
    const { questions, addNewQuestion, saveQuestionnaire } = this.props;
    if (!questions) return <div></div>;

    return (
      <React.Fragment>
        <Form>
          <Button variant="outline-dark" onClick={() => addNewQuestion(0)}>+ Question</Button>
          {questions.map((question, index) => (
            <div className="my-2">
              <div className="p-3 my-2 border border-muted" style={{ maxWidth: '700px' }}>
                <EditableQuestion index={index} key={question._id} question={question} />
              </div>
              <ButtonToolbar>
                <Button variant="outline-dark" onClick={() => addNewQuestion(index + 1)}>+ Question</Button>
                {/* <Button variant="outline-dark" onClick={addNewQuestion}>+ Section</Button> */}
              </ButtonToolbar>
            </div>
          ))}
        </Form>
        <Button onClick={saveQuestionnaire} variant="outline-dark">Finish</Button>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.editQuestionnaire.questions,
});

const mapDispatchToProps = (dispatch) => ({
  addNewQuestion: (afterIndex) => dispatch(addNewQuestion(afterIndex)),
  saveQuestionnaire: () => dispatch(saveQuestionnaire()),
  resetQuestions: () => dispatch(resetQuestions()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Questionnaire);
