import React from 'react';
import { connect } from 'react-redux';
import {
  Form, Button, Col, ButtonToolbar, ButtonGroup, Container, Row,
} from 'react-bootstrap';


import SwapVertical from '@material-ui/icons/SwapVert';
import AddCircle from '@material-ui/icons/Add';
import {
  addNewQuestion,
  addNewSection,
  saveQuestionnaire,
  resetQuestions,
  swapQuestionDown,
} from '../actions/editQuestionnaire';
import EditableQuestion from './EditableQuestion';
import EditableSection from './EditableSection';
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
    const {
      questions,
      sections,
      addNewQuestion,
      saveQuestionnaire,
      swapQuestionDown,
      isWaiting,
      goBack,
      addNewSection,
    } = this.props;
    if (!questions || !sections) return <div></div>;


    const orderedSections = sections.slice();
    orderedSections.sort((s1, s2) => s1.startIndex - s2.startIndex);

    const sectionRanges = orderedSections.map((section, index, sections) => {
      let endIndex = questions.length;
      if (index + 1 < sections.length) {
        endIndex = sections[index + 1].startIndex;
      }

      return { ...section, endIndex };
    });


    return (
      <React.Fragment>
        <Form>
          <Container fluid>
            <ButtonGroup className="my-2">
              <Button variant="outline-dark" onClick={() => addNewQuestion(0)}>
                <AddCircle /> Question
              </Button>
            </ButtonGroup>
            {/* {questions.map((question, index, questions) => ( */}
            {sectionRanges.map((section, sectionIndex) => {
              const { startIndex, endIndex } = section;
              const questionElements = [];
              for (let i = startIndex; i < endIndex; i += 1) {
                const index = i;
                const question = questions[i];

                questionElements.push(
                  <div key={`editableQuestion-${i}`}>
                    <Row className="my-2 pt-3 border border-dark" style={{ maxWidth: '700px' }}>
                      <EditableQuestion index={index} key={question._id} question={question} />
                    </Row>
                    <ButtonGroup className="my-2" style={{ maxWidth: '700px' }}>
                      <Button
                        variant="outline-dark"
                        onClick={() => addNewQuestion(index + 1)}>
                        <AddCircle /> Question
                      </Button>
                      <Button
                        variant="outline-dark"
                        onClick={() => addNewSection(index + 1)}>
                        <AddCircle /> Section
                      </Button>
                      {(index === questions.length - 1) ? ''
                        : <Button
                          variant="outline-dark"
                          onClick={() => swapQuestionDown(index)}>
                          <SwapVertical /> Swap
                        </Button>
                      }
                    </ButtonGroup>
                  </div>,
                );
              }
              return (
                <div key={section._id}>
                  <Row className="my-2 pt-3 border border-dark" style={{ maxWidth: '700px' }}>
                    <EditableSection section={section} index={sectionIndex} />
                  </Row>
                  {questionElements}
                </div>
              );
            })}
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
  sections: state.editQuestionnaire.sections,
  isWaiting: state.editQuestionnaire.loadingState.isWaiting,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  addNewQuestion: (afterIndex) => dispatch(addNewQuestion(afterIndex)),
  addNewSection: (afterQuestionIndex) => dispatch(addNewSection(afterQuestionIndex)),
  saveQuestionnaire: () => dispatch(saveQuestionnaire(ownProps.onSuccess)),
  resetQuestions: () => dispatch(resetQuestions()),
  swapQuestionDown: (index) => dispatch(swapQuestionDown(index)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Questionnaire);
