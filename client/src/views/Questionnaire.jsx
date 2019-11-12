import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import QuestionList from '../components/QuestionList';
import Questionnaire from '../components/Questionnaire';

export default function QuestionnaireView() {
  return (
    <Container className="pt-4">
      <h1>Questionnaire</h1>
      <Row>
        <Col className="col-4 pt-4">
          <QuestionList />
        </Col>
        <Col className="col-8 pt-4">
          <Questionnaire />
        </Col>
      </Row>
    </Container>
  );
}
