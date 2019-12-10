import React from 'react';
import {
  Container, Row, Col, Button,
} from 'react-bootstrap';

import Cart from '../components/Cart';
import AddToCart from '../components/AddToCart';
import './style.css';


function Catalog({ onFinish, onBack }) {
  return (
    <div className="min-vh-100 bg-family">
      <div className="spacing"></div>
      <Container className="pt-4" fluid>
        <Row className="pt-4">
          <Col sm={1}></Col>
          <Col sm={4}>
            <div className="display-card bg-white shadow">
              <h1>
                <span onClick={onBack} className="cursor-pointer">&larr;</span>
                &nbsp;
                Select Documents
              </h1>
            </div>
          </Col>
        </Row>
        <Row className="pt-4">
          <Col className="d-none d-xl-block" xl={1}></Col>
          <Col xl={4}>
            <div className="display-card bg-white shadow">
              <h5>Your Cart</h5>
              <div>
                <Cart />
              </div>
              <div className="text-right">
                <Button variant="outline-dark" onClick={onFinish}>Review and Finish Purchase</Button>
              </div>
            </div>
          </Col>
        </Row>
        <Row className="pt-4">
          <Col className="d-none d-xl-block" xl={1}></Col>
          <Col xl={4}>
            <div className="display-card bg-white shadow">
              <h5>All Documents</h5>
              <AddToCart />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Catalog;
