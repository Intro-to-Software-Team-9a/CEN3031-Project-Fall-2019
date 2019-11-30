import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import ChangePasswordForm from '../components/ChangePasswordForm.jsx';
import { Routes } from '../utils/constants';

export default function Login({ history }) {
  return (
    <Container className="pt-4">
      <h1>Change Password</h1>
      <Row>
        <Col className="col-4 pt-4">
          <ChangePasswordForm onFinish={() => history.push(Routes.PROFILE_HOME)} />
        </Col>
      </Row>
    </Container>
  );
}
