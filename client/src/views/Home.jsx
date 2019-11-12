import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <Container className="pt-4">
      <Link to="/questionnaire"><Button variant="outline-dark">Get Started</Button></Link>
    </Container>
  );
}

export default Home;
