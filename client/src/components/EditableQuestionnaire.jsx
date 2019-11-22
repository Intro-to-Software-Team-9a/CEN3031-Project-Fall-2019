import React from 'react';
import { connect } from 'react-redux';
import { Form, Button, Col, ButtonToolbar, ButtonGroup, Container, Row } from 'react-bootstrap';
import EditableQuestion from './EditableQuestion';

import { addNewQuestion, saveQuestionnaire, resetQuestions, swapQuestionDown } from '../actions/editQuestionnaire';

import SwapVertical from '@material-ui/icons/SwapVert';
import AddCircle from '@material-ui/icons/Add';
import Delete from '@material-ui/icons/Delete';

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
    const { questions, addNewQuestion, saveQuestionnaire, swapQuestionDown, isWaiting, goBack } = this.props;
    if (!questions) return <div></div>;

    return (
      <React.Fragment>
        <Form>
          <Container fluid>
            <ButtonGroup className="my-2">
              <Button variant="outline-dark" onClick={() => addNewQuestion(0)}>
                <AddCircle /> Question
              </Button>
            </ButtonGroup>
            {questions.map((question, index, questions) => (
              <React.Fragment>
                <Row className="my-2 pt-3 border border-muted" style={{ maxWidth: '700px' }}>
                  <EditableQuestion index={index} key={question._id} question={question} />
                </Row>
                <ButtonGroup className="my-2" style={{ maxWidth: '700px' }}>
                  <Button variant="outline-dark" onClick={() => addNewQuestion(index + 1)}>
                    <AddCircle /> Question
                  </Button>
                  {(index !== questions.length - 1) ?
                    <Button variant="outline-dark" onClick={() => swapQuestionDown(index)}>
                      <SwapVertical /> Swap
                    </Button>
                    : ''
                  }
                </ButtonGroup>
              </React.Fragment>
            ))}
            <Row style={{ maxWidth: '700px' }}>
              <Col>
                <ButtonToolbar className="float-right">
                  <Button
                    onClick={goBack}
                    variant="outline-dark">
                    Cancel
                  </Button>
                  <Button
                    onClick={saveQuestionnaire}
                    variant="dark"
                    disabled={isWaiting}>
                    Save
                  </Button>
                </ButtonToolbar>
              </Col>
            </Row>
          </Container>
        </Form>
      </React.Fragment >
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.editQuestionnaire.questions,
  isWaiting: state.editQuestionnaire.loadingState.isWaiting,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  addNewQuestion: (afterIndex) => dispatch(addNewQuestion(afterIndex)),
  saveQuestionnaire: () => dispatch(saveQuestionnaire(ownProps.onSuccess)),
  resetQuestions: () => dispatch(resetQuestions()),
  swapQuestionDown: (index) => dispatch(swapQuestionDown(index)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Questionnaire);
