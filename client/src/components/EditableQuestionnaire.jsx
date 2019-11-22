import React from 'react';
import { connect } from 'react-redux';
import { Form, Button, Col, ButtonToolbar, ButtonGroup } from 'react-bootstrap';
import EditableQuestion from './EditableQuestion';

import { addNewQuestion, saveQuestionnaire, resetQuestions, swapQuestionDown } from '../actions/editQuestionnaire';

import SwapVertical from '@material-ui/icons/SwapVert';
import AddCircle from '@material-ui/icons/Add';

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
    const { questions, addNewQuestion, saveQuestionnaire, swapQuestionDown } = this.props;
    if (!questions) return <div></div>;

    return (
      <React.Fragment>
        <Form>
          <ButtonGroup>
            <Button variant="outline-dark" onClick={() => addNewQuestion(0)}>
              <AddCircle />
            </Button>
            {/* <Button variant="outline-dark" onClick={() => swapQuestionDown(index)}>
                  <SwapVertical />
                </Button> */}
            {/* <Button variant="outline-dark" onClick={addNewQuestion}>+ Section</Button> */}
          </ButtonGroup>
          {questions.map((question, index, questions) => (
            <div className="my-2">
              <div className="p-3 my-2 border border-muted" style={{ maxWidth: '700px' }}>
                <EditableQuestion index={index} key={question._id} question={question} />
              </div>
              <ButtonGroup>
                <Button variant="outline-dark" onClick={() => addNewQuestion(index + 1)}>
                  <AddCircle />
                </Button>
                {(index !== questions.length - 1) ?
                  <Button variant="outline-dark" onClick={() => swapQuestionDown(index)}>
                    <SwapVertical />
                  </Button>
                  : ''
                }
                {/* <Button variant="outline-dark" onClick={addNewQuestion}>+ Section</Button> */}
              </ButtonGroup>
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
  swapQuestionDown: (index) => dispatch(swapQuestionDown(index)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Questionnaire);
