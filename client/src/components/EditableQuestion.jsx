import React from 'react';
import {
  Form, Nav, NavDropdown, Container, Row, Col, ButtonGroup, Button,
} from 'react-bootstrap';
import { connect } from 'react-redux';

import ArrowUpward from '@material-ui/icons/ArrowUpward';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Delete from '@material-ui/icons/Delete';
import AddCircle from '@material-ui/icons/Add';
import {
  changeQuestionType,
  changeQuestionTitle,
  addResponse,
  deleteQuestion,
  removeResponse,
  changeQuestionFieldLabel,
  changeQuestionFieldValue,
  swapResponseUp,
  swapResponseDown,
} from '../actions/editQuestionnaire';
import { getDuplicateLabels } from '../utils/validation';

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
      addResponse,
      removeResponse,
      deleteQuestion,
      changeQuestionType,
      changeResponseValue,
      changeResponseLabel,
      swapResponseUp,
      swapResponseDown,
      changeQuestionTitle,
    } = this.props;

    const duplicateLabels = JSON.parse(this.props.duplicateLabels);

    if (!question) return '';

    let answers = <div></div>;
    if (question.questionType === 'SHORT_ANSWER') {
      answers = (
        <Form.Group>
          <Container>
            {question.possibleResponses.map((response, index) => (
              <Row key={response._id}>
                <Col>
                  <Form.Control
                    name={response._id}
                    type="text"
                    value={response.value}
                    disabled
                  />
                </Col>
                <Col>
                  <Form.Control
                    name={response._id}
                    type="text"
                    value={response.label}
                    onChange={(e) => changeResponseLabel(index, e.target.value)}
                    isInvalid={duplicateLabels.includes(response.label)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Labels can't used more than once.
                </Form.Control.Feedback>
                </Col>
              </Row>
            ))}
          </Container>
        </Form.Group>
      );
    } else if (question.questionType === 'MULTIPLE_CHOICE') {
      answers = (
        <Form.Group>
          <Container>
            {question.possibleResponses.map((response, index, responses) => (
              <Form.Row key={response._id} className="py-1">
                <Col>
                  <div className="d-flex">
                    <ButtonGroup className="flex-shrink-1 mr-2">
                      <Button
                        disabled={index === 0}
                        onClick={() => swapResponseUp(index)}
                        variant="outline-dark">
                        <ArrowUpward />
                      </Button>
                      <Button
                        disabled={index === responses.length - 1}
                        onClick={() => swapResponseDown(index)}
                        variant="outline-dark">
                        <ArrowDownward />
                      </Button>
                      <Button
                        onClick={() => addResponse(index)}
                        variant="outline-dark">
                        <AddCircle />
                      </Button>
                      <Button
                        onClick={() => removeResponse(index)}
                        variant="outline-dark">
                        <Delete />
                      </Button>
                    </ButtonGroup>
                    <Form.Control
                      name={response._id}
                      type="text"
                      value={response.value}
                      label="Prompt"
                      onChange={(e) => changeResponseValue(index, e.target.value)}
                    />
                  </div>
                </Col>
                <Col md={4}>
                  <Form.Control
                    name={response._id}
                    type="text"
                    value={response.label}
                    label="Option Label"
                    isInvalid={duplicateLabels.includes(response.label)}
                    onChange={(e) => changeResponseLabel(index, e.target.value)}
                  />
                </Col>
              </Form.Row>
            ))}
          </Container>
        </Form.Group>
      );
    }
    return (
      <React.Fragment>
        <Container>
          <Row>
            <Col>
              <h5 className="pl-1">Question</h5>
              <Form.Group>
                <Form.Control
                  name={`${question._id}-title`}
                  type="text"
                  value={question.title}
                  onChange={(e) => changeQuestionTitle(e.target.value)}
                  isInvalid={!question.title || question.title.length === 0}
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
  // encode to avoid state rerender
  const duplicateLabels = JSON.stringify(getDuplicateLabels(state.editQuestionnaire.questions));
  const question = state.editQuestionnaire.questions.find((q) => q._id === ownProps.questionId);
  return { question, duplicateLabels };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  changeQuestionType: (newType) => dispatch(changeQuestionType(ownProps.index, newType)),
  changeQuestionTitle: (newTitle) => dispatch(changeQuestionTitle(ownProps.index, newTitle)),
  addResponse: (responseIndex) => dispatch(addResponse(ownProps.index, responseIndex)),
  removeResponse: (responseIndex) => dispatch(removeResponse(ownProps.index, responseIndex)),
  changeResponseLabel: (responseIndex, newLabel) => dispatch(
    changeQuestionFieldLabel(ownProps.index, responseIndex, newLabel),
  ),
  changeResponseValue: (responseIndex, newValue) => dispatch(
    changeQuestionFieldValue(ownProps.index, responseIndex, newValue),
  ),
  swapResponseUp: (responseIndex) => dispatch(swapResponseUp(ownProps.index, responseIndex)),
  swapResponseDown: (responseIndex) => dispatch(swapResponseDown(ownProps.index, responseIndex)),
  deleteQuestion: () => dispatch(deleteQuestion(ownProps.index)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditableQuestion);
