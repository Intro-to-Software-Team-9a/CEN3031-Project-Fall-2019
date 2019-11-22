import React from 'react';
import { Form, Nav, NavDropdown, Container, Row, Col, ButtonGroup, Button } from 'react-bootstrap';
import { connect } from 'react-redux';

import { changeQuestionType, addResponse, removeResponse } from '../actions/editQuestionnaire';

const QuestionTypes = [
  { key: 'MULTIPLE_CHOICE', label: 'Multiple Choice' },
  { key: 'SHORT_ANSWER', label: 'Short Answer' },
];

function getQuestionTypeLabel(typeKey) {
  const match = QuestionTypes.find(type => type.key === typeKey);
  return match ? match.label : 'Unknown';
}
/**
 * 
 */
function EditableQuestion({ question, addResponse, removeResponse, changeQuestionType }) {
  let answers = <div></div>;


  if (question.questionType === 'SHORT_ANSWER') {
    answers = (
      <Form.Group>
        {question.possibleResponses.map((response) => (
          <Form.Control
            key={response._id}
            name={response._id}
            type="text"
            value={response.value}
          />
        ))}
      </Form.Group>
    );
  } else if (question.questionType === 'MULTIPLE_CHOICE') {
    answers = (
      <Form.Group>
        {question.possibleResponses.map((response, index) => (
          <Container key={response._id} className="py-1">
            <Row>
              <Col md={2}>
                <ButtonGroup>
                  <Button onClick={() => addResponse(index)} variant="outline-dark">+</Button>
                  <Button onClick={() => removeResponse(index)} variant="outline-dark">-</Button>
                </ButtonGroup>
              </Col>
              <Col>
                <Form.Control
                  name={response._id}
                  type="text"
                  value={response.value}
                />
              </Col>
              <Col>
                <Form.Control
                  name={response._id}
                  type="text"
                  value={response.label}
                />
              </Col>
            </Row>
          </Container>
        ))}
      </Form.Group>
    );
  }
  return (
    <React.Fragment>
      <Form.Group>
        <Form.Control
          name={`${question._id}-title`}
          type="text"
          value={question.title}
        />
      </Form.Group>
      <Nav activeKey={question.questionType} variant="light" onSelect={(key) => changeQuestionType(key)}>
        <Nav.Item>
          <Nav.Link disabled>Type</Nav.Link>
        </Nav.Item>

        <NavDropdown title={getQuestionTypeLabel(question.questionType)}>
          {QuestionTypes.map(({ key, label }) => (
            <NavDropdown.Item key={key} eventKey={key}>{label}</NavDropdown.Item>
          ))}
        </NavDropdown>
      </Nav>
      {answers}
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  changeQuestionType: (newType) => dispatch(changeQuestionType(ownProps.index, newType)),
  addResponse: (responseIndex) => dispatch(addResponse(ownProps.index, responseIndex)),
  removeResponse: (responseIndex) => dispatch(removeResponse(ownProps.index, responseIndex)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditableQuestion);
