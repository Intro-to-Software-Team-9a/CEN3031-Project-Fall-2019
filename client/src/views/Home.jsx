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
        <Col xl={2}></Col>
        <Col className="text-center pt-4 mt-4 pt-xl-0 mt-xl-0" xl={4}>
          <div className="spacing d-xl-none d-block"></div>
          <div className="w-auto text-left d-inline-block">
            <h1>Welcome to EstatePlanR</h1>
            <h5>EstatePlanR ™ is an online application
              that makes creating estate plans easy and affordable.</h5>
            <br/>
            <h5>In just a few steps you can:</h5>
            <ul>
              <li>Document important information and make final arrangements</li>
              <li>Create estate plans</li>
              <li>Qualified attorneys are available</li>
              <li>Print and store your documents</li>
            </ul>
            <h5>Why?</h5>
            <p>
              Estate planning is a way to ensure that persons making decisions for you about
              your health care, finances or other assets, is aware of your wishes.
              When you make an estate plan and discuss it with the significant people in your life,
              it will better assure that your wishes will be carried out the way you want.
            </p>
            <p>
              Planning ahead can ease your mind, protect your interests and help guide your
              loved ones if they need to make difficult decisions for you in the future.
              Estate Plans are not just for the wealthy.
              Everyone should make estate plans.
              Don’t delay, get started today.
            </p>
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
