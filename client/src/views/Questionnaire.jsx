import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import QuestionList from '../components/QuestionList';
import Questionnaire from '../components/Questionnaire';

export default function QuestionnaireView({ onFinish, onBack }) {
  return (
    <Container className="pt-4" fluid>
      <Row>
        <Col md={1}>
        <h1 onClick={onBack} className="cursor-pointer hover-white float-right">&larr;</h1>
        </Col>
        <Col>
          <tr>
            <h1>Questionnaire&nbsp;</h1>
            <td valign="middle"><img src={require("../assets/safeLock.png")}alt="Checkmark" width="15" height="15"></img></td>
          </tr>
          <p><i>Personal information is required for state plans.</i></p>
        </Col>
      </Row>
      <Row>
        <Col md={1}></Col>
        <Col className="pt-4" md={3}>
          <QuestionList />
        </Col>
        <Col className="pt-4" md={5}>
          <Questionnaire onFinish={onFinish} />
        </Col>
      </Row>
    </Container>
  );
}
