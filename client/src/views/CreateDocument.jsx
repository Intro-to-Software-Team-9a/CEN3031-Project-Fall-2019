import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

export default class CreateAccount extends React.Component {
  render() {
    return (
      <Container className="pt-4">
        <h1>Create a Document</h1>
        <Row>
          <Col className="col-4 pt-4">
            <button onClick={this.onRender}>Render Document</button>
          </Col>
        </Row>
      </Container>
    );
  }
}
