import React from 'react';
import {
  Form, Nav, NavDropdown, Container, Row, Col, ButtonGroup, Button,
} from 'react-bootstrap';
import { connect } from 'react-redux';

import Delete from '@material-ui/icons/Delete';

import {
  changeQuestionType,
  changeQuestionTitle,
  deleteQuestion,
} from '../actions/editQuestionnaire';
import EditableMultipleChoice from './EditableMultipleChoice';
import EditableShortAnswer from './EditableShortAnswer';

const QuestionTypes = [
  { key: 'MULTIPLE_CHOICE', label: 'Multiple Choice' },
  { key: 'SHORT_ANSWER', label: 'Short Answer' },
];

function getQuestionTypeLabel(typeKey) {
  const match = QuestionTypes.find((type) => type.key === typeKey);
  return match ? match.label : 'Unknown';
}
/**
 * Represents a question in the EditableQuestionnaire.
 */
class EditableQuestion extends React.Component {
  render() {
    const {
      question,
      deleteQuestion,
      changeQuestionType,
      changeQuestionTitle,
    } = this.props;

    // const duplicateLabels = JSON.parse(this.props.duplicateLabels);

    if (!question) return '';

    let answers = <div></div>;
    if (question.questionType === 'SHORT_ANSWER') {
      answers = (
        <Form.Group>
          <Container>
            {question.possibleResponses.map((responseId, index) => (
              <EditableShortAnswer
                questionIndex={this.props.index}
                responseId={responseId}
                responseIndex={index} />
            ))}
          </Container>
        </Form.Group>
      );
    } else if (question.questionType === 'MULTIPLE_CHOICE') {
      answers = (
        <Form.Group>
          <Container>
            {question.possibleResponses.map((responseId, index, arr) => (
              <EditableMultipleChoice
                questionIndex={this.props.index}
                responseId={responseId}
                responseIndex={index}
                isLast={index === arr.length - 1}
                isFirst={index === 0}
              />
            ))}
          </Container>
        </Form.Group>
      );
    }

    const isTitleValid = question.title || question.title.length > 0;
    return (
      <React.Fragment>
        <Container>
          <Row>
            <Col>
              <h5 className="pl-1">Question</h5>
              {/* TITLE */}
              <Form.Group>
                <Form.Control
                  name={`${question._id}-title`}
                  type="text"
                  value={question.title}
                  onChange={(e) => changeQuestionTitle(e.target.value)}
                  isInvalid={!isTitleValid}
                  isValid={isTitleValid}
                />
                <Form.Control.Feedback type="invalid">
                  Titles can't be blank.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={2}>
              <ButtonGroup className="float-right">
                <Button
                  onClick={deleteQuestion}
                  variant="outline-dark">
                  <Delete />
                </Button>
              </ButtonGroup>
            </Col>
          </Row>
          {/* TYPE SWITCH */}
          <Nav activeKey={question.questionType}
            variant="light"
            onSelect={(key) => changeQuestionType(key)}
          >
            <Nav.Item>
              <Nav.Link disabled>Type</Nav.Link>
            </Nav.Item>

            <NavDropdown title={getQuestionTypeLabel(question.questionType)}>
              {QuestionTypes.map(({ key, label }) => (
                <NavDropdown.Item key={key} eventKey={key}>{label}</NavDropdown.Item>
              ))}
            </NavDropdown>
          </Nav>
        </Container>
        {answers}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const question = state.editQuestionnaire.questions.find((q) => q._id === ownProps.questionId);
  return { question };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  changeQuestionType: (newType) => dispatch(changeQuestionType(ownProps.index, newType)),
  changeQuestionTitle: (newTitle) => dispatch(changeQuestionTitle(ownProps.index, newTitle)),
  deleteQuestion: () => dispatch(deleteQuestion(ownProps.index)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditableQuestion);
