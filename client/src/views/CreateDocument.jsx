import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

export default class CreateAccount extends React.Component {
  async onRender() {
    await axios.get('/api/documents/generate/5dc76c11d1855442b4d837e6');
  }

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
