import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

function ProfileHome() {
  return (
    <Container className="pt-4">
      <Link to="/view-documents"><Button variant="outline-light">View Your Documents</Button></Link>
    </Container>
  );
}

export default ProfileHome;
