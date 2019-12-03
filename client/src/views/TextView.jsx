import React from 'react';
import {
  Container, Row, Col, Button,
} from 'react-bootstrap';

export default function TextView({
  children, onFinish, onBack, title,
}) {
  return (
    <div className="min-vh-100 bg-two-people">
      <div className="spacing"></div>
      <Container className="pt-4">
        <div className="display-card bg-white shadow">
          <Row className="pt-4">
            <Col sm={1}>
              <h1 onClick={onBack} className="cursor-pointer hover-white float-right">&larr;</h1>
            </Col>
            <Col sm={11}>
              <h1>{title}</h1>
            </Col>
          </Row>
          <Row className="pt-4">
            <Col className="d-none d-xl-block" xl={1}></Col>
            <Col xl={6}>
              {children}
              <br />
              <Button onClick={onFinish} variant="secondary" size="lg">Continue</Button>
            </Col>
          </Row>
          <br/>
        </div>
      </Container>
    </div>
  );
}
