import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import EditableQuestionnaire from '../components/EditableQuestionnaire';
import { Routes } from '../utils/constants';

const safelock = require('../assets/safeLock.png');

export default function EditQuestionnaireView(props) {
  function goBack() {
    props.history.push(Routes.PROFILE_HOME);
  }

  return (
    <Container className="pt-4" fluid>
      <Row>
        <Col md={1}>
          <h2 onClick={goBack} className="cursor-pointer hover-white float-right">&larr;</h2>
        </Col>
        <Col>
          <h2>
            Edit Questionnaire&nbsp; <img src={safelock} alt="Checkmark" width="15" height="15"></img>
          </h2>
        </Col>
      </Row>
      <Row>
        <Col md={1}></Col>
        <Col className="pt-4" md={11}>
          <EditableQuestionnaire
            onBack={goBack}
            onSuccess={goBack}
          />
        </Col>
      </Row>
    </Container>
  );
}
