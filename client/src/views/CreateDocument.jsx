import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class CreateAccount extends React.Component {
  async onRender() {
    const response = await axios.get('/api/documents/generate/5dc76c11d1855442b4d837e6');
    console.log(response.data.document);
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
