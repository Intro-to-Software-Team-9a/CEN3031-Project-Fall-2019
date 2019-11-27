import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import LoginForm from '../components/LoginForm.jsx';
import { Routes } from '../utils/constants';

export default function Login({ history }) {
  return (
    <Container className="pt-4">
      <h1>Log In</h1>
      <Row>
        <Col className="col-4 pt-4">
          <LoginForm onFinish={() => history.push(Routes.PROFILE_HOME)} />
        </Col>
      </Row>
    </Container>
  );
}
