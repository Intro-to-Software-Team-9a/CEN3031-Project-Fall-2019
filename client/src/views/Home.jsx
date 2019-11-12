import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <Container className="pt-4">
      <p style={{ color: '#F5FFFA' }}>This is the app home page.</p>
      <p><Link to="/create-account">Create an account</Link></p>
      <p><Link to="/create-template">Create a Document</Link></p>
      <p><Link to="/questionnaire">View Questionnaire</Link></p>
    </Container>
  );
}

export default Home;
