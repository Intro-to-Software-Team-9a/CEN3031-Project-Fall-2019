import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Home.css';
import axios from 'axios';

function Home() {

  return (
    <Container className="pt-4">
      <div className="spacing"></div>
      <h1>Welcome to ESTATEPLANR</h1>
      <h5>An online tool for all your estate planning needs.</h5>
      <br/>
      <ul>
        <li>Document Important Information and Final Arrangements.</li>
        <li>Create Estate Plans</li>
        <li>Qualified Attorneys are available</li>
        <li>Print and Store Estate Plans</li>
      </ul>
      <br />
      <Link to="/get-started"><Button variant="outline-dark">Get Started</Button></Link>
      <Link to="/catalog"><Button variant="outline-dark">See All Documents</Button></Link>
    </Container>
  );
}

export default Home;
