import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import './SelectPlan.css';

class SelectPlan extends React.Component {
  render() {
    return (
      <Container className="pt-4">
        <h1>Select Plan</h1>
        <Row>
          <Col className="col-4 pt-4">
            <div class="card">
              <h2 class="card-header">Simple</h2>
              <div class="card-body">
                <ul class="list-group">
                  <li class="list-group-item">Item 1</li>
                  <li class="list-group-item">Item 2</li>
                  <li class="list-group-item">Item 3</li>
                  <li class="list-group-item">Item 4</li>
                  <li class="list-group-item">Item 5</li>
                </ul>
              </div>
              <div class="card-footer d-flex justify-content-between">
                <span className="planPrice">$50</span>
                <a href="#" class="btn btn-primary">Buy now</a>
              </div>
            </div>
          </Col>
          <Col className="col-4 pt-4">
            <div class="card">
              <h2 class="card-header">Advanced</h2>
              <div class="card-body">
                <ul class="list-group">
                  <li class="list-group-item">Item 1</li>
                  <li class="list-group-item">Item 2</li>
                  <li class="list-group-item">Item 3</li>
                  <li class="list-group-item">Item 4</li>
                  <li class="list-group-item">Item 5</li>
                </ul>
              </div>
              <div class="card-footer d-flex justify-content-between">
                <span className="planPrice">$50</span>
                <a href="#" class="btn btn-primary">Buy now</a>
              </div>
            </div>
          </Col>
          <Col className="col-4 pt-4">
            <div class="card">
              <h2 class="card-header">Comprehensive</h2>
              <div class="card-body">
                <ul class="list-group">
                  <li class="list-group-item">Item 1</li>
                  <li class="list-group-item">Item 2</li>
                  <li class="list-group-item">Item 3</li>
                  <li class="list-group-item">Item 4</li>
                  <li class="list-group-item">Item 5</li>
                </ul>
              </div>
              <div class="card-footer d-flex justify-content-between">
                <span className="planPrice">$50</span>
                <a href="#" class="btn btn-primary">Buy now</a>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default SelectPlan
