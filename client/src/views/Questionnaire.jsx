import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import QuestionList from '../components/QuestionList';
import Questionnaire from '../components/Questionnaire';

export default function QuestionnaireView({ onFinish, onBack }) {
  return (
    <Container className="pt-4" fluid>
      <Row>
        <Col md={1}>
          <h1 onClick={onBack} className="float-right">&larr;</h1>
        </Col>
        <Col>
          <h1>Questionnaire</h1>
        </Col>
      </Row>
      <Row>
        <Col md={1}></Col>
        <Col className="pt-4" md={3}>
          <QuestionList />
        </Col>
        <Col className="pt-4" md={5}>
          <Questionnaire onFinish={onFinish} onBack={onBack} />
        </Col>
      </Row>
    </Container>
  );
}
