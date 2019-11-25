import React from 'react';
import {
  Container, Button, Row, Col,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

function ProfileHome({ profile }) {
  if (!profile) return '';
  return (
    <Container className="pt-4">
      <Row>
        <Col md={6}>
          <div className="spacing"></div>
          <h1>Welcome, {profile.name}</h1>
          <h5>Here are the tasks you can accomplish.</h5>
          <div className="spacing"></div>
          <Link to="/view-documents"><Button variant="outline-dark">View Your Documents</Button></Link>
          <Link to="/edit-questionnaire"><Button variant="outline-dark">Edit the Questionnaire</Button></Link>
          <Link to="/edit-questionnaire-response"><Button variant="outline-dark">Edit your Responses</Button></Link>
        </Col>
        <Col md={6}>
          <div className="spacing"></div>
        </Col>
      </Row>
    </Container>
  );
}

const mapStateToProps = (state) => ({
  profile: state.profiles.profile,
});

export default connect(mapStateToProps)(ProfileHome);
