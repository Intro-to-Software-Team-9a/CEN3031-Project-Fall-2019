import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Home.css';
import axios from 'axios';

function Home() {

  return (
    <Container className="pt-4">
      <Link to="/get-started"><Button variant="outline-light">Get Started</Button></Link>
    </Container>
  );
}

export default Home;
