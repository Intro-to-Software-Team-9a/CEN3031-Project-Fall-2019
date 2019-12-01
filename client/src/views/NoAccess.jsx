import React from 'react';
import { Container } from 'react-bootstrap';

class NoAccess extends React.Component {
  render() {
    return (
      <Container className="text-center">
        <h1>You do not have access to this page.</h1>
      </Container>
    );
  }
}

export default NoAccess;
