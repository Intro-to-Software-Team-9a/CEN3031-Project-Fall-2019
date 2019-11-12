import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Home.css';
import axios from 'axios';

function Home() {

  return (
    <Container className="pt-4">
      <Link to="/get-started"><Button variant="outline-light">Get Started</Button></Link>
      <Link to="/questionnaire"><Button variant="outline-dark">Get Started</Button></Link>
      <p>This is the app home page.</p>
      <p><Link to="/create-account">Create an account</Link></p>
      <p><Link to="/create-template">Create a Document</Link></p>
    </Container>
  );
}

export default Home;
