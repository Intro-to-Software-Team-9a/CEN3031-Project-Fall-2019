import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import QuestionList from '../components/QuestionList';
import Questionnaire from '../components/Questionnaire';

export default function QuestionnaireView() {
  return (
    <Container className="pt-4">
      <tr>
        <td><h1>Questionnaire&nbsp;</h1></td>
        <td valign="middle"><img src={require("../assets/safeLock.png")}alt="Checkmark" width="15" height="15"></img></td>
      </tr>
      <p><i>Personal information is required for estate plans.</i></p>
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
