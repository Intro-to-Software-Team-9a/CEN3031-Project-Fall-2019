import React from 'react';
import {
  Container, Row, Col, Button,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Home.css';
import HandImage from '../assets/hand.jpg';

import { Routes } from '../utils/constants';

function Home() {
  return (
    <Container fluid className="min-vh-100">
      <Row className="align-items-center">
        <Col className="text-center pt-4 mt-4 pt-xl-0 mt-xl-0" xl={6}>
          <div className="spacing d-xl-none d-block"></div>
          <div className="w-auto text-left d-inline-block">
            <h1>Welcome to EstatePlanR</h1>
            <h5>An online tool for all your Estate Planning needs.</h5>
            <br />
            <ul>
              <li>Document important information and make final arrangements</li>
              <li>Create estate plans</li>
              <li>Qualified attorneys are available</li>
              <li>Print and store your documents</li>
            </ul>
            <br />
            <Link to={Routes.ONBOARDING}><Button size="lg" variant="secondary">Get Started</Button></Link>
          </div>
        </Col>
        <Col xl={6} className="p-0 pt-4 mt-4 d-xl-block d-none">
          <div className="d-none d-xl-block spacing"></div>
          <img alt="hand" className="w-100" src={HandImage}></img>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
