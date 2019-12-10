import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import QuestionList from '../components/QuestionList';
import Questionnaire from '../components/Questionnaire';

const safelock = require('../assets/safeLock.png');

/** Questionnaire to show after the login wall */
export default function AuthenticatedQuestionnaire({ onFinish, onBack }) {
  return (
    <div className="min-vh-100 bg-light">
      <div className="spacing"></div>
      <Container className="pt-4" fluid>
        <Row className="pt-4">
          <Col sm={1}>
            <h1 onClick={onBack} className="cursor-pointer hover-white float-right">&larr;</h1>
          </Col>
          <Col sm={11}>
            <h1>Interview Questions&nbsp; <img src={safelock} alt="Checkmark" width="15" height="15"></img></h1>
            <p><i>Personal information is required for estate plans.</i></p>
          </Col>
        </Row>
        <Row className="pt-4">
          <Col className="d-none d-xl-block" xl={1}></Col>
          <Col xl={3}>
            <div className="display-card bg-white shadow">
              <QuestionList />
            </div>
          </Col>
          <Col xl={6}>
            <div className="display-card bg-white shadow">
              <Questionnaire
                sectionFilter={(section) => !section.isShownBeforeLogin}
                onFinish={onFinish} />
            </div>
          </Col>
        </Row>
      </Container>
      <div className="spacing"></div>
    </div>
  );
}
