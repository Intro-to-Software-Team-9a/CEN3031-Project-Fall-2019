import React from 'react';
import {
  Container, Row, Col, Button,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Cart from '../components/Cart';
import AddToCart from '../components/AddToCart';
import './style.css';


function Catalog({ onFinish, onBack }) {
  return (
    <Container className="pt-4" fluid>
      <Row>
        <Col md={1}>
          <h1 onClick={onBack} className="cursor-pointer hover-white float-right">&larr;</h1>
        </Col>
        <Col>
          <h1>Select Documents</h1>
        </Col>
      </Row>
      <Row>
        <Col md={1}></Col>
        <Col md={4} className="border-right">
          <h5>Your Cart</h5>
          <div style={{ minHeight: '400px' }}>
            <Cart />
          </div>
          <div className="text-right">
            <Button variant="outline-light" onClick={onFinish}>Review and Finish Purchase</Button>
          </div>
        </Col>
        <Col md>
          <h5>All Documents</h5>
          <AddToCart />
        </Col>
      </Row>
    </Container>
  );
}

export default Catalog;
