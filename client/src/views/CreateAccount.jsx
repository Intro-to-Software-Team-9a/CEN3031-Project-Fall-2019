import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import CreateAccontForm from '../components/CreateAccountForm.jsx';

export default function CreateAccount() {
  return (
    <Container>
      <Row>
        <Col>
          <CreateAccontForm />
        </Col>
      </Row>
    </Container>
  );
}
