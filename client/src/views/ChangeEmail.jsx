import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import ChangePasswordForm from '../components/ChangeEmailForm.jsx';
import { Routes } from '../utils/constants';

export default function ChangeEmail({ history }) {
  return (
    <Container className="pt-4">
      <h1>Change Email</h1>
      <Row>
        <Col className="col-4 pt-4">
          <ChangeEmailForm onFinish={() => history.push(Routes.PROFILE_HOME)} />
        </Col>
      </Row>
    </Container>
  );
}
