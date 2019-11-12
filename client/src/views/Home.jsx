import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Home.css';
import axios from 'axios';

function Home() {

  return (
    <Container className="pt-4">
      <div className="spacing"></div>
      <h1>Welcome to EstatePlanR</h1>
      <h5>An online tool for all your Estate Planning needs.</h5>
      <br/>
      <ul>
        <li>Document important information and make final arrangements</li>
        <li>Create estate plans</li>
        <li>Qualified attorneys are available</li>
        <li>Print and store your documents</li>
      </ul>
      <br />
      <Link to="/get-started"><Button variant="outline-dark">Get Started</Button></Link>
      <Link to="/catalog"><Button variant="outline-dark">See All Documents</Button></Link>
    </Container>
  );
}

export default Home;
