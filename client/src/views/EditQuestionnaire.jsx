import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import EditableQuestionnaire from '../components/EditableQuestionnaire';
import { Routes } from '../utils/constants';

export default function EditQuestionnaireView(props) {
  function goBack() {
    props.history.push(Routes.PROFILE_HOME);
  }

  return (
    <div className="min-vh-100 bg-light">
      <div className="spacing"></div>
      <Container className="pt-4" fluid>
        <Row className="pt-4">
          <Col sm={1}>
            <h1 onClick={goBack} className="cursor-pointer hover-white float-right">&larr;</h1>
          </Col>
          <Col sm={11}>
            <h1>Edit Questionnaire</h1>
          </Col>
        </Row>
        <Row className="pt-4">
          <Col className="d-none d-xl-block" xl={1}></Col>
          <Col className="pt-4" xl={11}>
            <EditableQuestionnaire
              goBack={goBack}
              onSuccess={goBack}
            />
          </Col>
        </Row>
      </Container>
      <div className="spacing"></div>
    </div>
  );
}
