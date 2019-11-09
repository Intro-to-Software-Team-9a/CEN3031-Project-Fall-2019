import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import CreateAccontForm from '../components/CreateAccountForm.jsx';

export default function CreateAccount() {
  return (
    <Container className="pt-4">
      <h1>Create Account</h1>
      <Row>
        <Col className="col-4 pt-4">
          <CreateAccontForm />
        </Col>
      </Row>
    </Container>
  );
}
