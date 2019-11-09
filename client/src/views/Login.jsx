import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import LoginForm from '../components/LoginForm.jsx';

export default function Login() {
  return (
    <Container className="pt-4">
      <h1>Log In</h1>
      <Row>
        <Col className="col-4 pt-4">
          <LoginForm />
        </Col>
      </Row>
    </Container>
  );
}
