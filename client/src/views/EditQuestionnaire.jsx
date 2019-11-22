import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import EditableQuestionnaire from '../components/EditableQuestionnaire';

const safelock = require('../assets/safeLock.png');

export default function EditQuestionnaireView({ onFinish, onBack }) {
  return (
    <Container className="pt-4" fluid>
      <Row>
        <Col md={1}>
        <h1 onClick={onBack} className="cursor-pointer hover-white float-right">&larr;</h1>
        </Col>
        <Col>
          <tr>
            <h1>Edit Questionnaire&nbsp;</h1>
            <td valign="middle"><img src={safelock}alt="Checkmark" width="15" height="15"></img></td>
          </tr>
        </Col>
      </Row>
      <Row>
        <Col md={1}></Col>
        <Col className="pt-4" md={11}>
          <EditableQuestionnaire />
        </Col>
      </Row>
    </Container>
  );
}
