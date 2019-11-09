import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <Container className="pt-4">
       <p>This is the app home page.</p>
      <p><Link to="/Test">Go to test page</Link></p>
    </Container>
    
      
    
  );
}

export default Home;
