import React from 'react';
import {
  Container, Row, Col, Button,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Cart from '../components/Cart';
import AddToCart from '../components/AddToCart';
import './style.css';


function Catalog() {
  return (
    <Container fluid className="pt-4">
      <Row>
        <Col md={4} className="border-right">
          <h2>Your Cart</h2>
          <div style={{ minHeight: '400px' }}>
          <Cart />
          </div>
          <div className="text-right">
            <Link to='/review-purchase'><Button variant="outline-light">Check Out</Button></Link>
          </div>
        </Col>
        <Col md={8}>
          <h2>All Documents</h2>
          <AddToCart />
        </Col>
      </Row>
    </Container>
  );
}

export default Catalog;
