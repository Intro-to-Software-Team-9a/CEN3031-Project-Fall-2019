import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import QuestionList from '../components/QuestionList';
import Questionnaire from '../components/Questionnaire';

const safelock = require('../assets/safeLock.png');

/** Part of the questionnaire shown BEFORE the login wall */
export default function QuestionnaireView({ onFinish, onBack }) {
  return (
    <Container className="pt-4" fluid>
      <Row>
        <Col md={1}>
          <h1 onClick={onBack} className="cursor-pointer hover-white float-right">&larr;</h1>
        </Col>
        <Col>
          <h1>Questionnaire&nbsp; <img src={safelock} alt="Checkmark" width="15" height="15"></img></h1>
          <p><i>Personal information is required for estate plans.</i></p>
        </Col>
      </Row>
      <Row>
        <Col md={1}></Col>
        <Col className="pt-4" md={3}>
          <QuestionList />
        </Col>
        <Col className="pt-4" md={5}>
          <Questionnaire
            sectionFilter={(section) => section.isShownBeforeLogin}
            onFinish={onFinish} />
        </Col>
      </Row>
    </Container>
  );
}
